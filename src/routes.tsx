import HomeLayout from "./pages/layouts/HomeLayout";

import Home from "./pages/home/Home";
import Profile from "./pages/home/Profile";
import Cart from "./pages/home/Cart";
import Wishlist from "./pages/home/Wishlist";
import Message from "./pages/home/Message";
import { auth } from "./services/fire_app";

import {
    Routes,
    Navigate,
    Route,
    RouteObject,
    useNavigate,
} from "react-router-dom";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import LogoColored from "./images/LogoColored";
import { Loader } from "./components/additional-components/RotatingCircle";
import ProductView from "./pages/home/Product";
import LogOut from "./pages/authentication/LogOut";
import AboutProducts from "./pages/home/AboutProducts";
import AllProducts from "./pages/home/AllProducts";
import AdminPage from "./pages/admin/AdminPage";
import { useDispatch, useSelector } from "react-redux";
import admin, { AdminType, setAdmin } from "./store/admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProfileDeletion from "./pages/authentication/ProfileDeletion";

const RoutesElement = () => {
    const [user, setUser] = useState<
        (User & { userRole?: string | undefined }) | null
    >(null);

    const [redirectAdmin, setRedirectAdmin] = useState(false);
    const adminState = useSelector(
        (state: { commonReducers: { admin: AdminType } }) =>
            state.commonReducers.admin
    );
    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoaded(true);

            if (user === null) {
                dispatch(setAdmin({
                    userRole: "",
                    loaded: true
                } as AdminType))
            }
            
            user?.getIdTokenResult().then((data) => {
                dispatch(
                    setAdmin({
                        userRole: data.claims.userRole,
                        loaded: true,
                    } as AdminType)
                );
            });
        });
    }, []);

    if (loaded === false) {
        return (
            <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
                <LogoColored />
                <Loader size={128} />
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route path="" element={<Home />} />
                <Route path="product-view/:id" element={<ProductView />} />
                <Route
                    path="profile"
                    element={
                        loaded && user !== null ? (
                            <Profile />
                        ) : (
                            <Navigate to="/auth/login" />
                        )
                    }
                />
                <Route
                    path="message"
                    element={
                        loaded && user !== null ? (
                            <Message />
                        ) : (
                            <Navigate to="/auth/login" />
                        )
                    }
                />
                <Route
                    path="wishlist"
                    element={
                        loaded && user !== null ? (
                            <Wishlist />
                        ) : (
                            <Navigate to="/auth/login" />
                        )
                    }
                />
                <Route
                    path="cart"
                    element={
                        loaded && user !== null ? (
                            <Cart />
                        ) : (
                            <Navigate to="/auth/login" />
                        )
                    }
                />
                <Route path="about_products/" element={<AboutProducts />} />
                <Route path="about_products/:id" element={<AboutProducts />} />
                <Route path="search" element={<AllProducts />} />
                <Route path="search/:filter" element={<AllProducts />} />
            </Route>
            <Route path="/auth">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="logout" element={<LogOut />} />
                <Route path="delete" element={<ProfileDeletion />} />
            </Route>
            {adminState.loaded === true && adminState.userRole === "admin" ? (
                <Route path="/admin" element={<AdminPage />}>
                    <Route path="" element={<AdminDashboard />} />
                </Route>
            ) : (
                (() => {
                    setTimeout(() => setRedirectAdmin(true), 2000);
                    return (
                        <Route
                            path="/admin"
                            element={
                                <div className="w-full flex flex-col justify-center items-center">
                                    You can't access this page
                                    {redirectAdmin && <Navigate to="/" />}
                                </div>
                            }
                        />
                    );
                })()
            )}
        </Routes>
    );
};

export default RoutesElement;
