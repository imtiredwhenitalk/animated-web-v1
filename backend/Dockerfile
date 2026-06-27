# Етап 1: збірка
FROM node:22-alpine AS builder
WORKDIR /app

# Встановлюємо залежності
COPY package.json package-lock.json ./
RUN npm ci

# Копіюємо вихідний код і збираємо
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Видаляємо dev-залежності для продакшену
RUN npm ci --omit=dev

# Етап 2: фінальний образ
FROM node:22-alpine AS runner
WORKDIR /app

# Копіюємо продакшен-залежності та зібраний код
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Запускаємо сервер
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/server.js"]