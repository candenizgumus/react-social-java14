import { configureStore } from "@reduxjs/toolkit";
import { authSlice ,userSlice} from "./features";
import { useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice
    },
})

export type SocialDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector = useSelector.withTypes<RootState>()
export default store