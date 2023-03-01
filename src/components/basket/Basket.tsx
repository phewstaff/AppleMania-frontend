import { FC } from "react";
import { images } from "../../assets/constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import "./Basket.scss";

const Basket: FC = () => {
  const basketProducts = useAppSelector((state) => state.basket.products);
  return (
    <div className="basket-container">
      {basketProducts?.map((item) => (
        <>
          <img src={item.previewImage?.lg} alt="" className="product-img" />
          <p className="name">{item.name}</p>
          <div className="product-actions">
            <div className="actions-left">
              <p className="quantity">{item.quantity}</p>
            </div>
            <div className="actions-left">
              <div className="count-actions-container">
                <img src={images.minus} alt="" />
                <img src={images.plus} alt="" />
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Basket;

export {};
