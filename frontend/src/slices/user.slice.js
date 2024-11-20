import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../services/user.service"


export const userRegister = createAsyncThunk(
    "user/register",
    async(user, {rejectWithValue}) =>{
        try {
            const response = await userService.register(user);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error);
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
            return rejectWithValue(error.response?.data || error);
        }
    }
)

export const logout = createAsyncThunk(
    "user/logout", 
    async () => {
    userService.logout();
  });

const userSlice = createSlice({
    name: "user",
    initialState: {
        user:
    typeof window !== "undefined" && localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
        error: null,
        loading: false,
        msg: null,
    },
    extraReducers: (builder) => {
        builder
          .addCase(userRegister.fulfilled, (state, { payload }) => {
            state.isLoggedIn = false;
            state.msg = payload.data;
          })
          .addCase(userRegister.rejected, (state, { payload }) => {
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


export const { reducer } = userSlice.actions;
export default userSlice.reducer;