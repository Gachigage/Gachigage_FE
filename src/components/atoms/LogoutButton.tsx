"use client";

import { signOut } from "next-auth/react";

// 임시 로그아웃 버튼 추후 수정
export function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="py-[6.5px] cursor-pointer text-gachigageGray7"
        >
            로그아웃
        </button>
    );
}
