import { createSlice } from "@reduxjs/toolkit";

const initialState: { language: "US" | "RU" } = {
    language: "US",
};

export const languageSlice = createSlice({
    initialState,
    name: "language_slice",
    reducers: {
        changeLanguage: (state, action) => {
            state.language = action.payload;
        },
    },
});

export type LanguageType = typeof initialState;

export default languageSlice.reducer;
export const { changeLanguage } = languageSlice.actions;
