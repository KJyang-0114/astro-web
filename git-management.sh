#!/bin/bash

# Git 管理腳本 - 用於 Copilot 實驗期間的版本控制

set -e

echo "🔧 Git 管理工具 for Copilot 實驗"
echo "=================================="

case "$1" in
    "save")
        echo "💾 保存當前進度..."
        git add .
        if [ -n "$2" ]; then
            git commit -m "copilot-experiment: $2"
        else
            git commit -m "copilot-experiment: save progress at $(date '+%Y-%m-%d %H:%M:%S')"
        fi
        echo "✅ 進度已保存"
        ;;
    
    "checkpoint")
        echo "📍 創建檢查點..."
        git add .
        timestamp=$(date '+%Y%m%d_%H%M%S')
        git commit -m "checkpoint: $timestamp - $2"
        git tag "checkpoint-$timestamp"
        echo "✅ 檢查點已創建: checkpoint-$timestamp"
        ;;
    
    "restore")
        echo "⏮️ 恢復到上一個提交..."
        git reset --hard HEAD~1
        echo "✅ 已恢復到上一個提交"
        ;;
    
    "restore-to-main")
        echo "🔄 恢復到主分支狀態..."
        read -p "確定要放棄所有當前修改並恢復到主分支狀態嗎？(y/N): " confirm
        if [[ $confirm == [yY] ]]; then
            git checkout main
            git branch -D copilot-experiments || true
            git checkout -b copilot-experiments
            echo "✅ 已恢復到主分支的乾淨狀態"
        else
            echo "❌ 操作已取消"
        fi
        ;;
    
    "backup-to-remote")
        echo "☁️ 備份到遠端..."
        git push -u origin copilot-experiments --force
        echo "✅ 已備份到遠端"
        ;;
    
    "list-checkpoints")
        echo "📋 檢查點列表:"
        git tag -l "checkpoint-*" | sort -r
        ;;
    
    "restore-checkpoint")
        if [ -n "$2" ]; then
            echo "📍 恢復到檢查點: $2"
            git reset --hard "$2"
            echo "✅ 已恢復到檢查點: $2"
        else
            echo "❌ 請指定檢查點標籤"
            echo "可用的檢查點:"
            git tag -l "checkpoint-*" | sort -r
        fi
        ;;
    
    "status")
        echo "📊 當前狀態:"
        echo "當前分支: $(git branch --show-current)"
        echo "最後提交: $(git log -1 --oneline)"
        echo "修改狀態:"
        git status --short
        ;;
    
    "help"|*)
        echo "📖 使用說明:"
        echo "  ./git-management.sh save [message]          - 保存當前進度"
        echo "  ./git-management.sh checkpoint [description] - 創建檢查點"
        echo "  ./git-management.sh restore                 - 恢復到上一個提交"
        echo "  ./git-management.sh restore-to-main         - 恢復到主分支狀態"
        echo "  ./git-management.sh backup-to-remote        - 備份到遠端"
        echo "  ./git-management.sh list-checkpoints        - 列出所有檢查點"
        echo "  ./git-management.sh restore-checkpoint <tag> - 恢復到指定檢查點"
        echo "  ./git-management.sh status                  - 查看當前狀態"
        echo "  ./git-management.sh help                    - 顯示此幫助"
        ;;
esac
