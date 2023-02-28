import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./components/AppRouter";

function App() {
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
