#!/bin/bash

# 执行 Hexo 部署命令
hexo clean
hexo generate
hexo deploy

# 执行清除缓存脚本
echo "执行清除 Cloudflare 缓存脚本..."
bash clearCache.sh
