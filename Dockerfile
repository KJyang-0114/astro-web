# 使用官方Node.js鏡像作為基礎
FROM node:20-alpine

# 設置工作目錄
WORKDIR /app

# 複製package.json和package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製源代碼
COPY . .

# 構建應用
RUN npm run build

# 暴露端口
EXPOSE 3000

# 啟動命令
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"] 