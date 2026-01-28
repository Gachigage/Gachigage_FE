import { z } from "zod";

// 가격표 스키마
export const priceTableItemSchema = z.object({
    quantity: z
        .number({ message: "개수를 입력해주세요" })
        .min(1, "개수는 1개 이상이어야 합니다"),
    price: z
        .number({ message: "가격을 입력해주세요" })
        .min(0, "가격은 0원 이상이어야 합니다"),
    status: z.enum(["ACTIVE", "INACTIVE"]),
});

// 거래 희망 장소 스키마
export const preferredLocationSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string().min(1, "주소를 입력해주세요"),
});

export const productFormSchema = z.object({
    images: z.array(z.string()).min(1, "이미지를 최소 1개 이상 등록해주세요"),
    secondaryCategoryId: z
        .number({ message: "카테고리를 선택해주세요" })
        .nullable()
        .refine((val) => val !== null, "카테고리를 선택해주세요"),
    title: z
        .string()
        .min(1, "제목을 입력해주세요")
        .max(50, "제목을 50자 이내로 입력해주세요"),
    detail: z
        .string()
        .max(500, "세부정보는 500자 이내로 입력헤주세요")
        .optional(),
    stock: z.number({ message: "재고 수량은 필수입니다" }).min(0),
    priceTable: z
        .array(priceTableItemSchema)
        .refine(
            (items) =>
                items.some((item) => item.quantity > 0 && item.price >= 0),
            "판매 옵션을 최소 1개 이상 입력해주세요",
        ),
    tradeType: z
        .object({
            direct: z.boolean(),
            delivery: z.boolean,
        })
        .refine(
            (val) => val.direct || val.delivery,
            "거래 유형을 최소 1개 이상 선택해주세요",
        ),
    preferredLocation: preferredLocationSchema.nullable().optional(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
export type PriceTableItemData = z.infer<typeof priceTableItemSchema>;
export type PreferredLocationData = z.infer<typeof preferredLocationSchema>;
export type ProductFormValidationResult =
    | { success: true; data: ProductFormData }
    | { success: false; error: z.ZodError<ProductFormData> };
