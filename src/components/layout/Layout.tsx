import React, { FC } from "react";
import { images } from "../../assets/constants";
import "./Layout.scss";
interface IProps {
  children: React.ReactNode;
  basket: boolean;
  backButton: boolean;
  title: string;
}
const Layout: FC<IProps> = ({ children, title, backButton, basket }) => {
  return (
    <>
      <header>
        <div className="header-container">
          <div className="back-button">
            {backButton && (
              <img
                // onClick={clickHandler}
                src={images.back}
                alt=""
              />
            )}
          </div>
          <img src={images.blogo} alt="" className="apple-logo" />
          <div className="basket-button">
            {basket && <img src={images.basket} alt="" />}
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
