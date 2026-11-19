# astro-web 的 CI runner image（2026-11-20）。兩個 runner 容器 astro-web-ci-build 與 astro-web-ci-gate 共用。
#
# 基底是 synk-atelier 的 synk-ci-runner:latest（同一台 Mac mini 上已建好；來源是 synk-atelier repo 的
# deploy/ci-runner/：Actions runner、防火牆 entrypoint、每個工作前後的清理 hook、run-container.sh、
# register.sh、Node 24、gh、jq、git）。這裡只加 astro-web 需要、基底沒有的三樣：
#   - rsync：部署工作（deploy-macmini.yml）用 rsync --delete 同步原始碼到主機。
#   - nginx：runner 裡沒有 Docker，`verify:runtime -- --nginx` 改用 image 裡的 nginx 以非 root 身分
#     跑 repo 的 docker/nginx-site.conf，對 dist/ 做同一套 runtime 檢查。
#   - Node 22：與正式 Dockerfile 的 node:22-slim 同一個大版本，放進 tool cache 種子，
#     actions/setup-node 的 node-version 22 就不用下載。種子是 root 擁有，每個工作開始時由 hook 複製。
# 不放任何密鑰。
#
# 建置（在 Mac mini，kjyang 身分，build 目錄 ~/astro-web-ci-runner-build/ 放這個檔案）：
#   docker build -t astro-web-ci-runner:latest ~/astro-web-ci-runner-build
# synk-ci-runner:latest 重建後（例如 runner 版本升級），這裡也要重建，再用 run-container.sh 重建兩個容器
# （volume 留著，不用重新註冊）。
FROM synk-ci-runner:latest

ARG TARGETARCH
ARG NODE22_VERSION=22.23.5
ARG NODE22_SHA256_arm64=2babb9eb5264860d540849f4b064a6fbdebcdc323657d9d382ce23d313fd5e09
ARG NODE22_SHA256_amd64=cdeb8670a0c81f51b4dc4ac61919f9b1ad917b304bf8221eb939570663d240f8

USER root
RUN apt-get update \
 && apt-get install -y --no-install-recommends rsync nginx \
 && rm -rf /var/lib/apt/lists/* \
 && rm -f /etc/nginx/sites-enabled/default

RUN set -eu; case "$TARGETARCH" in arm64) a=arm64; sum=$NODE22_SHA256_arm64 ;; amd64) a=x64; sum=$NODE22_SHA256_amd64 ;; *) echo "unsupported $TARGETARCH"; exit 1 ;; esac; \
    curl -fsSL -o /tmp/node22.tar.xz "https://nodejs.org/dist/v${NODE22_VERSION}/node-v${NODE22_VERSION}-linux-${a}.tar.xz"; \
    echo "$sum  /tmp/node22.tar.xz" | sha256sum -c -; \
    d=/opt/toolcache-seed/node/${NODE22_VERSION}/${a}; mkdir -p "$d"; \
    tar xJf /tmp/node22.tar.xz -C "$d" --strip-components=1; rm /tmp/node22.tar.xz; \
    touch "/opt/toolcache-seed/node/${NODE22_VERSION}/${a}.complete"
