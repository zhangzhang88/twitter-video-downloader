# 部署指南

## 环境要求
- Docker
- Docker Compose
- Nginx Proxy Manager（可选，用于域名和SSL配置）

## 系统要求
- 1GB RAM
- 1 CPU 核心
- 至少 2GB 的交换空间（推荐）

## 准备工作

1. 设置交换空间（推荐）
```bash
# 创建 2GB 的交换文件
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 设置开机自动启用交换文件
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

2. 安装 Docker 和 Docker Compose（如果尚未安装）
```bash
# 安装 Docker
curl -fsSL https://get.docker.com | sh

# 将当前用户添加到 docker 组
sudo usermod -aG docker $USER

# 安装 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## 部署步骤

1. 克隆仓库：
```bash
git clone https://github.com/zhangzhang88/twitter-video-downloader.git
cd twitter-video-downloader
```

2. 构建并启动服务：
```bash
docker-compose build
docker-compose up -d
```

3. 配置 Nginx 反向代理（如果使用 Nginx Proxy Manager）：
   - 登录到 Nginx Proxy Manager
   - 添加新的代理主机
   - 设置域名（例如：dl.ztr8.uk）
   - 设置目标地址为：`http://172.19.0.2:3000`（或者实际的 Docker 容器 IP）
   - 启用 SSL（推荐使用 Let's Encrypt）
   - 保存并应用更改

## 注意事项
- 应用默认运行在 3000 端口
- 确保 Docker 容器和 Nginx Proxy Manager 在同一个 Docker 网络中
- 如果需要更新应用，运行：
  ```bash
  docker-compose down
  git pull
  docker-compose build
  docker-compose up -d
  ```

## 监控和维护

1. 查看资源使用情况
```bash
docker stats video-downloader
```

2. 检查日志
```bash
# 查看最近的日志
docker-compose logs --tail=100

# 实时查看日志
docker-compose logs -f
```

3. 重启服务
```bash
docker-compose restart
```

4. 更新应用
```bash
# 拉取最新代码
git pull

# 重新构建并启动
docker-compose up -d --build
```

## 故障排除
1. 如果无法访问应用：
   - 检查容器状态：`docker ps`
   - 查看容器日志：`docker logs video-downloader`
   - 确认容器 IP 地址：`docker inspect video-downloader | grep IPAddress`

2. 如果 SSL 证书问题：
   - 在 Nginx Proxy Manager 中重新申请 Let's Encrypt 证书
   - 确保域名 DNS 已正确解析到服务器 IP

## 注意事项

1. 内存使用：
   - 服务配置为使用最多 768MB 内存
   - 建议保持系统至少有 200MB 空闲内存
   - 启用交换空间可以防止内存不足情况

2. CPU 使用：
   - 服务限制使用 80% 的 CPU 资源
   - 建议监控 CPU 使用情况，必要时调整限制

3. 日志管理：
   - 日志文件限制为 10MB，保留最近 3 个文件
   - 定期检查磁盘空间使用情况

4. 安全建议：
   - 建议配置防火墙只开放必要端口
   - 定期更新系统和 Docker 镜像
   - 监控服务的安全日志 