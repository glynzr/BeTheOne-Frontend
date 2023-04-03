import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Category } from "../../interfaces/category";
import { EndpointBuilder } from "../../utils/endpoint_builder";

import axios from "../../services/axios.interceptor";
import { auth } from "../../services/fire_app";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LanguageType } from "../../store/language";
import { translateCategory } from "../../utils/category_translate";

const Tab = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);

    const user = auth.currentUser;

    const navigate = useNavigate();

    const url = new EndpointBuilder()
        .addPersistentParam("product")
        .addPersistentParam("categories")
        .build();

    const { language } = useSelector(
        (state: { commonReducers: { language: LanguageType } }) =>
            state.commonReducers.language
    );

    useEffect(() => {
        const fetchCategories = () => {
            axios
                .get<Category[]>(url)
                .then(({ data }) => {
                    setCategories(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        fetchCategories();
    }, []);

    return categories.length > 0 ? (
        <div className="bg-white mb-[30px] flex py-5 pl-[14px] pr-5 items-center gap-x-[11px] mx-auto border mt-5 w-[90%] justify-between rounded">
            <div className="flex flex-col w-max h-[500px] justify-evenly overflow-y-auto overflow-x-hidden">
                {categories.map((category, key) => (
                    <button
                        onClick={() => setActiveTab(key)}
                        onDoubleClick={() =>
                            navigate(
                                "/search/" + categories[activeTab].category
                            )
                        }
                        key={key}
                        className={classNames({
                            "px-[10px] py-2 font-medium w-[350px] flex items-center justify-start rounded hover:bg-[#E5F1FF] hover:text-[#1C1C1C] ":
                                true,
                            "text-gray-600 font-normal": key !== activeTab,
                            "bg-[#E5F1FF]": key === activeTab,
                        })}
                    >
                        {language === "US"
                            ? category.category
                            : translateCategory(category.category)}
                    </button>
                ))}
            </div>
            <div className="sm:block hidden h-full relative">
                <img
                    src={"/images/image1.png"}
                    alt={categories[activeTab].category}
                    className="h-full w-full rounded-md"
                />
                <div className="absolute left-[46px] top-[53px] flex flex-col jusitfy-center">
                    <p className="text-[28px] tracking-widest">
                        {language === "US"
                            ? "Latest trending"
                            : "Последние тренды"}
                    </p>
                    <h2 className="font-bold text-[32px] -mt-2 mb-4">
                        {language === "US"
                            ? categories[activeTab].category
                            : translateCategory(categories[activeTab].category)}
                    </h2>
                    <button
                        className="bg-white w-[100px] h-10 rounded-md"
                        onClick={() =>
                            navigate(
                                "/search/" + categories[activeTab].category
                            )
                        }
                    >
                        Learn more
                    </button>
                </div>
            </div>

            {user === null && (
                <div className="lg:grid hidden grid-rows-3 w-[200px] ml-[9px] gap-y-[10px]">
                    <div className="flex flex-col py-[14px] px-[10px] gap-y-[7px] bg-[#E3F0FF] rounded-md">
                        <div className="flex items-center gap-x-2">
                            <span className="w-11 h-11 rounded-md">
                                <img
                                    src="/images/profile.png"
                                    alt="profile"
                                    className="w-full h-full rounded"
                                />
                            </span>
                            <span className="flex flex-col leading-5">
                                <p>Hi, user</p>
                                <p>let's get start</p>
                            </span>
                        </div>
                        <button
                            className="bg-primary text-white hover:bg-opacity-60 rounded-md w-full mt-[6px] h-[30px]"
                            onClick={() => navigate("/auth/register")}
                        >
                            Join now
                        </button>
                        <button
                            className="bg-white hover:bg-opacity-60 text-primary rounded-md w-full mt-[6px] h-[30px]"
                            onClick={() => navigate("/auth/login")}
                        >
                            Log in
                        </button>
                    </div>

                    <div className="flex flex-col leading-5 bg-[#F38332] p-4 rounded-md">
                        <p className="text-white">Get US $10 off</p>
                        <p className="text-white">with a new</p>
                        <p className="text-white">supplier</p>
                    </div>

                    <div className="flex flex-col leading-5 bg-[#55BDC3] p-4 rounded-md">
                        <p className="text-white">Send quotes with</p>
                        <p className="text-white">supplier</p>
                        <p className="text-white">preferences</p>
                    </div>
                </div>
            )}
        </div>
    ) : (
        <div></div>
    );
};

export default Tab;
