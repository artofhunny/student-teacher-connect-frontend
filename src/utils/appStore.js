import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import assignmentReducer from "./assignmentSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        assignment: assignmentReducer,
    }
});

export default appStore;