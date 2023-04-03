import React from "react";
import { useNavigate } from "react-router-dom";
import {MdLogout} from "../../icons"
import { logOut } from "../../services/auth_service";
import { auth } from "../../services/fire_app";
const AdminNavbar = () => {
    const user = auth.currentUser
    const navigate = useNavigate()
    const handleLogout = () => {
        logOut().then(() => navigate("/auth/login"))
    }
    
    return (
        <div className="flex h-16 w-full border-b gap-4 items-center px-4">
            <div>Admin Navbar</div>
            <div style={{flex: "1 1 auto"}} />
            <div className="cursor-pointer" onClick={() => navigate('/')}>
                Go to App
            </div>
            <div className="cursor-pointer" onClick={() => handleLogout()}>
                <MdLogout />
            </div>
        </div>
    );
};

export default AdminNavbar;
