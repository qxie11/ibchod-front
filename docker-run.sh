#!/bin/bash

echo "🚀 Запуск iPhone Store..."

# Останавливаем старые контейнеры
docker-compose down

# Удаляем старые образы
docker rmi iphone-store-iphone-store:latest 2>/dev/null || true

# Пересобираем без кэша
docker-compose build --no-cache

# Запускаем
docker-compose up -d

echo "⏳ Ждем запуска..."
sleep 15

echo "📊 Статус:"
docker-compose ps

echo "📝 Логи:"
docker-compose logs --tail=10

echo "🌐 Тестируем доступность..."
curl -I http://localhost:9002/ 2>/dev/null | head -1 || echo "❌ Недоступно"

echo "✅ Готово! http://localhost:9002"
