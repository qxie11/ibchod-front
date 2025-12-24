import { Counter, Gauge, Histogram, collectDefaultMetrics, register } from 'prom-client';

collectDefaultMetrics({ register });

export const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5, 10],
  registers: [register],
});

export const apiResponseTime = new Histogram({
  name: 'api_response_time_milliseconds',
  help: 'API response time in milliseconds',
  labelNames: ['endpoint', 'method', 'status'],
  buckets: [10, 50, 100, 200, 500, 1000, 2000, 5000],
  registers: [register],
});

export const apiErrorsTotal = new Counter({
  name: 'api_errors_total',
  help: 'Total number of API errors',
  labelNames: ['endpoint', 'method', 'error_type'],
  registers: [register],
});

export const dbQueryDuration = new Histogram({
  name: 'db_query_duration_milliseconds',
  help: 'Database query duration in milliseconds',
  labelNames: ['operation', 'table'],
  buckets: [5, 10, 25, 50, 100, 250, 500, 1000],
  registers: [register],
});

export const dbConnectionsActive = new Gauge({
  name: 'db_connections_active',
  help: 'Number of active database connections',
  registers: [register],
});

export const ordersTotal = new Counter({
  name: 'orders_total',
  help: 'Total number of orders',
  labelNames: ['status'],
  registers: [register],
});

export const orderValue = new Histogram({
  name: 'order_value_dollars',
  help: 'Order value in dollars',
  labelNames: ['status'],
  buckets: [10, 50, 100, 200, 500, 1000, 2000, 5000],
  registers: [register],
});

export const productsViewed = new Counter({
  name: 'products_viewed_total',
  help: 'Total number of product views',
  labelNames: ['product_id', 'category'],
  registers: [register],
});

export const cartOperations = new Counter({
  name: 'cart_operations_total',
  help: 'Total number of cart operations',
  labelNames: ['operation'],
  registers: [register],
});

export const cacheHits = new Counter({
  name: 'cache_hits_total',
  help: 'Total number of cache hits',
  labelNames: ['cache_name'],
  registers: [register],
});

export const cacheMisses = new Counter({
  name: 'cache_misses_total',
  help: 'Total number of cache misses',
  labelNames: ['cache_name'],
  registers: [register],
});

export const paymentsTotal = new Counter({
  name: 'payments_total',
  help: 'Total number of payment attempts',
  labelNames: ['provider', 'status'],
  registers: [register],
});

export const paymentDuration = new Histogram({
  name: 'payment_duration_milliseconds',
  help: 'Payment processing duration in milliseconds',
  labelNames: ['provider', 'status'],
  buckets: [100, 500, 1000, 2000, 5000, 10000],
  registers: [register],
});

export const activeUsers = new Gauge({
  name: 'active_users',
  help: 'Number of currently active users',
  registers: [register],
});

export const pageRenderTime = new Histogram({
  name: 'page_render_time_milliseconds',
  help: 'Page render time in milliseconds',
  labelNames: ['page'],
  buckets: [100, 300, 500, 1000, 2000, 3000, 5000],
  registers: [register],
});

export { register };

export const trackHttpRequest = (
  method: string,
  route: string,
  statusCode: number,
  duration: number
) => {
  httpRequestsTotal.inc({ method, route, status_code: statusCode });
  httpRequestDuration.observe({ method, route, status_code: statusCode }, duration / 1000);
};

export const trackApiCall = (
  endpoint: string,
  method: string,
  status: number,
  duration: number
) => {
  apiResponseTime.observe({ endpoint, method, status: status.toString() }, duration);
};

export const trackApiError = (endpoint: string, method: string, errorType: string) => {
  apiErrorsTotal.inc({ endpoint, method, error_type: errorType });
};

export const trackOrder = (status: string, value?: number) => {
  ordersTotal.inc({ status });
  if (value !== undefined) {
    orderValue.observe({ status }, value);
  }
};

export const trackProductView = (productId: string, category?: string) => {
  productsViewed.inc({ product_id: productId, category: category || 'unknown' });
};

export const trackCartOperation = (operation: 'add' | 'remove' | 'clear') => {
  cartOperations.inc({ operation });
};

export const trackPayment = (provider: string, status: string, duration?: number) => {
  paymentsTotal.inc({ provider, status });
  if (duration !== undefined) {
    paymentDuration.observe({ provider, status }, duration);
  }
};
