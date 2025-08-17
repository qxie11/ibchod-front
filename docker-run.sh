#!/bin/bash

 USE_NGINX=false
if [[ "$1" == "--nginx" || "$1" == "-n" ]]; then
    USE_NGINX=true
    echo "🚀 Запуск iPhone Store с Nginx..."
else
    echo "🚀 Запуск iPhone Store..."
fi

 docker-compose down

 docker rmi iphone-store-iphone-store:latest 2>/dev/null || true
if [ "$USE_NGINX" = true ]; then
    docker rmi iphone-store-nginx:latest 2>/dev/null || true
fi

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

if [ "$USE_NGINX" = true ]; then
    echo "🌐 Тестируем доступность через Nginx..."
    curl -I http://localhost:80/ 2>/dev/null | head -1 || echo "❌ Nginx недоступен"
    echo "🌐 Тестируем доступность напрямую..."
    curl -I http://localhost:9002/ 2>/dev/null | head -1 || echo "❌ Приложение недоступно"
    echo "✅ Готово!"
    echo "📱 Nginx: http://localhost:80"
    echo "🔧 Прямой доступ: http://localhost:9002"
else
    echo "🌐 Тестируем доступность..."
    curl -I http://localhost:9002/ 2>/dev/null | head -1 || echo "❌ Недоступно"
    echo "✅ Готово! http://localhost:9002"
fi

echo ""
echo "📋 Полезные команды:"
echo "  docker-compose logs -f          # Просмотр логов"
echo "  docker-compose down             # Остановка"
echo "  docker-compose restart          # Перезапуск"
if [ "$USE_NGINX" = true ]; then
    echo "  curl http://localhost/health     # Проверка здоровья nginx"
fi
