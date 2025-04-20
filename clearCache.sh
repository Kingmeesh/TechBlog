#!/bin/bash

# 清除缓存（清除该 Zone 下的所有缓存）
echo "清除 Cloudflare 缓存..."
curl -X POST "https://api.cloudflare.com/client/v4/zones/57eea33488ddc6e32c8e4a81cd1c8648/purge_cache" \
  -H "Authorization: Bearer z_a1mUywx5mrvuvdnldttfIAfT9kCumtLRaZlqEH" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'

echo "缓存清除完成！"

