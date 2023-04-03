import React, { useEffect, useState } from "react";
import { Category } from "../../interfaces/category";

import axios from "../../services/axios.interceptor";
import { EndpointBuilder } from "../../utils/endpoint_builder";
import { useSelector } from "react-redux";
import { LanguageType } from "../../store/language";
import { useNavigate } from "react-router-dom";

const Search = ({ className }: { className?: string }) => {
    const [search, setSearch] = useState("");

    const { language } = useSelector(
        (state: { commonReducers: { language: LanguageType } }) =>
            state.commonReducers.language
    );

    const navigate = useNavigate();

    const handleSearch = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        const trimmedSearch = search.trim();
        if (trimmedSearch !== "") navigate(`search/${trimmedSearch}`);
        else alert("Please enter a value");
    };

    return (
        <div className={className}>
           <form className="flex items-center flex-1 w-full">
            <input
                type="text"
                placeholder={language === "US" ? "Search" : "Поиск"}
                className="h-10 border-2 border-r w-full  px-3 rounded-l-lg border-primary outline-none"
                value={search}
                onChange={({ target: { value } }) => setSearch(value)}
            />
            <button
                className="bg-primary h-10 px-5 rounded-r-lg border-2 border-primary text-white"
                onClick={(e) => handleSearch(e)}
            >
                {language === "US" ? "Search" : "Поиск"}
            </button>
        </form> 
        </div>
        
    );
};

export default Search;
