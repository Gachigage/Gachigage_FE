"use client";
import errorIcon from "@/assets/icons/alertError.svg";
import confirmIcon from "@/assets/icons/alertCheck.svg";
import warningIcon from "@/assets/icons/alertWarning.svg";
import questionIcon from "@/assets/icons/alertQuestion.svg";
import infoIcon from "@/assets/icons/alertInfo.svg";
import xButton from "@/assets/icons/xButtonGray36.svg";
import Image from "next/image";

type AlertModalProps = {
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

const alertStyleMap = {
    error: {
        sideColor: "#D52E14",
        bgColor: "rgba(213, 46, 20, 0.1)", // #D52E14 + white 90%
    },
    warning: {
        sideColor: "#D52E14",
        bgColor: "rgba(213, 46, 20, 0.1)", // #D52E14 + white 90%
    },
    confirm: {
        sideColor: "#1AD8A2",
        bgColor: "rgba(26, 216, 162, 0.1)",
    },
    question: {
        sideColor: "#F4C20B",
        bgColor: "rgba(244, 194, 11, 0.1)",
    },
    info: {
        sideColor: "#F4C20B",
        bgColor: "rgba(244, 194, 11, 0.1)",
    },
} as const;

export default function AlertTextModal({
    description,
    type,
    onClose,
}: AlertModalProps) {
    const styles = alertStyleMap[type];

    return (
        <div
            className="relative flex items-center gap-3
                 w-[364px] h-[40px]
                 px-[12px] rounded-[8px]
                 shadow-[0_0_6px_rgba(0,0,0,0,2)]
                 overflow-hidden"
            style={{ backgroundColor: styles.bgColor }}
        >
            <div
                className="absolute left-0 top-0 h-full w-[4px]"
                style={{ backgroundColor: styles.sideColor }}
            />

            <Image
                src={alertIconMap[type]}
                alt={`${type} 아이콘`}
                width={24}
                height={24}
            />
            <p className="flex-1 text-gachigageDark text-center font-medium">
                {description}
            </p>

            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
            >
                <Image src={xButton} alt="x icon" width={24} height={24} />
            </button>

            <div
                className="absolute right-0 top-0 h-full w-[4px]"
                style={{ backgroundColor: styles.sideColor }}
            />
        </div>
    );
}
