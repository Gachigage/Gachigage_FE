# 서버에 올라갈 Dockerfile
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 보안을 위한 사용자 설정
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# COPY 할 때 소유권을 nextjs에게 넘겨줍니다
COPY --chown=nextjs:nodejs ./public ./public
COPY --chown=nextjs:nodejs ./standalone ./
COPY --chown=nextjs:nodejs ./static ./.next/static

# .next 폴더와 캐시 폴더 권한을 확실하게 다시 잡습니다.
RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]