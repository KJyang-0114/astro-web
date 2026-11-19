# 第一階段：建置靜態檔
# Node 版本與 .github/workflows/ci-gate.yml 的 setup-node 一致
FROM node:22-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Optimize for limited memory environments
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=2048"
ENV GENERATE_SOURCEMAP=false

RUN npm run build

# 第二階段：用 nginx 送 dist（不再用 astro preview 當正式伺服器）
FROM nginx:alpine

RUN printf 'types { text/markdown md; }\n' > /etc/nginx/conf.d/00-markdown.types \
 && sed -i 's#include       /etc/nginx/mime.types;#include       /etc/nginx/mime.types;\n    include       /etc/nginx/conf.d/00-markdown.types;#' /etc/nginx/nginx.conf \
 && rm /etc/nginx/conf.d/default.conf

COPY docker/nginx-site.conf /etc/nginx/conf.d/site.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:3000/healthz || exit 1
