"use client";

import { useState } from "react";
import { useDeleteProduct } from "@/hooks/useProductMutation";
import AlertModal from "./AlertModal";

type ProductDeleteButtonProps = {
    productId: number;
};

export default function ProductDeleteButton({
    productId,
}: ProductDeleteButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate: deleteProduct } = useDeleteProduct();

    const handleConfirm = () => {
        deleteProduct({ productId });
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-[73px] h-[33px] rounded-[8px] bg-gachigageWhite border-[0.5px] border-gachigageGray3 cursor-pointer text-[13px] text-gachigageGray7 leading-[120%] font-normal flex items-center justify-center"
            >
                상품 삭제
            </button>
            <AlertModal
                type="warning"
                title="상품을 삭제하시겠습니까?"
                description={"삭제한 상품은 되돌릴 수 없어요.\n정말 상품을 삭제하실 건가요?"}
                isOpen={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onClose={handleConfirm}
            />
        </>
    );
}
