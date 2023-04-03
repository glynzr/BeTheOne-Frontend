import { createSlice } from "@reduxjs/toolkit";

const initialState: { userRole: string, loaded: boolean } = {
    userRole: "",
    loaded: false
};

export const adminSlice = createSlice({
    initialState,
    name: "admin_slice",
    reducers: {
        setAdmin: (state, action) => {
            state.loaded = action.payload.loaded;
            state.userRole = action.payload.userRole;
        },
    },
});

export type AdminType = typeof initialState;

export default adminSlice.reducer;
export const { setAdmin } = adminSlice.actions;
