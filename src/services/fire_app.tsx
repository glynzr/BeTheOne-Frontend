import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import {
    firebaseConfig,
    recaptchaV3PublicKey,
} from "../environment/firebase_config";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(recaptchaV3PublicKey),
    isTokenAutoRefreshEnabled: true,
});
export const firestore = getFirestore(app);
