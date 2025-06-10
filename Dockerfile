# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 安装构建依赖
RUN apk add --no-cache python3 make g++ gcc

# 复制 package 文件
COPY web/package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY web/ .

# 构建应用
RUN npm run build

# 运行阶段
FROM node:18-alpine

WORKDIR /app

# 安装 yt-dlp 和其他必要的运行时依赖
RUN apk add --no-cache python3 ffmpeg

# 安装 yt-dlp
RUN wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

# 从构建阶段复制文件
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

# 设置健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"] 