import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/fire_app";
import { EndpointBuilder } from "../../utils/endpoint_builder";
import Product from "../home/Product";
import { User } from "firebase/auth";
import axiosInstance from "../../services/axios.interceptor";
import AdminUserTable from "../../components/admin-page-components/AdminUserTable";
import AdminProductTable from "../../components/admin-page-components/AdminProductTable";

const AdminDashboard = () => {
    return (
        <div>
            <AdminUserTable />
            <AdminProductTable />
        </div>
    );
};

export default AdminDashboard;
