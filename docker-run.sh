docker pull dsx11/iobchod-store

# Запускаем контейнер с frontend на порту 9002
docker run -d \
  --name iphone-store \
  -p 9002:9002 \
  --restart unless-stopped \
  dsx11/iobchod-store

echo "⏳ Ждем запуска..."
sleep 10

echo "📊 Запущенные контейнеры:"
docker ps

echo "🌐 Тестируем доступность..."
curl -I http://localhost:9002/ 2>/dev/null | head -1 || echo "❌ Приложение недоступно"

echo "✅ Готово! Приложение: http://51.20.132.226/"