import {configureStore} from '@reduxjs/toolkit';
import { goalApi } from './api/goalApi';
import { userApi } from './api/userAPi';

const store = configureStore({
  reducer: {
    [goalApi.reducerPath]: goalApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (defaultMiddleware) => defaultMiddleware()
                                    .concat(goalApi.middleware)
                                    .concat(userApi.middleware)
});

export default store;