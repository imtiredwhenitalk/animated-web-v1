FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite за замовчуванням слухає порт 5173
EXPOSE 5173

# --host 0.0.0.0 потрібен, щоб приймати з'єднання зовні
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]