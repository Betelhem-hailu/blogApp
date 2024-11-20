import {configureStore} from '@reduxjs/toolkit';
import { rtkQueryErrorLogger } from '../middleware/rtkQueryErrorLogger';
import userReducer from '../slices/user.slice';

const reducer = {
    user: userReducer,
};

const store = configureStore({
    reducer: reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rtkQueryErrorLogger),
});

export default store;