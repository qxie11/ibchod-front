import { NextRequest, NextResponse } from 'next/server';
import {
  trackProductView,
  trackCartOperation,
  trackOrder,
  pageRenderTime,
  apiResponseTime,
} from '@/lib/metrics';

export const dynamic = 'force-dynamic';

interface MetricEvent {
  type: string;
  value?: number;
  labels?: Record<string, string>;
}

export async function POST(request: NextRequest) {
  try {
    const event: MetricEvent = await request.json();

    switch (event.type) {
      case 'product_view':
        if (event.labels?.product_id) {
          trackProductView(event.labels.product_id, event.labels.category);
        }
        break;

      case 'cart_operation':
        if (event.labels?.operation) {
          trackCartOperation(event.labels.operation as 'add' | 'remove' | 'clear');
        }
        break;

      case 'order':
        if (event.labels?.status) {
          trackOrder(event.labels.status, event.value);
        }
        break;

      case 'page_render_time':
        if (event.labels?.page && event.value !== undefined) {
          pageRenderTime.observe({ page: event.labels.page }, event.value);
        }
        break;

      case 'web_vital_lcp':
      case 'web_vital_fid':
      case 'web_vital_cls':
        if (event.value !== undefined && event.labels?.page) {
          apiResponseTime.observe(
            {
              endpoint: event.type,
              method: 'GET',
              status: '200',
            },
            event.value
          );
        }
        break;

      default:
        console.warn('Unknown metric type:', event.type);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error tracking metric:', error);
    return NextResponse.json({ error: 'Failed to track metric' }, { status: 500 });
  }
}

