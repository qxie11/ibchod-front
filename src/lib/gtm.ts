export const GTM_ID = 'GTM-T8VSGKW7';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'pageview',
      page: url,
    });
  }
};

export const event = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'custom_event',
      event_category: category,
      event_action: action,
      event_label: label,
      event_value: value,
    });
  }
};

export const ecommerce = (data: any) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      ecommerce: data,
    });
  }
};

// E-commerce events
export const addToCart = (product: any) => {
  ecommerce({
    currencyCode: 'CZK',
    add: {
      products: [
        {
          name: product.name,
          id: product.id,
          price: product.price,
          category: 'iPhone',
          quantity: 1,
        },
      ],
    },
  });
};

export const purchase = (order: any, products: any[]) => {
  ecommerce({
    currencyCode: 'CZK',
    purchase: {
      actionField: {
        id: order.id,
        revenue: order.total,
        tax: 0,
        shipping: 0,
      },
      products: products.map((product) => ({
        name: product.name,
        id: product.id,
        price: product.price,
        category: 'iPhone',
        quantity: product.quantity,
      })),
    },
  });
};

export const viewItem = (product: any) => {
  ecommerce({
    currencyCode: 'CZK',
    detail: {
      products: [
        {
          name: product.name,
          id: product.id,
          price: product.price,
          category: 'iPhone',
        },
      ],
    },
  });
};

export const viewItemList = (products: any[], listName: string) => {
  ecommerce({
    currencyCode: 'CZK',
    impressions: products.map((product, index) => ({
      name: product.name,
      id: product.id,
      price: product.price,
      category: 'iPhone',
      position: index + 1,
      list: listName,
    })),
  });
};
