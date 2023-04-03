import { createSlice } from "@reduxjs/toolkit";
import { RecaptchaVerifier } from "firebase/auth";

const initialState: { recaptchaWidget: RecaptchaVerifier | null } = {
    recaptchaWidget: null
};

export const recaptchaSlice = createSlice({
    initialState,
    name: "recaptcha_slice",
    reducers: {
        setRecaptcha: (state, action) => {
            state.recaptchaWidget = action.payload    
        },
    },
});

export type RecaptchaType = typeof initialState;

export default recaptchaSlice.reducer;
export const { setRecaptcha } = recaptchaSlice.actions;
