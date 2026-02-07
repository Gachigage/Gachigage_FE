import React, {useEffect, useMemo, useState} from 'react';
import { createPortal } from "react-dom";
import DefaultButton from "../atoms/DefaultButton";
import Image from 'next/image';
import removeIcon from "@/assets/icons/remove.svg";
import subtractIcon from "@/assets/icons/subtract.svg";
import addIcon from "@/assets/icons/add.svg";
import { useChatUIStore } from '@/store/chat/useChatUIStore';
import { useTradeList } from '@/hooks/useTradeList';
import { useConfirmTrade } from '@/hooks/useConfirmTrade';

interface ChatTradeModalProps {
    isOpen: boolean;
    chatRoomId: number;
    onClose: () => void;
}
interface TradeListProps {
    id: number; 
    quantity: number;
    price: number;
    isChecked: boolean;
    selectCnt: number;
}

export default function ChatTradeModal({isOpen, chatRoomId, onClose}:ChatTradeModalProps) {
    const [tradeTotalAmount, setTradeTotalAmount] = useState<number>(0);
    const { data: tradeData = [], isLoading, error } = useTradeList(chatRoomId);
    const [tradeList, setTradeList] = useState<TradeListProps[]>([]);
    const { mutate: confirmTradeMutate } = useConfirmTrade(chatRoomId);
    const {isOpenOrderModal, isOpenChatTradeModal, closeTradeModal, closeOrderModal} = useChatUIStore();

    useEffect(() => {
        if (!tradeData.length) return;

        setTradeList(
            tradeData.map(item => ({
            ...item,
            isChecked: false,
            selectCnt: 0,
            }))
        );
    }, [tradeData]);

    console.info(tradeData)
    // const {openOrderModal} = useChatUIStore();
    //id: 3023, quantity: 20, price: 1000000
    useEffect(() => {
        // 재고수량 * 금액 -> 구매가능한 토탈금액 계산
        setTradeTotalAmount(15000000);
    },[])

    const totalValue = useMemo(() => {
        return tradeList.reduce(
            (acc, trade) => acc + trade.selectCnt * trade.price,
            0
        );
    }, [tradeList]);

    // 수량을 하나라도 선택한 경우
    const isOneCheck = useMemo(() => {
        return tradeList.some(i => i.isChecked);
    },[tradeList])

    // 거래가능금액을 넘어간 경우
    const isOverLimit = useMemo(() => {
        return  totalValue > tradeTotalAmount;
    },[totalValue, tradeTotalAmount])

    // 거래불가한 경우
    const isDisabled = useMemo(() => {
        return totalValue <= 0 || isOverLimit;
    },[totalValue, isOverLimit])

    const selectedTrade = useMemo(
        () => tradeList.find(item => item.isChecked),
        [tradeList]
    );

    const handleConfirmTrade = () => {
        if (!selectedTrade) return;

        confirmTradeMutate(selectedTrade.id);
        closeTradeModal();
    };

    // 8일이후는 이걸로
    // const handleCheckTrade = (item: TradeListProps) => {
    //     setTradeList(prev =>
    //         prev.map(trade =>
    //             trade.price === item.price
    //                 ? { ...trade, isChecked: !item.isChecked }
    //                 : trade
    //         )
    //     );
    // };
    const handleCheckTrade = (item: TradeListProps) => {
        setTradeList(prev =>
            prev.map(trade => {
            if (trade.price === item.price) {
                const nextChecked = !trade.isChecked;

                return {
                ...trade,
                isChecked: nextChecked,
                selectCnt: nextChecked ? 1 : 0,
                };
            }
            return {
                ...trade,
                isChecked: false,
                selectCnt: 0,
            };
            })
        );
    };

    const handleSelectCount = (item: TradeListProps, type: string) => {
        setTradeList(prev =>
            prev.map(trade => {
                if (trade.price !== item.price) return trade;

                const nextCnt =
                    type === 'add'
                        ? trade.selectCnt + 1
                        : Math.max(trade.selectCnt - 1, 0);

                return { ...trade, selectCnt: nextCnt };
            })
        );
    };

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
                w-[366px] 
                bg-white rounded-lg
                z-50
                flex flex-col
                items-center
                p-[30px]
                cursor-pointer
            ">
                <div className="flex flex-col w-[318px] gap-3">
                    <div className="w-full flex flex-row justify-between">
                        <span className="text-[16px] font-bold">거래 수량</span>
                        {/* <div className="flex flex-row gap-1 text-[13px] text-gachigageDarkMint1">
                            <span>재고 수량</span>
                            <span>1,500</span>
                            <span>개</span>
                        </div> */}
                    </div>
                    <div className="flex flex-col gap-2">
                        {tradeList.map((item, index) => {
                            return (
                                <div key={index} 
                                    className={`flex flex-row justify-between items-center w-[318px] h-[40px] p-[10px] border ${item.isChecked ? 'border-gachigageMint bg-gachigageBrightMint3' : 'border-gachigageGray3'} ${item.isChecked ? 'text-[#000000]' : 'text-gachigageGray7'} text-[16px] rounded-[8px]`}
                                    onClick={() => handleCheckTrade(item)}
                                >
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={item.isChecked}
                                            onChange={() => handleCheckTrade(item)}
                                            className="w-[16px] h-[16px] mr-3"
                                        />
                                        <span>{item.quantity}개</span>
                                    </div>
                                    <span>{item.price.toLocaleString()}원</span>
                                </div>
                            )
                        })}
                    </div>
                    <p className="w-full border border-gachigageGray1"/>
                    {/* {isOneCheck &&
                        <>
                            <div className="flex flex-col gap-2">
                                {tradeList.map((item, index) => {
                                    return (
                                        <div key={index} className="flex flex-row justify-between items-center w-[318px] gap-2 text-gachigageGray7 text-[16px]">
                                            {item.isChecked &&
                                                <>
                                                    <div className="flex justify-end items-center w-[164px] h-[40px] p-[5px] border border-gachigageGray3 rounded-[8px]">
                                                        <span>{item.count}</span>
                                                        <span>개</span>
                                                    </div>
                                                    <div className={`flex flex-row items-center w-[164px] h-[40px] rounded-[8px]  ${isOverLimit ? 'outline outline-1 outline-[#D52E14]' : ''}`}>
                                                        <div 
                                                            className="w-[40px] h-[40px] rounded-l-[8px] flex items-center justify-center border border-gachigageGray3 bg-gachigageGray0 flex-shrink-0"
                                                            onClick={() => handleSelectCount(item, 'sub')}
                                                        >
                                                                <Image 
                                                                    src={item.selectCnt === 1 ? removeIcon : subtractIcon}
                                                                    alt={item.selectCnt ? 'remove' : 'subtract'}
                                                                />
                                                        </div>
                                                        <div className="flex-1 flex w-full h-full justify-center items-center gap-1 text-gachigageGray7 border-y border-gachigageGray3">
                                                            <span>{item.selectCnt}</span>
                                                            <span>개</span>
                                                        </div>
                                                        <div 
                                                            className="w-[40px] h-[40px] rounded-r-[8px] flex items-center justify-center border border-gachigageGray3 bg-gachigageGray0 flex-shrink-0"
                                                            onClick={() => handleSelectCount(item, 'add')}
                                                        >
                                                            <Image 
                                                                src={addIcon}
                                                                alt="add"
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    )
                                })}
                                {isOverLimit && <span className='flex justify-end text-[#D52E14] text-[13px]'>입력하신 수량이 재고 수량보다 많습니다.</span>}
                            </div>
                            <p className="w-full border border-gachigageGray1"/>
                            <div className='w-full h-[54px] justify-end flex flex-row gap-1 text-[24px]'>
                                <span>{totalValue}</span>
                                <span>원</span>
                            </div>
                        </>
                    } */}
                    <div className="flex flex-row gap-2 text-[16px]">
                        <DefaultButton name="취소" className="w-[155px] h-[40px] border-gachigageGray3 text-gachigageGray7" onClick={onClose}/>
                        <DefaultButton 
                            name="거래 완료" 
                            className={`w-[155px] h-[40px] 
                                ${isDisabled ? 'border-gachigageGray5' : 'border-gachigageBrightMint1'} 
                                ${isDisabled ? 'text-gachigageGray5 ' : 'text-[#ffffff]'}
                                ${isDisabled ? 'bg-gachigageGray3' : 'bg-gachigageMint'}
                                ${isDisabled ? 'disabled:cursor-not-allowed' : 'cursor-pointer'}`
                            } 
                            onClick={handleConfirmTrade}
                            disabled={isDisabled ? true : false}
                        />
                    </div>
                </div>
            </div>
        </>,
        document.body
    )
}