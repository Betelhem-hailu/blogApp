import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../services/user.service"


export const register = createAsyncThunk(
    "user/register",
    async(user, {rejectWithValue}) =>{
        try {
            const response = await userService.register(user);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const login = createAsyncThunk(
    "user/login",
    async(user, {rejectWithValue}) =>{
        try {
            const response = await userService.login(user);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        error: null,
        loading: false
    },
    reducers: {
        logout: state => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(register.fulfilled, (state, { payload }) => {
            state.isLoggedIn = false;
            state.msg = payload.data;
          })
          .addCase(register.rejected, (state, { payload }) => {
            state.isLoggedIn = false;
            state.error = payload;
          })
          .addCase(login.fulfilled, (state, { payload }) => {
            state.isLoggedIn = true;
            state.loading = false;
            state.user = payload.data;
            state.error = null;
            if (typeof window !== "undefined") {
              localStorage.setItem("userInfo", JSON.stringify(payload.data));
            }
          })
          .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(login.rejected, (state, { payload }) => {
            state.isLoggedIn = false;
            state.loading = false;
            state.user = null;
            state.error = payload;
          })
          .addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.error = null;
          });
        }
})


export const { logout } = userSlice.actions;
export default userSlice.reducer;