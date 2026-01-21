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
