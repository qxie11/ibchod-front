#!/bin/bash

# Скрипт для сборки и запуска контейнера с исправленными API URL
echo "🔨 Сборка и запуск контейнера с исправленными API URL..."

# Останавливаем и удаляем существующий контейнер
docker stop iphone-store-prod 2>/dev/null || true
docker rm iphone-store-prod 2>/dev/null || true

# Собираем новый образ
echo "🏗️ Собираем новый образ..."
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://iobchod.shop/v1/api \
  --build-arg NEXT_PUBLIC_BASE_URL=https://iobchod.shop \
  -t dsx11/iobchod-store:latest .

# Запускаем контейнер с frontend на порту 9002
echo "🏃 Запускаем контейнер..."
docker run -d \
  --name iphone-store-prod \
  -p 9002:9002 \
  --restart unless-stopped \
  -e NEXT_PUBLIC_API_URL=https://iobchod.shop/v1/api \
  -e NEXT_PUBLIC_BASE_URL=https://iobchod.shop \
  -e NEXTAUTH_SECRET=secretjwt \
  -e NEXTAUTH_URL=https://iobchod.shop \
  -e NODE_ENV=production \
  dsx11/iobchod-store:latest

echo "⏳ Ждем запуска контейнера..."
sleep 15

echo "📊 Запущенные контейнеры:"
docker ps | grep iphone-store

echo "🌐 Тестируем доступность..."
curl -I http://localhost:9002/ 2>/dev/null | head -1 || echo "❌ Приложение недоступно"

echo ""
echo "✅ Готово! Приложение запущено с исправленными API URL:"
echo "🔗 Локальный доступ: http://localhost:9002/"
echo "🌐 Публичный доступ: https://iobchod.shop/"
echo ""
echo "📋 Информация о контейнере:"
docker inspect iphone-store-prod --format='{{.Config.Image}}' 2>/dev/null || echo "Контейнер не найден"
echo ""
echo "📝 Логи контейнера (последние 20 строк):"
docker logs --tail 20 iphone-store-prod 2>/dev/null || echo "Логи недоступны"
