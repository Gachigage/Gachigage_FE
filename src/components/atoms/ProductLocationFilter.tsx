"use client";

import Image from "next/image";
import pin from "@/assets/icons/pin.svg";
import reset from "@/assets/icons/reset.svg";
import { useRef, useState } from "react";
import { useProductSearchFilterStore } from "@/store/useProductSearchFilterStore";

const locations = [
    { province: "전국", city: ["전체"] },
    {
        province: "서울특별시",
        city: [
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
        province: "부산광역시",
        city: [
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
        province: "인천광역시",
        city: [
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
        province: "대구광역시",
        city: [
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
        province: "광주광역시",
        city: ["전체", "동구", "서구", "남구", "북구", "광산구"],
    },
    {
        province: "대전광역시",
        city: ["전체", "동구", "중구", "서구", "유성구", "대덕구"],
    },
    {
        province: "울산광역시",
        city: ["전체", "중구", "남구", "동구", "북구", "울주군"],
    },
    { province: "세종특별자치시", city: ["전체"] },
    {
        province: "경기도",
        city: [
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
        province: "강원특별자치도",
        city: [
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
        province: "충청북도",
        city: [
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
        province: "충청남도",
        city: [
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
        province: "경상북도",
        city: [
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
        province: "경상남도",
        city: [
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
        province: "전북특별자치도",
        city: [
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
        province: "전라남도",
        city: [
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
    { province: "제주특별자치도", city: ["전체", "제주시", "서귀포시"] },
];

interface ProductLocationValue {
    province: string;
    city: string;
}

const EMPTY_PRODUCT_LOCATION: ProductLocationValue = {
    province: "",
    city: "",
};

const ALL_PRODUCT_LOCATION: ProductLocationValue = {
    province: "전국",
    city: "전체",
};

export default function ProductLocationFilter() {
    const productLocation = useProductSearchFilterStore(
        (state) => state.productLocation,
    );
    const setProductLocation = useProductSearchFilterStore(
        (state) => state.setProductLocation,
    );

    const [isOpen, setIsOpen] = useState(false);
    const [draftProductLocation, setDraftProductLocation] =
        useState<ProductLocationValue>(productLocation);
    const [selectedProvinceIndex, setSelectedProvinceIndex] =
        useState<number>(0);
    const [hoveredProvinceIndex, setHoveredProvinceIndex] = useState<
        number | null
    >(null);
    const [hoveredCityIndex, setHoveredCityIndex] = useState<number | null>(
        null,
    );
    const containerRef = useRef<HTMLDivElement>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const findProvinceIndex = (targetLocation: ProductLocationValue) => {
        if (
            targetLocation.province.trim() === "" ||
            targetLocation.province === "전국"
        ) {
            return 0;
        }

        const matchedIndex = locations.findIndex(
            (loc) => loc.province === targetLocation.province,
        );

        return matchedIndex === -1 ? 0 : matchedIndex;
    };

    const syncDraftFromStore = () => {
        const appliedLocation = productLocation;
        setDraftProductLocation(appliedLocation);
        setSelectedProvinceIndex(findProvinceIndex(appliedLocation));
        setHoveredProvinceIndex(null);
        setHoveredCityIndex(null);
    };

    const handleMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        if (!isOpen) {
            syncDraftFromStore();
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
            setHoveredProvinceIndex(null);
            setHoveredCityIndex(null);
        }, 100);
    };

    const handleProvinceClick = (index: number) => {
        const selectedProvince = locations[index];
        if (!selectedProvince) return;

        setSelectedProvinceIndex(index);
        setHoveredCityIndex(null);

        if (index === 0) {
            setDraftProductLocation(ALL_PRODUCT_LOCATION);
            return;
        }

        setDraftProductLocation({
            province: selectedProvince.province,
            city: "전체",
        });
    };

    const handleCityClick = (province: string, city: string) => {
        setDraftProductLocation({ province, city });
    };

    const handleReset = () => {
        setDraftProductLocation(EMPTY_PRODUCT_LOCATION);
        setProductLocation(EMPTY_PRODUCT_LOCATION);
        setSelectedProvinceIndex(0);
        setHoveredProvinceIndex(null);
        setHoveredCityIndex(null);
    };

    const handleApply = () => {
        setProductLocation(draftProductLocation);
        setIsOpen(false);
        setHoveredProvinceIndex(null);
        setHoveredCityIndex(null);
    };

    const getDisplayText = () => {
        if (
            productLocation.province === "전국" &&
            productLocation.city.trim() !== ""
        )
            return "전국";
        if (productLocation.province === "" || productLocation.city === "")
            return "지역";

        return `${productLocation.province} - ${productLocation.city}`;
    };

    const currentCities = locations[selectedProvinceIndex]?.city || [];

    return (
        <div
            ref={containerRef}
            className="relative w-full min-w-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* 필터 버튼 */}
            <div
                className={`w-full h-[56px] rounded-[12px] border border-gachigageGray1 font-normal text-gachigageGray5 text-[16px] flex items-center pl-[10px] gap-[10px] cursor-pointer transition-colors hover:bg-gachigageGray0 ${
                    isOpen ||
                    (productLocation.province.trim() !== "" &&
                        productLocation.city.trim() !== "")
                        ? "bg-gachigageGray0"
                        : ""
                }`}
            >
                <Image src={pin} alt="pin 아이콘" width={24} height={24} />
                <span
                    className={`truncate pr-[10px] ${
                        productLocation.province.trim() !== "" &&
                        productLocation.city.trim() !== ""
                            ? "text-gachigageGray7 font-medium"
                            : ""
                    }`}
                >
                    {getDisplayText()}
                </span>
            </div>

            {/* 드롭다운 컨테이너 */}
            {isOpen && (
                <div className="absolute w-[350px] top-[66px] right-0 z-2 bg-white border border-gachigageDark1 rounded-[12px] p-[10px]">
                    <p className="font-semibold text-gachigageDark px-[4px]">
                        지역 필터
                    </p>
                    <div className="w-full h-[1px] bg-gachigageGray1 mt-[12px] mb-[8px]" />

                    <div className="-mx-[10px] flex">
                        {/* (시/도) */}
                        <div className="w-[175px] px-[8px] py-[8px] max-h-[449px] scrollbar-hidden flex flex-col gap-[8px] border-r border-gachigageGray1 overflow-y-auto overflow-x-hidden">
                            {locations.map((loc, index) => {
                                const isSelected =
                                    selectedProvinceIndex === index;
                                const isHovered =
                                    hoveredProvinceIndex === index;

                                return (
                                    <div
                                        key={loc.province}
                                        className={`flex shrink-0 w-[159px] px-[10px] h-[41px] items-center rounded-[4px] cursor-pointer text-[13px] transition-colors ${
                                            isSelected || isHovered
                                                ? "bg-gachigageGray1 text-gachigageDark font-medium"
                                                : "text-gachigageGray7 font-normal"
                                        }`}
                                        onMouseEnter={() =>
                                            setHoveredProvinceIndex(index)
                                        }
                                        onMouseLeave={() =>
                                            setHoveredProvinceIndex(null)
                                        }
                                        onClick={() =>
                                            handleProvinceClick(index)
                                        }
                                    >
                                        {loc.province}
                                    </div>
                                );
                            })}
                        </div>

                        {/* (구/군) */}
                        <div
                            className="w-[175px] px-[8px] py-[8px] max-h-[449px] scrollbar-hidden flex flex-col overflow-y-auto overflow-x-hidden"
                            onMouseLeave={() => setHoveredCityIndex(null)}
                        >
                            {selectedProvinceIndex === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-gachigageGray7 text-[13px] text-center">
                                    <p>지역을 선택하시면</p>
                                    <p>세부 항목을 볼 수 있어요.</p>
                                </div>
                            ) : (
                                currentCities.map(
                                    (city: string, index: number) => {
                                        const isHovered =
                                            hoveredCityIndex === index;
                                        const isSelected =
                                            draftProductLocation.province ===
                                                locations[selectedProvinceIndex]
                                                    .province &&
                                            draftProductLocation.city === city;

                                        return (
                                            <div
                                                key={city}
                                                className={`flex shrink-0 w-[159px] px-[10px] h-[41px] items-center rounded-[4px] cursor-pointer text-[13px] transition-colors ${
                                                    isSelected || isHovered
                                                        ? "bg-gachigageGray1 text-gachigageDark font-medium"
                                                        : "text-gachigageGray7 font-normal"
                                                }`}
                                                onMouseEnter={() =>
                                                    setHoveredCityIndex(index)
                                                }
                                                onClick={() =>
                                                    handleCityClick(
                                                        locations[
                                                            selectedProvinceIndex
                                                        ].province,
                                                        city,
                                                    )
                                                }
                                            >
                                                {city}
                                            </div>
                                        );
                                    },
                                )
                            )}
                        </div>
                    </div>

                    <div className="-mx-[10px] h-[1px] bg-gachigageGray1 mt-[8px] mb-[10px]" />

                    <div className="w-full flex items-center gap-[6px]">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex-1 h-[40px] rounded-[8px] border-[0.5px] border-gachigageGray3 bg-gachigageWhite hover:bg-gachigageGray1 text-gachigageGray7 font-normal flex items-center justify-center gap-[6px] cursor-pointer"
                        >
                            <Image
                                src={reset}
                                alt="초기화 아이콘"
                                width={12}
                                height={12}
                            />
                            <span>초기화</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleApply}
                            className="flex-1 h-[40px] rounded-[8px] border-[0.5px] border-gachigageBrightMint1 bg-gachigageMint hover:opacity-90 text-gachigageWhite font-medium cursor-pointer"
                        >
                            적용하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
