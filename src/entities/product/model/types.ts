export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  storage: string;
  color: string;
  model: string;
}

export interface CartItem extends Product {
  quantity: number;
}
