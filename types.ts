export interface Cookie {
    name: string;
    value: string;
    domain: string;
    path: string;
    expires: number;
    httpOnly: boolean;
    secure: boolean;
    sameSite: string;
}
export interface ProductType {
  name: string;
  desc: string;
  price: number;
  tax: number;
  totalAlone: number;
  imgSrc: string;
}

export type PurchaseOptions = {
  names?: string[];
  range?: [number, number]; 
  count?: number;
};

export enum PageContext {
  Inventory = 'inventory',
  ProductPage = 'product',
  Cart = 'cart',
  Summary = 'summary'
}