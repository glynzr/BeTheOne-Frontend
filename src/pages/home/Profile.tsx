import React, { useState } from "react";
import {
    deleteUser,
    sendEmailVerification,
    verifyBeforeUpdateEmail,
} from "firebase/auth";
import { FaUser, HiCheck } from "../../icons";
import { auth } from "../../services/fire_app";
import { deleteProfile, logOut } from "../../services/auth_service";
import { updateProfile, updateEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Input from "../../components/authentication-components/Input";
import { useModal } from "../../hooks/useModal";

const EmailChangeScreen = ({ goBack }: { goBack: () => any }) => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const user = auth.currentUser!;

    const { element, openModal, closeModal } = useModal({
        title: "Modal",
        children: (
            <div>
                <div>Please verify Email</div>
                <div>Email has been sent to your current email</div>
            </div>
        ),
    });
    console.log(user);

    async function handleEmailChange() {
        verifyBeforeUpdateEmail(user, email)
            .then(() => window.location.reload())
            .catch((error) => {
                if (error.code === "auth/requires-recent-login") {
                    alert(
                        "Your auth session is too old for email change, you will be redirected to login page and try again to change your email, then verify your email"
                    );
                    logOut().then(() => navigate("/auth/login"));
                }
            });
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-[400px] flex flex-col bg-white rounded shadow-lg p-4 m-4 gap-2">
                <div>Change Email</div>
                <input
                    className="p-1 rounded bg-slate-200 w-full outline-none hover:bg-slate-300 focus:bg-slate-300"
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                />
                <div className="flex gap-2">
                    <button
                        onClick={handleEmailChange}
                        className="w-full p-1 rounded bg-blue-500 text-white"
                    >
                        Change
                    </button>
                    <button
                        className="w-full p-1 rounded border"
                        onClick={goBack}
                    >
                        Go back
                    </button>
                </div>
                {element}
            </div>
        </div>
    );
};

const Profile = () => {
    const user = auth.currentUser;

    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("");
    const [photoURL, setPhotoURL] = useState<string>("");

    async function handleProfileChange() {
        const trimmedDisplayName = displayName.trim();
        const trimmedPhotoURL = photoURL.trim();

        await updateProfile(user!, {
            displayName:
                trimmedDisplayName === "" ? undefined : trimmedDisplayName,
            photoURL: trimmedPhotoURL === "" ? undefined : trimmedPhotoURL,
        })
            .then(() => window.location.reload())
            .catch(console.error);

        return true;
    }

    const [emailChangeScreen, setEmailChangeScreen] = useState(false);

    async function handleProfileDeletion() {
        deleteUser(auth.currentUser!)
            .then(() => navigate("/"))
            .catch((error) => navigate("/auth/delete"));
    }

    if (emailChangeScreen) {
        return <EmailChangeScreen goBack={() => setEmailChangeScreen(false)} />;
    }

    return (
        <div className="flex items-center justify-center w-full p-2">
            <div className="flex flex-col bg-slate-200 w-max rounded gap-y-2 p-4">
                <div className="flex flex-col items-start">
                    <div className="flex flex-col items-center self-center border-black border-b-[1px] w-full">
                        <div className="rounded-full w-max pt-1">
                            {user!.photoURL === null ? (
                                <FaUser className="text-white rounded-full w-[48px] h-[48px]" />
                            ) : (
                                <img
                                    src={user!.photoURL}
                                    alt={user!.displayName ?? ""}
                                    width="48"
                                    height="48"
                                    className="w-[48px] h-[48px] rounded-full"
                                />
                            )}
                        </div>
                        <div className="text-lg">{user!.displayName}</div>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex gap-4 justify-between flex-col w-1/2 p-1">
                        <div className="flex flex-col gap-y-4">
                            <div className="flex flex-col self-start w-full">
                                <div className="text-lg flex items-center gap-x-2">
                                    E-mail:
                                    <span className="text-base flex">
                                        {user!.email}
                                    </span>
                                    <button
                                        className="text-sm w-full ml-2 hover:bg-slate-100 p-1 rounded"
                                        onClick={() =>
                                            setEmailChangeScreen(true)
                                        }
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <div className="text-lg">New name: </div>
                            <input
                                className="px-2 mt-1 outline-none"
                                value={displayName}
                                onChange={({ target: { value } }) =>
                                    setDisplayName(value)
                                }
                            />
                        </div>
                        <div className="flex items-center gap-x-2">
                            <div className="text-lg">New photo URL: </div>
                            <input
                                className="px-2 mt-1 outline-none"
                                type={"url"}
                                value={photoURL}
                                onChange={({ target: { value } }) =>
                                    setPhotoURL(value)
                                }
                            />
                        </div>
                        <div className="flex w-full gap-2">
                            <button
                                className="outline-none border-none bg-blue-500 w-max px-2 py-1 rounded text-white"
                                onClick={() => handleProfileChange()}
                            >
                                Update
                            </button>
                            <button
                                className="outline-none border-none bg-blue-500 w-max px-2 py-1 rounded text-white"
                                onClick={deleteProfile}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
