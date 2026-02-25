# 1) deps
FROM node:20-alpine AS deps
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# native 모듈 대비(특히 sharp 등)
RUN apk add --no-cache libc6-compat python3 make g++ \
  && corepack enable \
  && corepack prepare pnpm@9.15.4 --activate

# pnpm 단독 프로젝트: package.json + lockfile만 있으면 됨
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# 2) builder
FROM node:20-alpine AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# build args (GitHub Actions에서 주입)
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_NAVER_MAP_CLIENT_ID

# Next build에서 읽도록 ENV로 내려줌
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=$NEXT_PUBLIC_NAVER_MAP_CLIENT_ID

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

# 3) runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Next standalone output 복사
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]