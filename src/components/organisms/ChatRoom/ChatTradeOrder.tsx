import OrderSheetModal from "@/components/atoms/OrderSheetModal";
import { ChatMessage } from "@/types/Chat";
import { useState } from "react";

export default function ChatTradeOrder({ chat }: { chat: ChatMessage }) {
    const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);
    const data = JSON.parse(chat.content);

    const selectedList = data.tradeList.filter(
        (item: any) => item.isChecked && item.selectCnt > 0
    );

    const handleConfirm = () => {
        setIsOpenOrderModal(true);
    }

    return (
        <div className="flex flex-col gap-3 w-[254px] bg-gachigageWhite rounded-[8px] p-[12px] text-[13px]">
            <div className="flex gap-1">
                <span>상품명:</span>
                <span>{data.productTitle}</span>
            </div>
            <div className="flex flex-col gap-1">
                {selectedList.map((item: any) => (
                <div key={item.id} className="flex gap-1">
                    <span>{item.quantity}개</span>
                    <span>X</span>
                    <span>{item.selectCnt}</span>
                </div>
                ))}
            </div>
            <div className="flex justify-between">
                <span>주문한 내용이 맞으시다면 확인을 눌러주세요.</span>
            </div>
            <button
                onClick={handleConfirm}
                className="w-full h-[36px] bg-gachigageMint text-white rounded-[6px]
                        hover:opacity-90 active:scale-[0.98] cursor-pointer"
            >
                주문서 확인
            </button>
            {isOpenOrderModal &&
                <OrderSheetModal
                    orderList={selectedList}
                    isOpen={isOpenOrderModal}
                    onClose={() => setIsOpenOrderModal(false)}
                />
            }
        </div>
    );
}
