import React from "react";
import { useState } from "react";
import Title from "../../components/additional-components/Title";
import Input from "../../components/authentication-components/Input";
import LogoColored from "../../images/LogoColored";
import { MdArrowBack } from "../../icons";
import { string, object } from "yup";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { basicRegister } from "../../services/auth_service";
import { useNavigate } from "react-router-dom";
import Spacer from "../../components/additional-components/Spacer";
import { passwordPolicyRegex } from "../../constants/password_policy_regex";

const validation = object({
    email: string().email().required(),
    displayName: string().required(),
    phoneNumber: string().required(),
    password: string().required(),
    confirmPassword: string().required(),
});

interface RegisterStateProps {
    email: string;
    displayName: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const [visibility, setVisibility] = useState(false);

    const [passwordError, setPasswordError] = useState(false);
    const [wrongFieldError, setWrongFieldError] = useState(false);
    const [wrongPasswordFormError, setWrongPasswordFormError] = useState(false);

    const [formData, setFormData] = useState<RegisterStateProps>({
        confirmPassword: "",
        email: "",
        phoneNumber: "",
        displayName: "",
        password: "",
    });

    const createWrongFieldMessage = () => {
        setWrongFieldError(true);
        setTimeout(() => setWrongFieldError(false), 2000);
    };

    const createPasswordErrorMessages = () => {
        setPasswordError(true);
        setTimeout(() => setPasswordError(false), 2000);
    };

    const createWrongPasswordFormErrorMessage = () => {
        setWrongPasswordFormError(true);
        setTimeout(() => setWrongPasswordFormError(false), 2000);
    };

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const {
                email,
                password,
                confirmPassword,
                displayName,
                phoneNumber,
            } = await validation.validate(formData);
            if (password.trim() !== confirmPassword.trim()) {
                createPasswordErrorMessages();
                throw new Error("pnee");
            }

            if (password.trim().match(passwordPolicyRegex) === null) {
                createWrongPasswordFormErrorMessage();
                throw new Error("wpfe");
            }

            const user = await basicRegister(
                email.trim(),
                password.trim(),
                displayName.trim(),
                phoneNumber,
            )
                .then(() => navigate("/auth/login"))
                .catch((error) => {
                    alert(error);
                    throw error;
                });
        } catch (error) {
            const myErr = error as Error;
            console.error(error);
            if (!["pnee", "wpfe"].includes(myErr.message))
                createWrongFieldMessage();
        }
    };

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-slate-100">
            <div className="h-[100vh] sm:h-max py-8 rounded shadow-md p-4 bg-white sm:w-[500px] w-full min-w-[300px] gap-4 flex flex-col">
                <Spacer />
                <div className="flex flex-col items-start">
                    <LogoColored />
                    <Title>Register Page</Title>
                </div>
                <div className="flex flex-col gap-2">
                    {wrongFieldError && (
                        <div className="text-red-600 text-xs">
                            Data are not provided correctly
                        </div>
                    )}
                    <Input
                        autoComplete="new-password"
                        placeholder="Name"
                        value={formData.displayName}
                        onChange={({ target: { value } }) =>
                            setFormData({
                                ...formData,
                                displayName: value,
                            })
                        }
                    />
                    <Input
                        autoComplete="new-password"
                        placeholder="Email"
                        value={formData.email}
                        onChange={({ target: { value } }) =>
                            setFormData({ ...formData, email: value })
                        }
                    />
                    <PhoneInput
                        onChange={(number) =>
                            setFormData({
                                ...formData,
                                phoneNumber: number ?? "",
                            })
                        }
                        className="bg-slate-200 rounded-l p-1"
                        addInternationalOption={false}
                        numberInputProps={{
                            className: "bg-slate-200 rounded-r p-1",
                            placeholder: "Phone",
                        }}
                        defaultCountry="AZ"
                    />

                    <div>
                        {passwordError && (
                            <div className="text-red-600 text-xs">
                                Passwords are not equal
                            </div>
                        )}
                        <Input
                            autoComplete="new-password"
                            placeholder="Password"
                            type={!visibility ? "password" : "text"}
                            value={formData.password}
                            onChange={({ target: { value } }) =>
                                setFormData({
                                    ...formData,
                                    password: value,
                                })
                            }
                        />
                    </div>
                    <div>
                        {passwordError && (
                            <div className="text-red-600 text-xs">
                                Passwords are not equal
                            </div>
                        )}
                        <Input
                            autoComplete="new-password"
                            placeholder="Confirm Password"
                            type={!visibility ? "password" : "text"}
                            value={formData.confirmPassword}
                            onChange={({ target: { value } }) =>
                                setFormData({
                                    ...formData,
                                    confirmPassword: value,
                                })
                            }
                        />
                    </div>
                </div>
                {wrongPasswordFormError && (
                    <div className="text-red-600 text-xs">
                        Password should contain at least 8 character, 1
                        uppercase, 1 lowercase and a number
                    </div>
                )}
                <div className="flex gap-2">
                    <input
                        autoComplete="new-password"
                        type={"checkbox"}
                        checked={visibility}
                        onChange={() => setVisibility((prev) => !prev)}
                    />
                    <div>Show Password</div>
                </div>
                <div>
                    <button
                        className="outline-none w-full p-2 bg-blue-500 text-white rounded"
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                </div>
                <div id="recaptcha-container"></div>
                <div className="flex items-center gap-2">
                    <div className="w-full h-[1px] bg-black"></div>
                    <div>Or</div>
                    <div className="w-full h-[1px] bg-black"></div>
                </div>
                <div className="flex gap-4">
                    <button
                        className="outline-none w-full h-[50px] bg-green-500 text-white rounded"
                        onClick={() => navigate("/auth/login")}
                    >
                        Login
                    </button>
                </div>
                <Spacer />
            </div>
        </div>
    );
};

export default Register;
