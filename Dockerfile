# 使用 Node 官方镜像
FROM node:20

WORKDIR /usr/src/app

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install

# 复制源代码
COPY . .

# 编译 TypeScript
RUN pnpm run build

# 监听端口
EXPOSE 3000

CMD ["node", "dist/index.js"]
