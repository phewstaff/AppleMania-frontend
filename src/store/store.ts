import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { apiAuthService } from "../services/apiAuthService";
import { apiStoreService } from "../services/apiStoreService";
import { authSlice } from "./reducers/AuthSlice";
import { basketSlice } from "./reducers/BasketSlice";

const rootReducer = combineReducers({
  basket: basketSlice.reducer,
  auth: authSlice.reducer,
  [apiStoreService.reducerPath]: apiStoreService.reducer,
  [apiAuthService.reducerPath]: apiAuthService.reducer,
});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        apiStoreService.middleware,
        apiAuthService.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export {};
// исправить
