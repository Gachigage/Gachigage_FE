"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useAuthErrorStore } from "@/stores/useAuthErrorStore";
import AlertModal from "@/components/atoms/AlertModal";

export default function AuthErrorModal() {
    const router = useRouter();
    const { isOpen, hideAuthError } = useAuthErrorStore();

    const handleConfirm = async () => {
        hideAuthError();
        await signOut({ redirect: false });
        router.push("/login");
    };

    return (
        <AlertModal
            title="세션이 만료되었어요."
            description="다시 로그인해주세요."
            isOpen={isOpen}
            onCancel={handleConfirm}
            onClose={handleConfirm}
            type="warning"
            cancelText="확인"
            confirmText="로그인"
        />
    );
}
