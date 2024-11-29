import {configureStore} from '@reduxjs/toolkit';
import { rtkQueryErrorLogger } from '../middleware/rtkQueryErrorLogger';
import userReducer from '../slices/user.slice';
import postReducer from '../slices/post.slice';
import notifyReducer from '../slices/notify.slice';

const reducer = {
    user: userReducer,
    post: postReducer,
    notifications: notifyReducer
};

const store = configureStore({
    reducer: reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rtkQueryErrorLogger),
});

export default store;