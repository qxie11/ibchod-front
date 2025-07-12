export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  storage: string;
  color: string;
}

export interface CartItem extends Product {
  quantity: number;
}
