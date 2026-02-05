import { MyPageResponse, PurchaseHistoryResponse } from "@/types/Mypage";
import { axiosServer } from "./axiosInstance";

/**
 * 내정보조회
 * @returns 
 */
export const fetchMyPage = async (
  accessToken?: string
): Promise<MyPageResponse["data"]> => {
  const response = await axiosServer.get<MyPageResponse>(
    "/users/me",
    accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : {}
  );

  return response.data.data;
};

/**
 * 구매/판매/찜 상품내역
 * @param type 
 * @param page 
 * @param size 
 * @param accessToken 
 * @returns 
 */
export const fetchTradeHistory = async (
  type: "purchases" | "sales" | "likes",
  page: number,
  size: number,
  accessToken?: string
): Promise<PurchaseHistoryResponse["data"]> => {
  const response = await axiosServer.get<PurchaseHistoryResponse>(
    `/users/me/${type}`,
    {
      params: { page, size },
      ...(accessToken && {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }
  );

  return response.data.data;
};

/**
 * 닉네임 수정
 * @param nickname 
 * @param accessToken 
 */
export const updateMyNickname = async (
  nickname: string,
  accessToken?: string
): Promise<void> => {
  await axiosServer.put(
    "/users/me/nickname",
    { nickname },
    {
      ...(accessToken && {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }
  );
};

/**
 * 프로필이미지 수정
 * @param file 
 * @param accessToken 
 */
export const updateMyProfileImage = async (
  file: File,
  accessToken?: string
): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);

  await axiosServer.put(
    "/users/me/profile-image",
    formData,
    {
      headers: {
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
        "Content-Type": "multipart/form-data",
      },
    }
  );
};