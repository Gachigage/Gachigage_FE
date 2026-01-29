"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/atoms/BackButton";
import ProductCreateImgs from "@/components/atoms/ProductCreateImgs";
import ProductForm from "@/components/molecules/ProductForm";
import AlertModal from "@/components/atoms/AlertModal";
import { useProductFormStore } from "@/store/useProductFormStore";
import { useCreateProduct } from "@/hooks/useProductMutation";

export default function ProductCreatePage() {
    const images = useProductFormStore((state) => state.images);
    const secondaryCategoryId = useProductFormStore(
        (state) => state.secondaryCategoryId,
    );
    const title = useProductFormStore((state) => state.title);
    const priceTable = useProductFormStore((state) => state.priceTable);
    const tradeType = useProductFormStore((state) => state.tradeType);

    const validate = useProductFormStore((state) => state.validate);
    const resetForm = useProductFormStore((state) => state.resetForm);

    const [modalState, setModalState] = useState({
        isOpen: false,
        title: "",
        description: "",
        type: "error" as "error" | "confirm" | "warning" | "question" | "info",
    });

    const { mutate: createProduct, isPending } = useCreateProduct({
        onError: (error) => {
            setModalState({
                isOpen: true,
                title: "등록 실패",
                description:
                    error.message ||
                    "상품 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
                type: "error",
            });
        },
    });

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    const handleCloseModal = () => {
        setModalState((prev) => ({ ...prev, isOpen: false }));
    };

    const handleSubmit = () => {
        const validationResult = validate();

        if (!validationResult.success) {
            const firstError = Object.values(validationResult.error)[0];
            setModalState({
                isOpen: true,
                title: "입력 확인",
                description:
                    typeof firstError === "string"
                        ? firstError
                        : "필수 항목을 모두 입력해주세요.",
                type: "error",
            });
            return;
        }

        createProduct();
    };

    const formIsValid =
        images.length >= 1 &&
        secondaryCategoryId !== null &&
        title.trim() !== "" &&
        priceTable.some((item) => item.quantity > 0 && item.price > 0) &&
        (tradeType.direct || tradeType.delivery);

    return (
        <div className="w-full flex-1 bg-gachigageWhite flex justify-center">
            <AlertModal
                isOpen={modalState.isOpen}
                onClose={handleCloseModal}
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
                        <button
                            onClick={handleSubmit}
                            disabled={!formIsValid || isPending}
                            className={`w-full h-[56px] font-semibold leading-[120%] text-[24px] rounded-[8px] flex items-center justify-center ${
                                formIsValid && !isPending
                                    ? "cursor-pointer text-gachigageWhite bg-gachigageMint border-[0.5px] border-gachigageBrightMint1"
                                    : "cursor-not-allowed bg-gachigageGray3 border-[0.5px] border-gachigageGray5 text-gachigageGray5"
                            }`}
                        >
                            {isPending ? "등록 중..." : "작성완료"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
