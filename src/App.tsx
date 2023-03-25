import { is } from "immer/dist/internal";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./components/AppRouter";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { apiAuthService } from "./services/apiAuthService";
import { authSlice } from "./store/reducers/AuthSlice";

function App() {
  const dispatch = useAppDispatch();
  const { isError, data: isSuccess } =
    apiAuthService.useFetchIsTokenValidQuery();

  const admin = useAppSelector((state) => {
    return state.auth.admin;
  });

  const token = useAppSelector((state) => {
    return state.auth.token;
  });

  useEffect(() => {
    if (isError) {
      Cookies.remove("token");
      dispatch(authSlice.actions.setAdmin(false));
      dispatch(authSlice.actions.setToken(""));
    }
    if (isSuccess && token) {
      dispatch(authSlice.actions.setToken(Cookies.get("token")!));
      dispatch(authSlice.actions.setAdmin(true));
    }
  }, [isError, isSuccess, token]);

  return (
    <>
      <ToastContainer position="bottom-right" />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
