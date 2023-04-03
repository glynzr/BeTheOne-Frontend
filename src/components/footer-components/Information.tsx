import LogoColored from "../../images/LogoColored";
import React from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
const Information = () => {
    return (
        <div className="flex items-center w-full pt-10 pb-[59px] justify-center">
            <div className="flex justify-evenly gap-y-4 w-3/4">
                <span className="h-[46px] w-auto">
                    <LogoColored />
                </span>
                <div className="hidden w-full sm:flex justify-center mt-[0.625rem]">
                    Be The One
                </div>
                <div className="flex items-center gap-x-[10px]">
                    <a
                        href="#s"
                        className="flex items-center justify-center w-8 h-8 bg-gray-400 rounded-full text-white"
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        href="#s"
                        className="flex items-center justify-center w-8 h-8 bg-gray-400 rounded-full text-white"
                    >
                        <AiOutlineTwitter />
                    </a>
                    <a
                        href="#s"
                        className="flex items-center justify-center w-8 h-8 bg-gray-400 rounded-full text-white"
                    >
                        <FaLinkedinIn />
                    </a>
                    <a
                        href="#s"
                        className="flex items-center justify-center w-8 h-8 bg-gray-400 rounded-full text-white"
                    >
                        <AiFillInstagram size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Information;
