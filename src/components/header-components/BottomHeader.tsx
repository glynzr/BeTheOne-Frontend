import React, { useState } from "react";
import { AiOutlineMenu, BsChevronDown } from "../../icons";
import CurrencySelect from "@paylike/react-currency-select";
import ReactFlagsSelect from "react-flags-select";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage, LanguageType } from "../../store/language";
import { useNavigate } from "react-router-dom";

const BottomHeader = () => {
    const { language } = useSelector(
        (state: { commonReducers: { language: LanguageType } }) =>
            state.commonReducers.language
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeUiLanguage = (country: string) =>
        dispatch(changeLanguage(country));

    return (
        <div className="px-6 font-medium h-14 flex justify-between items-center">
            <div className="flex items-center gap-x-3">
                <div className="flex items-center gap-x-4 cursor-pointer" onClick={() => navigate("search")}>
                    {language === "US" ? "All Items" : "Все продукты"}
                </div>
                <div className="flex items-center gap-x-2 cursor-pointer" onClick={() => navigate("about_products")}>
                    {language === "US" ? "About Page" : "О сайте"}
                </div>
            </div>
            <div className="flex items-center gap-x-5">
                <ReactFlagsSelect
                    selected={language}
                    countries={["US", "RU"]}
                    onSelect={(country) => changeUiLanguage(country)}
                    showSelectedLabel={false}
                    showOptionLabel={false}
                    className="mt-2 outline-none"
                />
            </div>
        </div>
    );
};

export default BottomHeader;
