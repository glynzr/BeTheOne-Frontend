import React, { useState } from "react";
import Input from "./Input";
import { auth } from "../../services/fire_app";
import { sendPasswordResetEmail } from "firebase/auth";
import { MdArrowBack } from "react-icons/md";

const ForgotPasswordWidget = ({ goBack }: { goBack: () => any }) => {
    const [email, setEmail] = useState<string>("");

    const sendPasswordReset = (e: React.FormEvent) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => goBack())
            .catch((error) => {
                throw error;
            });
    };

    return (
        <div>
            <form
                className="bg-white shadow rounded p-4 w-[400px] gap-4 flex flex-col"
                onSubmit={(e) => sendPasswordReset(e)}
            >
                <MdArrowBack onClick={() => goBack()} />
                <div>Enter email for password reset link</div>
                <Input
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                />
                <button className="bg-blue-500 text-white p-2 rounded">
                    Send
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordWidget;
