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
    onClose: () => void;
    type: "error" | "confirm" | "warning" | "question" | "info";
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
    onClose,
    type,
}: AlertModalProps) {
    return (
        <div
            className="flex flex-col items-center gap-[24px] p-[24px] rounded-[16px] border border-gachigageGray1
        w-[246px] md:w-[378px] shadow-[0_0_9px_0_rgba(0,0,0,0.2)] z-99
    "
        >
            <p className="text-gachigageDark font-semibold leading-[120%]">
                {title}
            </p>
            <Image
                src={alertIconMap[type]}
                alt={`${type} 아이콘`}
                width={36}
                height={36}
                className={`${type === "error" ? "shadow-[0_0_4px_0_#D52E14] rounded-full" : ""}`}
            />
            <p className="break-words">{description}</p>
            <div className="w-full flex gap-[8px]">
                <button className="w-full h-[40px] rounded-[8px] flex items-center justify-center font-normal text-gachigageGray7  border-[0.5px] border-gachigageGray3 bg-gachigageWhite cursor-pointer">
                    취소
                </button>
                <button className="w-full h-[40px] rounded-[8px] flex items-center justify-center font-normal text-gachigageWhite  border-[0.5px] border-gachigageBrightMint1 bg-gachigageMint cursor-pointer">
                    확인
                </button>
            </div>
        </div>
    );
}
