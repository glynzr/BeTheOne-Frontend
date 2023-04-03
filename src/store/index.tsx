import { combineReducers, configureStore } from "@reduxjs/toolkit";
import timer from "./timer";
import language from "./language";
import admin from "./admin";
import recaptcha from "./recaptcha";

const commonReducers = combineReducers({ timer, language, admin, recaptcha });

const store = configureStore({
    reducer: {
        commonReducers,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
