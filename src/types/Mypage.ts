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

export interface ProductListProps {
  title: string;
  price: number;
  quantity: number;
  mainImageUrl: string;
  productId: number;
}

// export interface TradeHistoryItem {
//   tradeId: number;
//   productId: number;
//   title: string;
//   price: number;
//   thumbnailUrl: string;
//   tradeDate: string;
//   quantity: number;
// }

export interface PurchaseItem {
  productId: number;
  title: string;
  thumbnailUrl: string;
  mainImageUrl: string;
  province: string | null;
  city: string | null;
  group: string | null;
  tradeType: "DIRECT" | "DELIVERY" | "ALL";
  price: number;
  quantity: number;
  viewCount: number;
  createdAt: string;
  liked: boolean;
  tradeId: number;
}

export interface PurchaseHistoryResponse {
  errorCode: string;
  status: number;
  message: string;
  data: {
    content: PurchaseItem[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      offset: number;
      paged: boolean;
      unpaged: boolean;
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
    };
    totalElements: number;
    totalPages: number;
    numberOfElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
  };
}
