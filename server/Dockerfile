FROM node:22

WORKDIR /app

# Ставим все зависимости, включая dev (чтобы был nest-cli для build)
COPY package*.json ./
RUN npm install

# Копируем исходники
COPY . .

# Собираем проект
RUN npm run build

# Запускаем приложение в прод-режиме
CMD ["npm", "run", "start:prod"]
