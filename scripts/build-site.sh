#!/bin/bash
# 建一個版本的文件網站（VitePress）：設計基礎、互動指南、元件總覽。
# 元件的可操作範例由各框架的範例網站（Storybook）提供，網址見 site/frameworks.json。
# 輸出：site/.vitepress/dist
# 用法：scripts/build-site.sh <版本資料夾：main 或 v0.1.0>
#   DOCS_REPO_BASE  網站在網域下的根路徑，預設 /mendesky-ds/（GitHub Pages）；本機預覽可設 /
set -euo pipefail
cd "$(dirname "$0")/.."
FOLDER="${1:-main}"
export DOCS_BASE="${DOCS_REPO_BASE:-/mendesky-ds/}${FOLDER}/"
export DOCS_VERSION="$FOLDER"
npx vitepress build site
echo "已建置 ${DOCS_BASE} → site/.vitepress/dist"
