import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoColored from "../../images/LogoColored";
import Search from "./Search";
import Navbar from "./Navbar";
import BottomHeader from "./BottomHeader";
import { FaArrowDown, FaArrowUp } from "../../icons";
import { FaSearch } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Header = ({ searchable = true }) => {
    const [searchCollapsed, setSearchCollapsed] = useState(false);

    return (
        <div className="flex flex-col bg-white ">
            <div className="flex px-6 border-opacity-40 justify-between gap-x-12 items-center h-[86px] ">
                <Link to={"/"} replace={true}>
                    <LogoColored />
                </Link>

                {searchable && <Search className="lg:block hidden w-full" />}
                <Navbar className="sm:block hidden" />
                <div
                    className="sm:hidden flex justify-center items-center p-2 rounded-full bg-stone-300"
                    onClick={() => setSearchCollapsed((prev) => !prev)}
                >
                    {!searchCollapsed ? <MdCancel /> : <FaSearch />}
                </div>
            </div>
            {!searchCollapsed && (
                <div className="lg:hidden block">
                    <hr />

                    <div className="p-6 flex gap-4 items-center justify-between">
                        <Search />
                    </div>
                </div>
            )}
            <div className="sm:hidden block">
                <hr />
                <div className="p-6">
                    <Navbar />
                </div>
            </div>
            <hr />
            <BottomHeader />
        </div>
    );
};

export default Header;
