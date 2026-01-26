export type Product = {
    productId: number;
    title: string;
    price: number; // 물건 가격 (추가)
    quantity: number; // 물건 개수 (추가)
    thumbnailUrl: string;
    category: string;
    province: string;
    city: string;
    district: string;
    tradeType: string;
    viewCount: number;
    isLike: boolean; // 내가 좋아요 했는지 (추가)
    createdAt: string;
};

export type ProductList = {
    products: Product[];
};

// 카테고리 관련 타입
export type CategoryChild = {
    id: number;
    name: string;
    children: [];
};

export type Category = {
    id: number;
    name: string;
    children: CategoryChild[];
};

export type CategoryResponse = {
    status: number;
    message: string;
    data: Category[];
};
