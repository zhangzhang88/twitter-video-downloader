#!/bin/bash

# 确保脚本在出错时停止执行
set -e

echo "开始部署..."

# 安装必要的软件
echo "正在安装 Docker 和 Docker Compose..."
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# 安装 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 克隆代码
echo "正在克隆代码..."
git clone git@github.com:zhangzhang88/twitter-video-downloader.git
cd twitter-video-downloader

# 构建和启动容器
echo "正在构建和启动容器..."
docker-compose build
docker-compose up -d

echo "部署完成！应用现在应该在 http://localhost:3000 运行" 