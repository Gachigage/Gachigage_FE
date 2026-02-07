# 서버에 올라갈 Dockerfile (빌드 과정 없음!)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 보안을 위한 사용자 설정
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# [중요] GitHub에서 빌드해서 보낸 파일들을 복사
# public 폴더와 .next/static, standalone을 제자리에 둡니다.
COPY ./public ./public
COPY ./standalone ./
COPY ./static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]