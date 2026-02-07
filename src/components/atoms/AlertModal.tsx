"use client";
import errorIcon from "@/assets/icons/alertError.svg";
import confirmIcon from "@/assets/icons/alertCheck.svg";
import warningIcon from "@/assets/icons/alertWarning.svg";
import questionIcon from "@/assets/icons/alertQuestion.svg";
import infoIcon from "@/assets/icons/alertInfo.svg";

import Image from "next/image";

type AlertModalProps = {
    title: string;
    description: string;
    isOpen: boolean;
    onCancel: () => void;
    onClose: () => void;
    type?: "error" | "confirm" | "warning" | "question" | "info";
    cancelText?: string;
    confirmText?: string;
};

const alertIconMap = {
    error: errorIcon,
    confirm: confirmIcon,
    warning: warningIcon,
    question: questionIcon,
    info: infoIcon,
};

export default function AlertModal({
    title,
    description,
    isOpen,
    onCancel,
    onClose,
    type,
    cancelText = "취소",
    confirmText = "확인",
}: AlertModalProps) {
    // [수정됨] isOpen이 false면 렌더링하지 않음
    if (!isOpen) return null;

    return (
        // [수정됨] 화면 중앙 정렬을 위한 오버레이(배경) 추가
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
            <div
                className="flex flex-col items-center gap-[24px] p-[24px] rounded-[16px] border border-gachigageGray1
        w-[246px] md:w-[378px] shadow-[0_0_9px_0_rgba(0,0,0,0.2)] bg-gachigageWhite" // [수정됨] bg-white 명시
                onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
            >
                <p className="text-gachigageDark font-semibold leading-[120%]">
                    {title}
                </p>
                {type && (
                    <Image
                        src={alertIconMap[type]}
                        alt={`${type} 아이콘`}
                        width={36}
                        height={36}
                        className={`${
                            type === "error"
                                ? "shadow-[0_0_4px_0_#D52E14] rounded-full"
                                : ""
                        }`}
                    />
                )}
                <p className="break-words text-center whitespace-pre-line">{description}</p>{" "}
                {/* [수정됨] 텍스트 중앙 정렬 */}
                <div className="w-full flex gap-[8px]">
                    <button
                        onClick={onCancel}
                        className="w-full h-[40px] rounded-[8px] flex items-center justify-center font-normal text-gachigageGray7  border-[0.5px] border-gachigageGray3 bg-gachigageWhite cursor-pointer"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full h-[40px] rounded-[8px] flex items-center justify-center font-normal text-gachigageWhite  border-[0.5px] border-gachigageBrightMint1 bg-gachigageMint cursor-pointer"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
