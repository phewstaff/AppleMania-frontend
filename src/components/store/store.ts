import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { apiAuthService } from "../../services/apiAuthService";
import { apiStoreService } from "../../services/apiStoreService";

// import productReducer from "./reducers/ProductSlice";

const rootReducer = combineReducers({
  //basket,
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
