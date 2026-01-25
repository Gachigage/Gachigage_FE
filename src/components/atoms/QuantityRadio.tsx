import { formatNumber } from "@/lib/utils";

type QuantityRadioOption = {
    quantity: number;
    price: number;
};

export default function QuantityRadio({
    options,
}: {
    options: QuantityRadioOption[];
}) {
    return (
        <div className="flex flex-col gap-[8px]">
            {options.map((option, index) => (
                <div
                    key={index}
                    className="flex items-center font-medium justify-between px-[12px] py-[7px] border-[1px] rounded-[8px] border-gachigageGray1 bg-white text-gachigageGray7"
                >
                    <span>{option.quantity}개</span>
                    <span>{formatNumber(option.price)}원</span>
                </div>
            ))}
        </div>
    );
}
