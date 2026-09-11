# Next.js 15 PWA. NEXT_PUBLIC_* is baked at build; browser calls the host-mapped API.
# Do not set NODE_ENV=production before npm ci — Next needs TypeScript (devDependency) to load next.config.ts.
FROM node:20-alpine

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

RUN npm run build

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs \
    && chown -R nextjs:nextjs /app
USER nextjs

EXPOSE 3000

ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000

CMD ["npm", "run", "start"]
