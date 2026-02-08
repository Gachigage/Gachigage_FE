"use client";
import React, { useMemo, useRef, useState } from "react";

import Image from "next/image";
import { useSession } from "next-auth/react";

import DefaultButton from "@/components/atoms/DefaultButton";
import DefaultProfileImage from "@/assets/images/defaultProfileImage.png";
import PageName from "@/components/atoms/PageName";
import NicknameChangeModal from "@/components/atoms/NicknameChangeModal";

import { useMyPageInfo } from "@/hooks/useMypageInfo";
import { useProfileImageMutation } from "@/hooks/useProfileImageMutation";
import { LogoutButton } from "@/components/atoms/LogoutButton";


export default function ProfileCard() {
    const { mutate: changeProfileImage } = useProfileImageMutation();
    const { data: session } = useSession();

    const [changeNickName, setChangeNickName] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const { data: userInfo } = useMyPageInfo({
        accessToken: session?.accessToken,
        enabled: !!session?.accessToken,
    });      

    const profileImageSrc = useMemo(() => {
        return userInfo?.profileImage && userInfo.profileImage.trim() !== ""
        ? userInfo.profileImage
        : DefaultProfileImage;
    },[userInfo?.profileImage])

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        changeProfileImage({
            file,
            accessToken: session?.accessToken,
        });

        e.target.value = "";
    };

    if (!userInfo) return null;

    return (
        <div className="w-full">
            <PageName name={"내 정보"} />
            <div className="flex flex-col
                w-full
                md:flex-row
                justify-center 
                md:justify-normal
                items-center
                gap-6 md:gap-10
                mx-auto
                px-[24px]
                max-w-[1152px]
                h-[462px]
                md:h-[268px]
                rounded-[8px]
                bg-[#F0F0F0]
                border border-[#E7E6E6]
            ">
                <div className="w-[172px] h-[172px]">
                   <Image
                     src={profileImageSrc}
                     alt={'profileImage'}
                     width={172}
                     height={172}
                     className="w-[172px] h-[172px] rounded-[50%]"
                   />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="text-dSubTitle">{userInfo?.nickname}</div>
                        <span className="md:hidden"><LogoutButton /></span>
                    </div>
                    <div className="--text-dBody text-[var(--color-gachigageGray7)] flex flex-col gap-1">
                        <div className="flex flex-row">
                            <span className="pr-[5px]">이메일:</span>
                            <span>{userInfo?.email}</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                        <DefaultButton className="w-[148px] md:w-[245px] lg:w-[245px] h-[40px] text-gachigageSubMint bg-white" name="프로필 사진 변경" onClick={() => fileInputRef.current?.click()}/>
                        <DefaultButton className="w-[148px] md:w-[245px] lg:w-[245px] h-[40px] text-gachigageSubMint bg-white" name="닉네임 변경" onClick={() => setChangeNickName(true)}/>
                    </div>
                </div>
                 <NicknameChangeModal
                    isOpen={changeNickName}
                    onClose={() => setChangeNickName(false)}
                />
            </div>
        </div>
    )
}