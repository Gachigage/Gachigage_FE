"use client";

import Image from "next/image";
import pin from "@/assets/icons/pin.svg";
import { useState, useRef } from "react";
import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";

const locations = [
    { city: "전국", district: ["전체"] },
    {
        city: "서울특별시",
        district: [
            "전체",
            "종로구",
            "중구",
            "용산구",
            "성동구",
            "광진구",
            "동대문구",
            "중랑구",
            "성북구",
            "강북구",
            "도봉구",
            "노원구",
            "은평구",
            "서대문구",
            "마포구",
            "양천구",
            "강서구",
            "구로구",
            "금천구",
            "영등포구",
            "동작구",
            "관악구",
            "서초구",
            "강남구",
            "송파구",
            "강동구",
        ],
    },
    {
        city: "부산광역시",
        district: [
            "전체",
            "중구",
            "서구",
            "동구",
            "영도구",
            "부산진구",
            "동래구",
            "남구",
            "북구",
            "강서구",
            "해운대구",
            "사하구",
            "금정구",
            "연제구",
            "수영구",
            "사상구",
            "기장군",
        ],
    },
    {
        city: "인천광역시",
        district: [
            "전체",
            "중구",
            "동구",
            "미추홀구",
            "연수구",
            "남동구",
            "부평구",
            "계양구",
            "서구",
            "강화군",
            "옹진군",
        ],
    },
    {
        city: "대구광역시",
        district: [
            "전체",
            "중구",
            "동구",
            "서구",
            "남구",
            "북구",
            "수성구",
            "달서구",
            "달성군",
            "군위군",
        ],
    },
    {
        city: "광주광역시",
        district: ["전체", "동구", "서구", "남구", "북구", "광산구"],
    },
    {
        city: "대전광역시",
        district: ["전체", "동구", "중구", "서구", "유성구", "대덕구"],
    },
    {
        city: "울산광역시",
        district: ["전체", "중구", "남구", "동구", "북구", "울주군"],
    },
    { city: "세종특별자치시", district: ["전체"] },
    {
        city: "경기도",
        district: [
            "전체",
            "가평군",
            "고양시",
            "과천시",
            "광명시",
            "광주시",
            "구리시",
            "군포시",
            "김포시",
            "남양주시",
            "동두천시",
            "부천시",
            "성남시",
            "수원시",
            "시흥시",
            "안산시",
            "안성시",
            "안양시",
            "양주시",
            "양평군",
            "여주시",
            "연천군",
            "오산시",
            "용인시",
            "의왕시",
            "의정부시",
            "이천시",
            "파주시",
            "평택시",
            "포천시",
            "하남시",
            "화성시",
        ],
    },
    {
        city: "강원특별자치도",
        district: [
            "전체",
            "원주시",
            "춘천시",
            "강릉시",
            "동해시",
            "속초시",
            "삼척시",
            "홍천군",
            "태백시",
            "철원군",
            "횡성군",
            "평창군",
            "영월군",
            "정선군",
            "인제군",
            "고성군",
            "양양군",
            "화천군",
            "양구군",
        ],
    },
    {
        city: "충청북도",
        district: [
            "전체",
            "청주시",
            "충주시",
            "제천시",
            "보은군",
            "옥천군",
            "영동군",
            "증평군",
            "진천군",
            "괴산군",
            "음성군",
            "단양군",
        ],
    },
    {
        city: "충청남도",
        district: [
            "전체",
            "천안시",
            "공주시",
            "보령시",
            "아산시",
            "서산시",
            "논산시",
            "계룡시",
            "당진시",
            "금산군",
            "부여군",
            "서천군",
            "청양군",
            "홍성군",
            "예산군",
            "태안군",
        ],
    },
    {
        city: "경상북도",
        district: [
            "전체",
            "포항시",
            "경주시",
            "김천시",
            "안동시",
            "구미시",
            "영주시",
            "영천시",
            "상주시",
            "문경시",
            "경산시",
            "의성군",
            "청송군",
            "영양군",
            "영덕군",
            "청도군",
            "고령군",
            "성주군",
            "칠곡군",
            "예천군",
            "봉화군",
            "울진군",
            "울릉군",
        ],
    },
    {
        city: "경상남도",
        district: [
            "전체",
            "창원시",
            "김해시",
            "진주시",
            "양산시",
            "거제시",
            "통영시",
            "사천시",
            "밀양시",
            "함안군",
            "거창군",
            "창녕군",
            "고성군",
            "하동군",
            "합천군",
            "남해군",
            "함양군",
            "산청군",
            "의령군",
        ],
    },
    {
        city: "전북특별자치도",
        district: [
            "전체",
            "전주시",
            "익산시",
            "군산시",
            "정읍시",
            "완주군",
            "김제시",
            "남원시",
            "고창군",
            "부안군",
            "임실군",
            "순창군",
            "진안군",
            "장수군",
            "무주군",
        ],
    },
    {
        city: "전라남도",
        district: [
            "전체",
            "여수시",
            "순천시",
            "목포시",
            "광양시",
            "나주시",
            "무안군",
            "해남군",
            "고흥군",
            "화순군",
            "영암군",
            "영광군",
            "완도군",
            "담양군",
            "장성군",
            "보성군",
            "신안군",
            "장흥군",
            "강진군",
            "함평군",
            "진도군",
            "곡성군",
            "구례군",
        ],
    },
    { city: "제주특별자치도", district: ["전체", "제주시", "서귀포시"] },
];

export default function ProductLocationFilter() {
    const productLocation = useProductSearchFilterStore(
        (state) => state.productLocation,
    );
    const setProductLocation = useProductSearchFilterStore(
        (state) => state.setProductLocation,
    );

    const [isOpen, setIsOpen] = useState(false);
    const [selectedCityIndex, setSelectedCityIndex] = useState<number>(0);
    const [hoveredCityIndex, setHoveredCityIndex] = useState<number | null>(
        null,
    );
    const [hoveredDistrictIndex, setHoveredDistrictIndex] = useState<
        number | null
    >(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
            setHoveredCityIndex(null);
            setHoveredDistrictIndex(null);
        }, 100);
    };

    const handleCityClick = (index: number) => {
        setSelectedCityIndex(index);
        setHoveredDistrictIndex(null);

        if (index === 0) {
            setProductLocation({ city: "전국", district: "전체" });
            setIsOpen(false);
            setHoveredCityIndex(null);
        }
    };

    const handleDistrictClick = (city: string, district: string) => {
        setProductLocation({ city, district });
        setIsOpen(false);
        setHoveredCityIndex(null);
        setHoveredDistrictIndex(null);
    };

    const getDisplayText = () => {
        if (
            productLocation.city === "전국" &&
            productLocation.district.trim() !== ""
        )
            return "전국";
        if (productLocation.city === "" || productLocation.district === "")
            return "지역";

        return `${productLocation.city} - ${productLocation.district}`;
    };

    const currentDistricts = locations[selectedCityIndex]?.district || [];

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* 필터 버튼 */}
            <div
                className={`w-full h-[56px] rounded-[12px] border border-gachigageGray1 font-normal text-gachigageGray5 text-[16px] flex items-center pl-[10px] gap-[10px] cursor-pointer transition-colors hover:bg-gachigageGray0 ${
                    isOpen ||
                    (productLocation.city.trim() !== "" &&
                        productLocation.district.trim() !== "")
                        ? "bg-gachigageGray0"
                        : ""
                }`}
            >
                <Image src={pin} alt="pin 아이콘" width={24} height={24} />
                <span
                    className={`truncate pr-[10px] ${
                        productLocation.city.trim() !== "" &&
                        productLocation.district.trim() !== ""
                            ? "text-gachigageGray7 font-medium"
                            : ""
                    }`}
                >
                    {getDisplayText()}
                </span>
            </div>

            {/* 드롭다운 컨테이너 */}
            {isOpen && (
                <div className="absolute w-[350px] top-[58px] left-0 z-50 flex bg-white border border-gachigageDark1 rounded-[12px] ">
                    {/* (시/도) */}
                    <div className="w-[175px] px-[8px] py-[8px] max-h-[449px] scrollbar-hidden flex flex-col gap-[8px] border-r border-gachigageGray1 overflow-y-auto overflow-x-hidden">
                        {locations.map((loc, index) => {
                            const isSelected = selectedCityIndex === index;
                            const isHovered = hoveredCityIndex === index;

                            return (
                                <div
                                    key={loc.city}
                                    className={`flex shrink-0 w-[159px] px-[10px] h-[41px] items-center rounded-[4px] cursor-pointer text-[13px] transition-colors ${
                                        isSelected || isHovered
                                            ? "bg-gachigageGray1 text-gachigageDark font-medium"
                                            : "text-gachigageGray7 font-normal"
                                    }`}
                                    onMouseEnter={() =>
                                        setHoveredCityIndex(index)
                                    }
                                    onMouseLeave={() =>
                                        setHoveredCityIndex(null)
                                    }
                                    onClick={() => handleCityClick(index)}
                                >
                                    {loc.city}
                                </div>
                            );
                        })}
                    </div>

                    {/* (구/군) */}
                    <div
                        className="w-[175px] px-[8px] py-[8px] max-h-[449px] scrollbar-hidden flex flex-col overflow-y-auto overflow-x-hidden"
                        onMouseLeave={() => setHoveredDistrictIndex(null)}
                    >
                        {selectedCityIndex === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-gachigageGray7 text-[13px] text-center">
                                <p>지역을 선택하시면</p>
                                <p>세부 항목을 볼 수 있어요.</p>
                            </div>
                        ) : (
                            currentDistricts.map((district, index) => {
                                const isHovered =
                                    hoveredDistrictIndex === index;

                                return (
                                    <div
                                        key={district}
                                        className={`flex shrink-0 w-[159px] px-[10px] h-[41px] items-center rounded-[4px] cursor-pointer text-[13px] transition-colors ${
                                            isHovered
                                                ? "bg-gachigageGray1 text-gachigageDark font-medium"
                                                : "text-gachigageGray7 font-normal"
                                        }`}
                                        onMouseEnter={() =>
                                            setHoveredDistrictIndex(index)
                                        }
                                        onClick={() =>
                                            handleDistrictClick(
                                                locations[selectedCityIndex]
                                                    .city,
                                                district,
                                            )
                                        }
                                    >
                                        {district}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
