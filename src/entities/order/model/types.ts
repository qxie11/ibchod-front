import type { Smartphone } from '@/entities/product/model/types';

export interface OrderItem {
  smartphone: Smartphone;
  quantity: number;
}

export interface Order {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  items: OrderItem[];
}
