import Cookies from "js-cookie";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./components/AppRouter";
import { useAppSelector } from "./hooks/redux";
import { apiAuthService } from "./services/apiAuthService";

function App() {
  const { isError, data: isSuccess } =
    apiAuthService.useFetchIsTokenValidQuery();
  const token = useAppSelector((state) => {
    return state.auth.token;
  });
  useEffect(() => {
    if (isError) {
      Cookies.remove("token");
    }
    if (isSuccess && token) {
      Cookies.set("token", token);
    } else {
      Cookies.remove("token");
    }
  }, [isSuccess, isError, token]);

  return (
    <>
      <ToastContainer position="bottom-right" />
      <BrowserRouter>
        <AppRouter></AppRouter>
      </BrowserRouter>
    </>
  );
}

export default App;
