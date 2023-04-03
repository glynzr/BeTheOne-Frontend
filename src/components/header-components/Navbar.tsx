import React from "react";
import { NavLink } from "react-router-dom";
import {
    FaUser,
    MdMessage,
    AiFillHeart,
    HiShoppingCart,
    MdLogout,
    MdVerifiedUser,
} from "../../icons";
import { MdLogin } from "react-icons/md";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { LanguageType } from "../../store/language";
import { AdminType } from "../../store/admin";
import { auth } from "../../services/fire_app";
const Navbar = ({ className }: { className?: string }) => {
    const { language } = useSelector(
        (state: { commonReducers: { language: LanguageType } }) =>
            state.commonReducers.language
    );
    const { userRole, loaded } = useSelector(
        (state: { commonReducers: { admin: AdminType } }) =>
            state.commonReducers.admin
    );

    const setLinkStyle = (isActive: boolean) =>
        classNames({
            "flex flex-col hover:text-black justify-center items-center gap-y-[6px] text-[#8B96A5]":
                true,
            "text-black": isActive,
        });
    return (
        <div className={className}>
            <div
                className={
                    className !== undefined
                        ? `flex items-center overflow-x-auto overflow-y-hidden invis-scroll gap-x-5 ml-12`
                        : `flex w-full justify-between items-center overflow-x-auto overflow-y-hidden invis-scroll gap-x-5`
                }
            >
                <NavLink
                    to={"/profile"}
                    className={({ isActive }) => setLinkStyle(isActive)}
                >
                    <FaUser size={20} />
                    <div className="text-xs">
                        {language === "US" ? "Profile" : "Профиль"}
                    </div>
                </NavLink>
                <NavLink
                    to={"/message"}
                    className={({ isActive }) => setLinkStyle(isActive)}
                >
                    <MdMessage size={20} />
                    <div className="text-xs">
                        {language === "US" ? "Message" : "Сообщения"}
                    </div>
                </NavLink>
                <NavLink
                    to={"/wishlist"}
                    className={({ isActive }) => setLinkStyle(isActive)}
                >
                    <AiFillHeart size={20} />
                    <div className="text-xs">
                        {language === "US" ? "Wishlist" : "Желание"}
                    </div>
                </NavLink>
                <NavLink
                    to={"/cart"}
                    className={({ isActive }) => setLinkStyle(isActive)}
                >
                    <HiShoppingCart size={20} />
                    <div className="text-xs">
                        {language === "US" ? "Cart" : "Корзина"}
                    </div>
                </NavLink>
                {loaded === true && userRole === "admin" && (
                    <NavLink
                        to={"/admin"}
                        className={({ isActive }) => setLinkStyle(isActive)}
                    >
                        <MdVerifiedUser size={20} />
                        <div className="text-xs">
                            {language === "US" ? "Admin" : "Aдмин"}
                        </div>
                    </NavLink>
                )}
                {auth.currentUser! && <NavLink
                    to={"/auth/logout"}
                    className={({ isActive }) => setLinkStyle(isActive)}
                >
                    <MdLogout size={20} />
                    <div className="text-xs">
                        {language === "US" ? "Logout" : "Выйти"}
                    </div>
                </NavLink>}
                {auth.currentUser! === null && <NavLink
                    to={"/auth/login"}
                    className={({ isActive }) => setLinkStyle(isActive)}
                >
                    <MdLogin size={20} />
                    <div className="text-xs">
                        {language === "US" ? "Login" : "вход"}
                    </div>
                </NavLink>}
            </div>
        </div>
    );
};

export default Navbar;
