import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../assets/constants";
import "./Layout.scss";
interface IProps {
  children: React.ReactNode;
  basket: boolean;
  backButton: boolean;
  title: string | undefined;
}
const Layout: FC<IProps> = ({ children, title, backButton, basket }) => {
  const navigate = useNavigate();
  const backClickHandler = () => {
    navigate(-1);
  };
  const basketClickHandler = () => {
    navigate("/basket");
  };
  return (
    <>
      <header>
        <div className="header-container">
          <div className="back-button">
            {backButton && (
              <img onClick={backClickHandler} src={images.back} alt="" />
            )}
          </div>
          <img src={images.blogo} alt="" className="apple-logo" />
          <div className="basket-button">
            {basket && (
              <img onClick={basketClickHandler} src={images.basket} alt="" />
            )}
          </div>
        </div>
        <div className="title-container">
          <p className="title">{title}</p>
          <p className="under-title">Other Apple Products</p>
        </div>
      </header>
      <main> {children}</main>
    </>
  );
};

export default Layout;
