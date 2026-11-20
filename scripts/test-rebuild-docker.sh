#!/bin/bash
# 用假的 docker、curl、sleep、lsof、pgrep、ps 跑 rebuild-docker.sh，
# 斷言每種情境的結束碼，以及下了哪些 docker 指令、順序對不對。
# 不會碰真的 Docker，也不會送任何請求。macOS（bash 3.2）與 ubuntu 都能跑。
#
#   bash scripts/test-rebuild-docker.sh
set -u

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT="$ROOT/rebuild-docker.sh"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/test-rebuild-docker.XXXXXX")"
trap 'rm -rf "$WORK"' EXIT
FAKE="$WORK/bin"
mkdir -p "$FAKE"

# --- 假指令 -------------------------------------------------------------
# 狀態放在 $STATE：container（目前容器用的映像）、has_latest、has_previous、run_fail_<映像>。
# 重要的 docker 動作逐行寫進 $STATE/trace。
cat > "$FAKE/docker" <<'EOF'
#!/bin/bash
S="$STATE"
case "$1" in
  inspect)
    # docker inspect -f '{{.Image}}' <容器>：容器存在才印映像 ID
    if [ "$2" = "-f" ] && [ -f "$S/container" ]; then cat "$S/container"; exit 0; fi
    exit 1 ;;
  tag)
    if [ "$2" = "kjyang-wbs-astro:latest" ] && [ ! -f "$S/has_latest" ]; then exit 1; fi
    touch "$S/has_previous"
    echo "tag $2 $3" >> "$S/trace" ;;
  build)
    echo "build" >> "$S/trace"
    if [ "${FAKE_BUILD_FAIL:-0}" = 1 ]; then echo "build error" >&2; exit 1; fi
    touch "$S/has_latest" ;;
  stop)
    echo "stop $2" >> "$S/trace"
    [ -f "$S/container" ] ;;
  rm)
    echo "rm $*" | sed 's/^rm rm /rm /' >> "$S/trace"
    had=1; [ -f "$S/container" ] && had=0
    rm -f "$S/container"
    exit $had ;;
  run)
    image="${*: -1}"
    # 記下這次 docker run 帶的資源上限，給 run_case 斷言
    cpus=""; mem=""; swap=""
    shift
    while [ $# -gt 0 ]; do
      case "$1" in
        --cpus) cpus="$2"; shift ;;
        --memory) mem="$2"; shift ;;
        --memory-swap) swap="$2"; shift ;;
      esac
      shift
    done
    echo "cpus=$cpus memory=$mem swap=$swap" >> "$S/run_limits"
    key="$(printf '%s' "$image" | tr ':/' '__')"
    left=0; [ -f "$S/run_fail_$key" ] && left=$(cat "$S/run_fail_$key")
    if [ "$left" -gt 0 ]; then
      echo $((left - 1)) > "$S/run_fail_$key"
      echo "run-fail $image" >> "$S/trace"
      echo "port is already allocated" >&2
      exit 125
    fi
    echo "run $image" >> "$S/trace"
    printf '%s' "$image" > "$S/container"
    echo "c0ffee" ;;
  ps)
    # docker ps -q --filter publish=3000：沒有別的容器占 3000 埠
    case "$*" in *publish=3000*) exit 0 ;; esac
    if [ -f "$S/container" ]; then
      case "$*" in *-q*) echo "c0ffee" ;; *) echo "c0ffee $(cat "$S/container") Up kjyang-wbs-astro-container" ;; esac
    fi ;;
  image)
    # docker image inspect kjyang-wbs-astro:previous
    [ -f "$S/has_previous" ] ;;
  logs) exit 0 ;;
  *) echo "fake docker：沒有處理 $*" >&2; exit 99 ;;
esac
EOF

cat > "$FAKE/curl" <<'EOF'
#!/bin/bash
# 目前容器用的映像列在 FAKE_HEALTHY 裡才回 200
image=""; [ -f "$STATE/container" ] && image="$(cat "$STATE/container")"
for ok in ${FAKE_HEALTHY:-}; do
  if [ "$ok" = "$image" ]; then printf '200'; exit 0; fi
done
printf '000'
exit 7
EOF

cat > "$FAKE/lsof" <<'EOF'
#!/bin/bash
# FAKE_PORT_FOREIGN=1：3000 埠被一個不是網站的程序占著
if [ "${FAKE_PORT_FOREIGN:-0}" = 1 ]; then
  case "$*" in *-t*) echo 4242; exit 0 ;; *) echo "python3 4242 LISTEN"; exit 0 ;; esac
fi
exit 1
EOF

cat > "$FAKE/ps" <<'EOF'
#!/bin/bash
echo "python3 -m http.server 3000"
EOF

printf '#!/bin/bash\nexit 1\n' > "$FAKE/pgrep"
printf '#!/bin/bash\nexit 0\n' > "$FAKE/sleep"
chmod +x "$FAKE"/*

if [ "$(PATH="$FAKE:$PATH" command -v docker)" != "$FAKE/docker" ]; then
  echo "✗ 假的 docker 沒有排在 PATH 最前面，停止測試" >&2
  exit 1
fi

# --- 情境 ---------------------------------------------------------------
passed=0
failed=0

# run_case 名稱 預期結束碼 預期 trace（每行一個動作，用 ; 分隔）
# 呼叫前先設好 SETUP_* 與 FAKE_* 環境變數。
run_case() {
  name="$1"; want_code="$2"; want_trace="$3"
  dir="$WORK/case-$((passed + failed))"
  STATE="$dir/state"
  mkdir -p "$STATE" "$dir/site"
  [ -n "${SETUP_CONTAINER:-}" ] && printf '%s' "$SETUP_CONTAINER" > "$STATE/container"
  [ "${SETUP_LATEST:-0}" = 1 ] && touch "$STATE/has_latest"
  [ "${SETUP_PREVIOUS:-0}" = 1 ] && touch "$STATE/has_previous"
  [ -n "${SETUP_RUN_FAIL_NEW:-}" ] && echo "$SETUP_RUN_FAIL_NEW" > "$STATE/run_fail_kjyang-wbs-astro"
  : > "$STATE/trace"
  : > "$STATE/run_limits"

  output="$(cd "$dir/site" && STATE="$STATE" REBUILD_PATH_PREFIX="$FAKE" REBUILD_HEALTH_TRIES=3 \
    bash "$SCRIPT" 2>&1)"
  code=$?
  got_trace="$(paste -sd ';' "$STATE/trace")"

  # 每次 docker run（含退回 previous、失敗重試）都要帶 --cpus 0.5 --memory 64m --memory-swap 64m
  runs="$(grep -c '^run' "$STATE/trace")"
  limited="$(grep -cx 'cpus=0.5 memory=64m swap=64m' "$STATE/run_limits")"
  total="$(wc -l < "$STATE/run_limits" | tr -d ' ')"
  limits_ok=1
  if [ "$limited" != "$runs" ] || [ "$total" != "$runs" ]; then limits_ok=0; fi

  if [ "$code" = "$want_code" ] && [ "$got_trace" = "$want_trace" ] && [ "$limits_ok" = 1 ]; then
    passed=$((passed + 1))
    echo "✓ $name（結束碼 $code）"
  else
    failed=$((failed + 1))
    echo "✗ $name"
    echo "    結束碼：$code，預期 $want_code"
    echo "    指令：$got_trace"
    echo "    預期：$want_trace"
    [ "$limits_ok" = 1 ] || { echo "    docker run 資源上限不對（$limited/$runs 次正確）："; sed 's/^/      /' "$STATE/run_limits"; }
    printf '%s\n' "$output" | sed 's/^/    | /' | tail -n 15
  fi
  unset SETUP_CONTAINER SETUP_LATEST SETUP_PREVIOUS SETUP_RUN_FAIL_NEW FAKE_BUILD_FAIL FAKE_HEALTHY FAKE_PORT_FOREIGN
}

NEW="kjyang-wbs-astro"
PREV="kjyang-wbs-astro:previous"
RUNNING="sha256:running"
# 主流程換容器：stop、rm（主流程）、rm（start_container 啟動前）
SWAP="stop kjyang-wbs-astro-container;rm -f kjyang-wbs-astro-container;rm -f kjyang-wbs-astro-container"
RM="rm -f kjyang-wbs-astro-container"

# 1. 成功。previous 取自正在跑的容器的映像，即使 :latest 存在也不用它。
SETUP_CONTAINER="$RUNNING" SETUP_LATEST=1 FAKE_HEALTHY="$NEW" \
  run_case "成功：previous 標的是正在跑的容器的映像" 0 \
  "tag $RUNNING $PREV;build;$SWAP;run $NEW"

# 2. build 失敗：10，而且沒有 stop、rm、run
SETUP_CONTAINER="$RUNNING" SETUP_LATEST=1 FAKE_BUILD_FAIL=1 \
  run_case "build 失敗：舊容器沒動" 10 \
  "tag $RUNNING $PREV;build"

# 3. 新版沒過健康檢查 → 退回 previous，退回後健康：20
SETUP_CONTAINER="$RUNNING" SETUP_LATEST=1 FAKE_HEALTHY="$PREV" \
  run_case "健康檢查沒過 → 退回成功" 20 \
  "tag $RUNNING $PREV;build;$SWAP;run $NEW;$RM;run $PREV"

# 4. 退回之後還是不健康：30
SETUP_CONTAINER="$RUNNING" SETUP_LATEST=1 FAKE_HEALTHY="" \
  run_case "退回後仍不健康" 30 \
  "tag $RUNNING $PREV;build;$SWAP;run $NEW;$RM;run $PREV"

# 5. 沒有 previous 可退回：30，不會試著啟動 previous
FAKE_HEALTHY="" \
  run_case "沒有 previous 可退回" 30 \
  "build;$SWAP;run $NEW"

# 6. 新容器啟動三次都失敗（舊容器已刪）→ 退回：20
SETUP_CONTAINER="$RUNNING" SETUP_LATEST=1 SETUP_RUN_FAIL_NEW=3 FAKE_HEALTHY="$PREV" \
  run_case "啟動三次失敗 → 退回成功" 20 \
  "tag $RUNNING $PREV;build;$SWAP;run-fail $NEW;$RM;run-fail $NEW;$RM;run-fail $NEW;$RM;run $PREV"

# 7. 啟動失敗兩次、第三次成功：0
SETUP_CONTAINER="$RUNNING" SETUP_LATEST=1 SETUP_RUN_FAIL_NEW=2 FAKE_HEALTHY="$NEW" \
  run_case "啟動重試後成功" 0 \
  "tag $RUNNING $PREV;build;$SWAP;run-fail $NEW;$RM;run-fail $NEW;$RM;run $NEW"

# 8. 首次部署：沒有容器、沒有任何映像
FAKE_HEALTHY="$NEW" \
  run_case "首次部署（沒有容器也沒有映像）" 0 \
  "build;$SWAP;run $NEW"

# 9. 容器不存在但有 :latest：退回原本的做法，把 :latest 標成 previous
SETUP_LATEST=1 FAKE_HEALTHY="$NEW" \
  run_case "沒有容器、有 :latest：改標 :latest" 0 \
  "tag kjyang-wbs-astro:latest $PREV;build;$SWAP;run $NEW"

# 10. 3000 埠被不是網站的程序占著（舊容器已刪）：30，不啟動、不 kill
SETUP_CONTAINER="$RUNNING" SETUP_LATEST=1 FAKE_PORT_FOREIGN=1 FAKE_HEALTHY="$NEW" \
  run_case "3000 埠被別的程序占用" 30 \
  "tag $RUNNING $PREV;build;stop kjyang-wbs-astro-container;$RM"

echo
echo "test-rebuild-docker：$passed 項通過，$failed 項失敗。"
[ "$failed" -eq 0 ]
