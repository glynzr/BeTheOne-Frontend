import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/admin-page-components/AdminNavbar";

const AdminPage = () => {
    return (
        <div className="w-full">
            <AdminNavbar />
            <Outlet />
        </div>
    );
};

export default AdminPage;
