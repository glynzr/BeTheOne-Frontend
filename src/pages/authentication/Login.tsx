import React, { useRef } from "react";
import { useState } from "react";
import Title from "../../components/additional-components/Title";
import Input from "../../components/authentication-components/Input";
import LogoColored from "../../images/LogoColored";
import { FaGoogle, FaPhone, MdArrowBack } from "../../icons";

import { object, string } from "yup";
import { basicSignIn, googleProviderSignIn } from "../../services/auth_service";
import { useNavigate } from "react-router-dom";
import Spacer from "../../components/additional-components/Spacer";
import ForgotPasswordWidget from "../../components/authentication-components/ForgotPasswordWidget";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../services/fire_app";
import { useDispatch, useSelector } from "react-redux";
import recaptcha, { RecaptchaType, setRecaptcha } from "../../store/recaptcha";

const validation = object({
    email: string().email().required(),
    password: string().required(),
});

interface LoginStateProps {
    email: string;
    password: string;
}

const Login = () => {
    const [error, setError] = useState(false);
    const [visibility, setVisibility] = useState(false);

    const [forgotPasswordScreen, setForgotPasswordScreen] = useState(false);

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState<LoginStateProps>({
        email: "",
        password: "",
    });

    const createErrorMessage = () => {
        setError(true);
        setTimeout(() => setError(false), 2000);
    };

    const recaptchaRef = useRef<HTMLDivElement | null>(null);

    const handleLogin = async () => {
        try {
            recaptchaRef.current!.innerHTML =
                '<div id="recaptcha-container"></div>';

            const recaptcha = new RecaptchaVerifier(
                "recaptcha-container",
                { size: "invisible" },
                auth
            );

            const { email, password } = await validation.validate({
                email: credentials.email.trim(),
                password: credentials.password.trim(),
            });

            await basicSignIn(email, password, recaptcha);
            recaptcha.clear();
            navigate("/");
        } catch (error) {
            console.error(error);
            createErrorMessage();
        }
    };

    const handleGoogleAuthentication = async () => {
        try {
            await googleProviderSignIn();
            navigate("/");
        } catch (error) {
            throw error;
        }
    };

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-slate-100">
            <div ref={(ref) => (recaptchaRef.current = ref)}>
                <div id="recaptcha-container"></div>
            </div>
            {forgotPasswordScreen ? (
                <ForgotPasswordWidget
                    goBack={() => setForgotPasswordScreen(false)}
                />
            ) : (
                <div className="h-[100vh] sm:h-max py-8 rounded shadow-md p-4 bg-white w-[640px] min-w-[300px] gap-4 flex flex-col">
                    <Spacer />
                    <div className="flex items-start flex-col">
                        <LogoColored />
                        <Title>Login Page</Title>
                    </div>

                    <div className="flex flex-col gap-2">
                        {error && (
                            <div className="text-red-600 text-xs">
                                Login failed
                            </div>
                        )}
                        <Input
                            placeholder="Email"
                            name="email"
                            value={credentials.email}
                            onChange={({ target: { value } }) =>
                                setCredentials({ ...credentials, email: value })
                            }
                        />
                        <Input
                            placeholder="Password"
                            type={!visibility ? "password" : "text"}
                            value={credentials.password}
                            onChange={({ target: { value } }) =>
                                setCredentials({
                                    ...credentials,
                                    password: value,
                                })
                            }
                        />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-2" onClick={() => setVisibility((prev) => !prev)}>
                            <input
                                type={"checkbox"}
                                checked={visibility}
                            />
                            <div>Show Password</div>
                        </div>
                        <div
                            className="flex gap-2"
                            onClick={() => setForgotPasswordScreen(true)}
                        >
                            <div>Forgot Password</div>
                        </div>
                    </div>
                    <div>
                        <button
                            className="outline-none w-full p-2 bg-blue-500 text-white rounded"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-full h-[1px] bg-black"></div>
                        <div>Or</div>
                        <div className="w-full h-[1px] bg-black"></div>
                    </div>
                    <div className="flex gap-4">
                        <div
                            className="flex items-center flex-col"
                            onClick={handleGoogleAuthentication}
                        >
                            <div className="w-[50px] h-[50px] bg-red-500 flex justify-center items-center rounded cursor-pointer">
                                <FaGoogle color="white" />
                            </div>
                        </div>
                        <button
                            className="outline-none w-full h-[50px] bg-green-500 text-white rounded"
                            onClick={() => navigate("/auth/register")}
                        >
                            Register
                        </button>
                    </div>
                    <Spacer />
                </div>
            )}
        </div>
    );
};

export default Login;
