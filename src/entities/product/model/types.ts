export interface CartItem {
  quantity: number;
}

export interface Smartphone {
  id: number;
  name: string;
  price: number;
  gallery: string[];
  large_desc: string;
  small_desc?: string;
  capacity?: number;
  color?: string;
  quantity?: number;
  active: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
