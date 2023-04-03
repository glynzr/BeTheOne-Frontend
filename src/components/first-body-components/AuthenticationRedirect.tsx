import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/fire_app";

const AuthenticationRedirect = () => {
    const navigate = useNavigate();

    if (auth.currentUser !== null) {
        return <></>;
    }

    return (
        <div className="sm:hidden flex flex-col w-[90%] mx-auto gap-y-[10px]">
            <div className="flex flex-col py-[14px] px-[10px] gap-y-[7px] bg-[#E3F0FF] rounded-md">
                <div className="flex items-center gap-x-2">
                    <span className="w-11 h-11">
                        <img
                            src="/images/profile.png"
                            alt="profile"
                            className="w-full h-full"
                        />
                    </span>
                    <span className="flex flex-col leading-5">
                        <p>Hi, user</p>
                        <p>let's get started</p>
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
        </div>
    );
};

export default AuthenticationRedirect;
