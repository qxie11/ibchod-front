import { Smartphone } from '@/entities/product/model/types';

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  smartphone: Smartphone;
}

export interface Order {
  id: number;
  name: string;
  email: string;
  phone: string;
  total: number;
  createdAt: string;
  orderItems: OrderItem[];
}
