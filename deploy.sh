#!/bin/bash

# 确保脚本在出错时停止执行
set -e

echo "开始部署..."

# 如果已存在项目目录，则删除
if [ -d "twitter-video-downloader" ]; then
    echo "删除旧的项目目录..."
    rm -rf twitter-video-downloader
fi

# 克隆代码
echo "正在克隆代码..."
git clone https://github.com/zhangzhang88/twitter-video-downloader.git
cd twitter-video-downloader

# 构建和启动容器
echo "正在构建和启动容器..."
docker-compose build
docker-compose up -d

echo "部署完成！应用现在应该在 http://144.21.54.26:3000 运行" 