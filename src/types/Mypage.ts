export interface MyPageResponse {
  errorCode: string;
  status: number;
  message: string;
  data: {
    userId: number;
    name: string;
    nickname: string;
    profileImage: string;
    email: string;
    createdAt: string;
  };
}

export interface PurchaseItem {
  tradeId: number;
  productId: number;
  title: string;
  price: number;
  thumbnailUrl: string;
  tradeDate: string;
  status: string;
}

export interface PurchaseHistoryResponse {
  errorCode: string;
  status: number;
  message: string;
  data: {
    totalElements: number;
    totalPages: number;
    numberOfElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
    content: PurchaseItem[];
  };
}
