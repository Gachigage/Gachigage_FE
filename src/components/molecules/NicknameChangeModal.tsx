import { createPortal } from "react-dom";
import DefaultButton from "../atoms/DefaultButton";

interface NicknameChangeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NicknameChangeModal({
    isOpen,
    onClose,
}: NicknameChangeModalProps) {
    if (!isOpen) return null;

    return createPortal(
        <>
            <div
                className="fixed inset-0 bg-black/40 z-40"
            />
            <div className="
                fixed
                top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                w-[378px] h-[232px]
                bg-white rounded-lg
                z-50
                flex flex-col
                justify-center
                px-6
                gap-4
            ">
                <div className="flex flex-col gap-1">
                    <span className="flex justify-center text-[16px] font-semibold">닉네임 변경</span>
                    <input
                        type="text"
                        placeholder="닉네임을 입력하세요."
                        className="
                            h-[40px]
                            border
                            rounded-md
                            px-3
                            placeholder:text-gachigageGray5
                            focus:outline-none
                        "
                    />
                    <span className="text-[13px] text-gachigageGray5">2~10자, 특수문자 공백 없이 입력해주세요.</span>
                </div>
                <div className="flex flex-row gap-1">
                    <DefaultButton className="text-gachigageGray7 border-gachigageGray7" name="취소" onClick={onClose} />
                    <DefaultButton className="text-white bg-gachigageMint" name="변경하기" onClick={onClose} />
                </div>
            </div>
        </>,
        document.body
    );
}
