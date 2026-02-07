export interface ProductPrice {
  id: number;
  quantity: number;
  price: number;
}

export interface TradeInfoResponse {
  stock: number;
  productPriceList: ProductPrice[];
}
