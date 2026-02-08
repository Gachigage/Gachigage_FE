"use client";

import { useState } from "react";
import BackButton from "@/components/atoms/BackButton";
import ProductCreateImgs from "@/components/atoms/ProductCreateImgs";
import ProductForm from "@/components/molecules/ProductForm";
import AlertModal from "@/components/atoms/AlertModal";
import { useProductFormStore } from "@/store/useProductFormStore";
import { useEditProduct } from "@/hooks/useProductMutation";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ProductEdutPage() {
    const router = useRouter();
    const { id: productId } = useParams<{ id: string }>();
    const images = useProductFormStore((state) => state.images);
    const primaryCategoryId = useProductFormStore(
        (state) => state.primaryCategoryId,
    );
    const secondaryCategoryId = useProductFormStore(
        (state) => state.secondaryCategoryId,
    );
    const title = useProductFormStore((state) => state.title);
    const priceTable = useProductFormStore((state) => state.priceTable);
    const tradeType = useProductFormStore((state) => state.tradeType);

    const stock = useProductFormStore((state) => state.stock);

    const validate = useProductFormStore((state) => state.validate);
    const resetForm = useProductFormStore((state) => state.resetForm);

    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        title: string;
        description: string;
        type: "error" | "confirm" | "warning" | "question" | "info";
        onClose: () => void;
    }>({
        isOpen: false,
        title: "",
        description: "",
        onClose: () => {},
        type: "error" as "error" | "confirm" | "warning" | "question" | "info",
    });

    const closeModalNormal = () => {
        setModalState((prev) => ({ ...prev, isOpen: false }));
    };

    const closeModalBack = () => {
        setModalState((prev) => ({ ...prev, isOpen: false }));
        router.back();
    };

    const { mutate: editProduct, isPending } = useEditProduct({
        onError: (error) => {
            setModalState({
                isOpen: true,
                title: "등록 실패",
                onClose: closeModalNormal,
                description:
                    error.message ||
                    "상품 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
                type: "error",
            });
        },
    });

    const handleSubmit = () => {
        const validationResult = validate();

        if (!validationResult.success) {
            const firstError = Object.values(validationResult.error)[0];
            setModalState({
                isOpen: true,
                title: "입력 확인",
                onClose: closeModalNormal,
                description:
                    typeof firstError === "string"
                        ? firstError
                        : "필수 항목을 모두 입력해주세요.",
                type: "error",
            });
            return;
        }

        const overStockItem = priceTable.find(
            (item) => item.quantity > 0 && item.quantity > stock,
        );
        if (overStockItem) {
            setModalState({
                isOpen: true,
                title: "재고 확인",
                onClose: closeModalNormal,
                description: `판매 개수(${overStockItem.quantity}개)가 남은 수량(${stock}개)보다 많습니다.`,
                type: "warning",
            });
            return;
        }

        editProduct(Number(productId));
    };

    const handleCancle = () => {
        setModalState({
            isOpen: true,
            title: "변경을 삭제하시겠습니까?",
            onClose: closeModalBack,
            description:
                "지금까지 변경한 내용이 사라져요.\n변경을 취소하시겠습니까?",
            type: "warning",
        });
    };

    const hasCategorySelected =
        secondaryCategoryId !== null || primaryCategoryId !== null;

    const formIsValid =
        images.length >= 1 &&
        hasCategorySelected &&
        title.trim() !== "" &&
        stock > 0 &&
        priceTable.some((item) => item.quantity > 0 && item.price > 0) &&
        (tradeType.direct || tradeType.delivery);

    return (
        <div className="w-full flex-1 bg-gachigageWhite flex justify-center">
            <AlertModal
                isOpen={modalState.isOpen}
                onCancel={closeModalNormal}
                onClose={modalState.onClose}
                title={modalState.title}
                description={modalState.description}
                type={modalState.type}
            />

            <div className="w-full pt-[140px] pb-[190px] md:pb-[60px] max-w-[354px] md:max-w-[1152px] md:px-[24px] flex flex-col gap-[60px]">
                <BackButton pageName={"판매 상품 목록"} href={"/products"} />
                <div className="w-full flex flex-col md:flex-row gap-[60px] justify-center">
                    <ProductCreateImgs />
                    <div className="flex flex-col gap-[24px]">
                        <ProductForm />
                        <div className="flex gap-[8px]">
                            <button
                                onClick={handleCancle}
                                className={`w-full h-[56px] cursor-pointer font-semibold leading-[120%] text-[24px] rounded-[8px] flex items-center justify-center bg-white text-gachigageSubMint border border-gachigageSubMint`}
                            >
                                변경 취소
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!formIsValid || isPending}
                                className={`w-full h-[56px] font-semibold leading-[120%] text-[24px] rounded-[8px] flex items-center justify-center ${
                                    formIsValid && !isPending
                                        ? "cursor-pointer text-gachigageWhite bg-gachigageMint border-[0.5px] border-gachigageBrightMint1"
                                        : "cursor-not-allowed bg-gachigageGray3 border-[0.5px] border-gachigageGray5 text-gachigageGray5"
                                }`}
                            >
                                {isPending ? "수정중..." : "작성완료"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
