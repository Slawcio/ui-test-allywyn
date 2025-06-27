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

export interface Product {
  name: string;
  desc: string;
  price: number;
  tax: number;
  totalAlone: number;
}