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
  NAME: string;
  DESC: string;
  PRICE: number;
  TAX: number;
  TOTAL_ALONE: number;
}