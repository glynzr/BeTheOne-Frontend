import { auth } from "./fire_app";
import {
    signInWithEmailAndPassword,
    getMultiFactorResolver,
    updatePhoneNumber,
    PhoneAuthProvider,
    RecaptchaVerifier,
    PhoneMultiFactorGenerator,
    GoogleAuthProvider,
    signInWithPopup,
    deleteUser,
} from "firebase/auth";

import axios from "./axios.interceptor";
import { EndpointBuilder } from "../utils/endpoint_builder";

const builder = new EndpointBuilder();

export const basicSignIn = (
    email: string,
    password: string,
    recaptchaVerifier: RecaptchaVerifier
) => {
    return signInWithEmailAndPassword(auth, email, password).catch(
        async (error) => {
            if (error.code !== "auth/multi-factor-auth-required") throw error;

            const resolver = getMultiFactorResolver(auth, error);
            // resolver.hints[0];

            const phoneInfoOptions = {
                multiFactorHint: resolver.hints[0],
                session: resolver.session,
            };

            const phoneAuthProvider = new PhoneAuthProvider(auth);

            const verificationId = await phoneAuthProvider.verifyPhoneNumber(
                phoneInfoOptions,
                recaptchaVerifier
            );

            const verificationCode = (() => {
                let code: string | undefined = undefined;
                return () => {
                    while (code === undefined)
                        code = prompt("Enter OTP code")?.trim();

                    return code;
                };
            })();

            const cred = PhoneAuthProvider.credential(
                verificationId,
                verificationCode()
            );

            const multiFactorAssertion =
                PhoneMultiFactorGenerator.assertion(cred);

            const userCredential = await resolver
                .resolveSignIn(multiFactorAssertion)
                .catch((error) => {
                    recaptchaVerifier.clear();
                    throw error;
                });

            return { userCredential };
        }
    );
};

export const basicRegister = async (
    email: string,
    password: string,
    displayName: string,
    phoneNumber: string
) => {
    const url = builder.addParam("auth").addParam("register").build();
    const { data } = await axios
        .post(url, { email, password, displayName, phoneNumber })
        .catch(() => {
            throw "Registration failed";
        });
};

export const getVerificationIdInvisCaptcha = async (phoneNumber: string) => {
    const applicationVerifier = new RecaptchaVerifier(
        "sign-in-button",
        {
            size: "invisible",
        },
        auth
    );

    const provider = new PhoneAuthProvider(auth);
    const verificationId = await provider.verifyPhoneNumber(
        phoneNumber,
        applicationVerifier
    );
    return verificationId;
};

export const finishVerification = async (
    verificationId: string,
    verificationCode: string
) => {
    const phoneCredential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
    );

    await updatePhoneNumber(auth.currentUser!, phoneCredential).catch(
        (error) => {
            console.log(error);
            throw new Error("Update");
        }
    );
};

export const logOut = () => {
    return auth.signOut();
};

export const googleProviderSignIn = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const deleteProfile = async () => {
    return deleteUser(auth.currentUser!);
};
