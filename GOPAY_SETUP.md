# Настройка GoPay для IObchod

## Описание

GoPay - это популярный платежный сервис в Чехии, который поддерживает множество способов оплаты:

- Банковские карты (Visa, Mastercard, Maestro)
- Онлайн банкинг (ČSOB, ČNB, KB, mBank)
- Apple Pay и Google Pay
- PayPal
- SMS платежи

## Настройка

### 1. Регистрация в GoPay

1. Зарегистрируйтесь на [GoPay Developer Portal](https://www.gopay.com/cs/developers)
2. Создайте новое приложение
3. Получите следующие данные:
   - Merchant ID (Goid)
   - Secret Key
   - Access Token

### 2. Настройка переменных окружения

Создайте файл `.env.local` и добавьте следующие переменные:

```env
# GoPay Configuration
GOPAY_MERCHANT_ID=your_merchant_id
GOPAY_SECRET_KEY=your_secret_key
GOPAY_ACCESS_TOKEN=your_access_token
GOPAY_ENVIRONMENT=test

# Base URL for callbacks
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

### 3. Настройка webhook URL

В панели управления GoPay настройте webhook URL:

```
https://your-domain.com/api/payment/webhook
```

### 4. Тестирование

Для тестирования используйте тестовые данные GoPay:

#### Тестовые карты:

- **Visa**: 4111 1111 1111 1111
- **Mastercard**: 5555 5555 5555 4444
- **Maestro**: 5018 0000 0000 0009

#### Тестовые данные:

- **CVV**: 123
- **Expiry**: 12/25
- **3D Secure**: 123456

## Структура файлов

```
src/
├── app/
│   ├── api/
│   │   └── payment/
│   │       ├── gopay/
│   │       │   └── route.ts          # API для создания платежа
│   │       └── webhook/
│   │           └── route.ts          # Webhook для уведомлений
│   └── payment/
│       ├── success/
│       │   └── page.tsx              # Страница успешной оплаты
│       └── cancel/
│           └── page.tsx              # Страница отмены оплаты
├── components/
│   └── payment/
│       ├── gopay-payment-form.tsx    # Форма оплаты GoPay
│       └── gopay-info.tsx            # Информация о GoPay
└── shared/
    └── lib/
        └── utils/
            └── gopay.ts              # Утилиты для работы с GoPay API
```

## API Endpoints

### POST /api/payment/gopay

Создает новый платеж в GoPay.

**Request:**

```json
{
  "orderData": {
    "total": 25000,
    "items": [
      {
        "id": "1",
        "name": "iPhone 15 Pro",
        "price": 25000,
        "quantity": 1
      }
    ]
  },
  "customerData": {
    "email": "customer@example.com",
    "phone": "+420123456789",
    "city": "Praha",
    "street": "Václavské náměstí 1",
    "postalCode": "11000"
  }
}
```

**Response:**

```json
{
  "success": true,
  "payment": {
    "id": 123456,
    "state": "CREATED",
    "gateway_url": "https://gw.sandbox.gopay.com/gp-gw/v3/123456",
    "payment_session_id": "abc123"
  }
}
```

### POST /api/payment/webhook

Обрабатывает уведомления от GoPay о статусе платежа.

## Переход в продакшн

1. Измените `GOPAY_ENVIRONMENT` на `prod`
2. Обновите `NEXT_PUBLIC_BASE_URL` на ваш домен
3. Настройте SSL сертификат (обязательно для webhook)
4. Обновите webhook URL в панели GoPay

## Безопасность

- Все API ключи хранятся в переменных окружения
- Webhook проверяет подпись от GoPay
- Используется HTTPS для всех запросов
- Данные карт не сохраняются в приложении

## Поддержка

При возникновении проблем:

1. Проверьте логи в консоли браузера
2. Проверьте логи сервера
3. Убедитесь, что все переменные окружения настроены правильно
4. Проверьте статус платежа в панели GoPay
