export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  gallery?: string[];
  storage: string;
  color: string;
  model: string;
}

export interface CartItem extends Product {
  quantity: number;
}
