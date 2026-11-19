#!/bin/bash
# claude-gate 對一個 head commit 的決定（.github/workflows/claude-gate.yml）。冪等：審查完跑一次、ci-gate
# 跑完再一次，兩邊結果都到齊才動作。由 synk-atelier 的同名腳本精簡而來（沒有 claude-fix 後續提交、
# migration、watchdog-heal 這些規則）。
# 環境變數：GH_TOKEN、REPO、SHA、CLAUDE_TOKEN。輸出 notify=、reason=、number= 到 $GITHUB_OUTPUT。
set -euo pipefail
out() { echo "$1=$2" >> "$GITHUB_OUTPUT"; }
out notify ""
if [ -z "${CLAUDE_TOKEN:-}" ]; then echo "CLAUDE_CODE_OAUTH_TOKEN is not set; nothing to decide."; exit 0; fi

number=$(gh api "repos/$REPO/commits/$SHA/pulls" --jq "[.[] | select(.state == \"open\" and .base.ref == \"main\" and .head.sha == \"$SHA\" and .head.repo.full_name == \"$REPO\")][0].number // empty")
if [ -z "$number" ]; then echo "No open same-repo PR into main has head $SHA."; exit 0; fi
out number "$number"

# 這個 commit 的兩個結果都要在，否則等另一個觸發。
gate_of() { gh api "repos/$REPO/commits/$SHA/check-runs?check_name=ci-gate&per_page=20" --jq '[.check_runs[] | select(.app.slug == "github-actions")] | sort_by(.started_at) | last | if . == null then "missing" elif .status != "completed" then "pending" else .conclusion end'; }
gate=$(gate_of)
review=$(gh api "repos/$REPO/commits/$SHA/statuses?per_page=100" --jq '[.[] | select(.context == "claude-gate/review")] | first | if . == null then "missing" else "\(.state) \(.description)" end')
echo "PR #$number at ${SHA:0:7}: ci-gate=$gate review=$review"
if [ "$gate" != success ]; then echo "ci-gate is not green ($gate); nothing to do now."; exit 0; fi
if [ "$review" = missing ]; then echo "The review has not finished; the review job decides when it does."; exit 0; fi

pr=$(gh api "repos/$REPO/pulls/$number")
author=$(printf '%s' "$pr" | jq -r .user.login)
draft=$(printf '%s' "$pr" | jq -r .draft)
owner=${REPO%%/*}
files=$(gh api --paginate "repos/$REPO/pulls/$number/files" --jq '.[] | "\(.status) \(.filename)"')

pause=""
# 1. 作者不是 repo 擁有者或 Claude GitHub App（fork 根本到不了這裡）；
case "$author" in "$owner"|claude\[bot\]|claude) ;; *) pause="${pause}- 作者 $author 不是站長或 Claude GitHub App。
" ;; esac
# 2. Claude App 改 workflow（不能自己提權）：只有站長的 PR 可以；
if [ "$author" != "$owner" ] && printf '%s\n' "$files" | grep -E ' \.github/' >/dev/null; then
  pause="${pause}- 由 Claude 修改 .github/，需要站長確認。
"
fi
# 3. draft 不合併（站長要先自己看過的變更開成 draft）。
if [ "$draft" = true ]; then echo "Draft PR; not merging."; exit 0; fi

has_label() { gh api "repos/$REPO/issues/$number/labels" --jq '.[].name' | grep -x "$1" >/dev/null; }
mark() { # mark <label> <color> <description> -> 第一次時回傳 true（那時才推播）
  gh label create "$1" -R "$REPO" --color "$2" --description "$3" >/dev/null 2>&1 || true
  if has_label "$1"; then return 1; fi
  gh pr edit "$number" -R "$REPO" --add-label "$1" >/dev/null
}
body="$RUNNER_TEMP/claude-gate.md"

case "$review" in
  "failure "*)
    echo "The review left issues."
    if mark notified:review-failed d93f0b "claude-gate sent the 審查沒過 notification"; then out notify failed; fi
    exit 0 ;;
esac
if [ "$review" = "success issues=0" ] && [ -z "$pause" ]; then
  # main 沒有 branch protection：合併前再查一次 ci-gate，並用 --match-head-commit 釘在 $SHA。
  again=$(gate_of)
  if [ "$again" != success ]; then echo "ci-gate changed to $again; not merging."; exit 0; fi
  printf '%s\n' "<!-- claude-gate -->" "claude-gate：自動審查沒有發現問題、ci-gate 通過，自動合併（rebase）並觸發部署。" > "$body"
  gh pr review "$number" -R "$REPO" --approve --body-file "$body" || gh pr comment "$number" -R "$REPO" --body-file "$body" >/dev/null || true
  gh pr merge "$number" -R "$REPO" --rebase --match-head-commit "$SHA"
  echo "Merged."
  # 用 GITHUB_TOKEN 合併不會觸發 on: push，部署要自己 dispatch（workflow_dispatch 不受這條限制）。
  # deploy-macmini.yml 會在 main 上重跑 ci-gate（rebase 後是新的 commit），通過才部署。
  if gh workflow run deploy-macmini.yml -R "$REPO" --ref main; then
    echo "Deploy dispatched on main."
  else
    echo "::error::Merged, but dispatching deploy-macmini.yml failed."
    out notify deploy-dispatch-failed
  fi
  exit 0
fi

# 等站長：上面的暫停原因，或審查略過／沒跑完。
{
  echo "<!-- claude-gate -->"
  echo "claude-gate：ci-gate 通過，但這個 PR 需要站長決定："
  printf '%s' "$pause"
  case "$review" in "success skipped") echo "- 自動審查略過了這個 PR（例如已審過或判定不需審查）。" ;; "error "*) echo "- 自動審查沒有完成。" ;; esac
} > "$body"
if mark notified:wait-kj 0e8a16 "claude-gate sent the 等你合併 notification"; then
  gh pr comment "$number" -R "$REPO" --body-file "$body" >/dev/null
  out notify wait
  if [ -n "$pause" ]; then out reason "$(printf '%s' "$pause" | head -n 1 | sed 's/^- //')"
  else out reason "自動審查沒有結論，等你合併"; fi
fi
