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

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface PurchaseItem {
  tradeId: number;
  productId: number;
  title: string;
  thumbnailUrl: string;
  price: number;
  quantity: number;
  tradeDate: string;
  status: "DONE" | "CANCELLED";
}

export type PurchaseHistoryData = PageResponse<PurchaseItem>;

export interface ListingItem {
  productId: number;
  title: string;
  mainImageUrl: string;
  province: string;
  city: string;
  tradeType: "DIRECT" | "DELIVERY";
  price: number;
  quantity: number;
  viewCount: number;
  createdAt: string;
  liked: boolean;
}

export type ListingHistoryData = PageResponse<ListingItem>;

export interface ApiResponse<T> {
  errorCode: string;
  status: number;
  message: string;
  data: T;
}


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
  tradeDate: string;
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
