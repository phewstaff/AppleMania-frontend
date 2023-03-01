import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Authorisation.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { apiAuthService } from "../../services/apiAuthService";
import { IUser } from "../../types/dataTypes";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const loginFormSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().min(4).max(15).required(),
  })
  .required();
type FormData = IUser;

const Authorisation: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginFormSchema),
  });
  const [
    login,
    { isSuccess: isLoginSuccess, isLoading, data, isError: isLoginError },
  ] = apiAuthService.useFetchLoginUserMutation();
  const submitForm = async (user: FormData) => {
    await login(user)
      .unwrap()
      .then((response) => {
        if (response) {
          const token = response.token;
          if (token) {
            Cookies.set("token", token, { expires: 7 });
          }
        }
      })
      .catch((error) => {});
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("successfully logged");
      navigate("/categories");
    } else if (isLoginError) {
      toast.error("Login error");
    }
  }, [isLoginSuccess, isLoginError, data]);

  return (
    <>
      <ToastContainer position="bottom-right" />
      <div className="auth-container">
        <h1 className="auth-title">Sign in to Applemania</h1>
        <form onSubmit={handleSubmit(submitForm)} className="auth-form">
          <div className="auth-form-group">
            <input
              {...register("username")}
              placeholder="username..."
              type="text"
            />
            <p>{errors.username?.message}</p>
          </div>
          <div className="auth-form-group">
            <label htmlFor="password"></label>
            <input
              {...register("password")}
              placeholder="password..."
              type="password"
              name="password"
              required
            />
            {errors.password?.message}
          </div>
          <button type="submit" className="auth-submit-button">
            Sign In
          </button>
        </form>
      </div>
    </>
  );
};

export default Authorisation;
export {};
