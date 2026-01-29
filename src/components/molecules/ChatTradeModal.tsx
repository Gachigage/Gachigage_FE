import React, {useState} from 'react';
import { createPortal } from "react-dom";
import DefaultButton from "../atoms/DefaultButton";
import Image from 'next/image';
import removeIcon from "@/assets/icons/remove.svg";
import subtractIcon from "@/assets/icons/subtract.svg";
import addIcon from "@/assets/icons/add.svg";

interface ChatTradeModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function ChatTradeModal({isOpen, onClose}:ChatTradeModalProps) {
    const tradeList = [
        {count: 10, price: 100000, isChecked: false, selectCnt: 0},
        {count: 100, price: 10000000, isChecked: false, selectCnt: 0 },
        {count: 500, price: 50000000, isChecked: true, selectCnt: 0 },
    ]
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
            ">
                <div className="flex flex-col w-[318px] gap-3">
                    <div className="w-full flex flex-row justify-between">
                        <span className="text-[16px] font-bold">거래 수량</span>
                        <div className="flex flex-row gap-1 text-[13px] text-gachigageDarkMint1">
                            <span>재고 수량</span>
                            <span>1,500</span>
                            <span>개</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {tradeList.map((item, index) => {
                            return (
                                <div key={index} className="flex flex-row justify-between items-center w-[318px] h-[40px] p-[10px] border border-gachigageGray3 text-gachigageGray7 text-[16px] rounded-[8px]">
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={item.isChecked}
                                            // onChange={() => handleSelect(item.count)}
                                            className="w-[16px] h-[16px] mr-3"
                                        />
                                        <span>{item.count}개</span>
                                    </div>
                                    <span>{item.price.toLocaleString()}원</span>
                                </div>
                            )
                        })}
                    </div>
                    <p className="w-full border border-gachigageGray1"/>
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
                                            <div className="flex flex-row items-center w-[164px] h-[40px] rounded-[8px]">
                                                <div className="w-[40px] h-[40px] rounded-l-[8px] flex items-center justify-center border border-gachigageGray3 bg-gachigageGray0 flex-shrink-0">
                                                        <Image 
                                                            src={removeIcon}
                                                            alt="remove"
                                                        />
                                                </div>
                                                <div className="flex-1 flex w-full h-full justify-center items-center gap-1 text-gachigageGray7 border-y border-gachigageGray3">
                                                    <span>{item.selectCnt}</span>
                                                    <span>개</span>
                                                </div>
                                                <div className="w-[40px] h-[40px] rounded-r-[8px] flex items-center justify-center border border-gachigageGray3 bg-gachigageGray0 flex-shrink-0">
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
                    </div>
                    <div className="flex flex-row gap-2 text-[16px]">
                        <DefaultButton name="취소" className="w-[155px] h-[40px] border-gachigageGray3 text-gachigageGray7" onClick={onClose}/>
                        <DefaultButton name="거래 요청" className="w-[155px] h-[40px] border-gachigageGray5 bg-gachigageGray3 text-gachigageGray5"/>
                    </div>
                </div>
            </div>
        </>,
        document.body
    )
}