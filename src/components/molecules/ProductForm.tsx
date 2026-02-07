"use client";

import ProductCategorySelect from "../atoms/ProductCategorySelect";
import ProductTitleInput from "../atoms/ProductTitleInput";
import ProductDetailInput from "../atoms/ProductDetailInput";
import ProductSaleOptions from "../atoms/ProductSaleOptions";
import ProductTradeType from "../atoms/ProductTradeType";
import ProductPlaceSelect from "../atoms/ProductPlaceSelect";

export default function ProductForm() {
    return (
        <div className="flex flex-1 flex-col gap-[24px]">
            <ProductCategorySelect />
            <ProductTitleInput />
            <ProductDetailInput />
            <ProductSaleOptions />
            <ProductTradeType />
            <ProductPlaceSelect />
        </div>
    );
}
