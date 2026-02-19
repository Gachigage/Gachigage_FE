import { ApiResponse, ListingHistoryData, MyPageResponse, PurchaseHistoryData, PurchaseHistoryResponse } from "@/types/Mypage";
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
 * 구매내역
 * @param page 
 * @param size 
 * @param accessToken 
 * @returns 
 */
export const fetchTradePurchase = async (
  page: number,
  size: number,
  accessToken?: string
): Promise<PurchaseHistoryData> => {
  const response = await axiosServer.get<ApiResponse<PurchaseHistoryData>>(
    `/users/me/purchases`,
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
 * 판매/찜 상품내역
 * @param type 
 * @param page 
 * @param size 
 * @param accessToken 
 * @returns 
 */
export const fetchListingHistory = async (
  type: "sales" | "wishlist",
  page: number,
  size: number,
  accessToken?: string
): Promise<ListingHistoryData> => {
  const response = await axiosServer.get<ApiResponse<ListingHistoryData>>(
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