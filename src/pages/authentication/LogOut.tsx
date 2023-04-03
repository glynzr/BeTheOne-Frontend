import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { logOut } from "../../services/auth_service";
import { auth } from "../../services/fire_app";

const LogOut = () => {
    logOut().catch(console.error);

    return <Navigate to={"/auth/login"} />;
};

export default LogOut;
