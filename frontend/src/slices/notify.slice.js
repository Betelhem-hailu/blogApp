import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { commentService } from "../services/comment.service";


export const fetchNotifications = createAsyncThunk(
    "notifications/fetch", 
    async (_, { rejectWithValue }) => {
        try {
          const response = await commentService.fetchNotifications();
          return response;
        } catch (error) {
          return rejectWithValue(error.response?.data?.message || error.message);
        }
      });

export const markAsRead = createAsyncThunk(
    "notifications/markAsRead", 
    async (notificationIds, {rejectWithValue}) => {
    try {
        const response = await commentService.markAsRead(notificationIds);
        return response;
        } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
        }
    });


const notificationSlice = createSlice({
    name: "notifications",
    initialState: { notifications: [], loading: false, status: "idle", error: null },
    reducers: {
        addNotification(state, action) {
            state.notifications.unshift(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
                state.status = "succeeded"
            })
            .addCase(fetchNotifications.rejected, (state) => {
                state.loading = false;
            })
            .addCase(markAsRead.fulfilled, (state, action) => {
                state.notifications = state.notifications.filter(
                    (notification) => !action.payload.includes(notification._id)
                );
            });
    },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
