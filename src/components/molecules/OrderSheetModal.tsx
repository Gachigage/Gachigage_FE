import React, {useEffect, useMemo, useState} from 'react';
import { createPortal } from "react-dom";
import DefaultButton from "../atoms/DefaultButton";

interface OrderSheetModalProps {
    onClose: () => void;
}

interface OrderListProps {
    count: number;
    price: number;
    selectCnt: number;
}

export default function OrderSheetModal({onClose}: OrderSheetModalProps) {
    const [orderList, setOrderList] = useState<OrderListProps[]>([
        {count: 10, price: 100000, selectCnt: 1},
        {count: 100, price: 1000000, selectCnt: 1 },
        {count: 500, price: 5000000, selectCnt: 1 },
    ]);
    
    const orderTotalAmount = useMemo(() => {
        return orderList.reduce(
            (acc, order) => acc + order.selectCnt * order.price,
            0
        );
    },[orderList])
        
    return createPortal(
        <>
            <div
                className="fixed inset-0 bg-black/40 z-40"
            />
            <div className="
                fixed
                top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                w-[366px] 
                bg-white rounded-lg
                z-50
                flex flex-col
                items-center
                p-[30px]
                cursor-pointer
            ">
                <div className="flex flex-col w-[366px] gap-3">
                    <div className="w-full flex flex-row justify-between">
                        <span className="text-[16px] font-bold">주문서</span>
                        <DefaultButton name="수정 요청" className="w-[73px] h-[33px] text-[8px] text-gachigageGray3"/>
                    </div>
                    <p className="w-full border border-gachigageGray1"/>
                    <div className='flex flex-col gap-2'>
                        {orderList.map((item, index) => {
                            return (
                                <div className='flex flex-row justify-between items-center text-[16px]'>
                                    <div className='flex flex-row items-center gap-2 '>
                                        <div className="flex items-center w-[69px] h-[40px] p-[5px] text-gachigageGray7 border border-gachigageGray3 rounded-[8px]">
                                            <span>{item.count}</span>
                                            <span>개</span>
                                            </div>
                                            <p>X</p>
                                            <span>{item.selectCnt}</span>
                                    </div>
                                    <div className='flex flex-row'>
                                        <span>{item.price}</span>
                                        <span>원</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <p className="w-full border border-gachigageGray1"/>
                    <div className='flex flex-row justify-end gap-1 text-[24px]'>
                        <span>{orderTotalAmount}</span>
                        <span>원</span>
                    </div>
                    <div className='w-full flex flex-row text-[16px] gap-2'>
                        <DefaultButton name="취소" className='w-[155px] h-[40px] text-gachigageGray7 border border-gachigageGray3 rounded-[8px]' onClick={onClose}/>
                        <DefaultButton name="거래승인" className='w-[155px] h-[40px] text-gachigageWhite bg-gachigageMint border border-gachigageBrightMint1 rounded-[8px]'/>
                    </div>
                </div>

            </div>
        </>
        ,document.body
    )
}