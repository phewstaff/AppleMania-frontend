import { FC } from "react";
import { images } from "../../assets/constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import "./Basket.scss";
import { basketSlice } from "../../store/reducers/BasketSlice";
import { baseUrl } from "../../consts";

const Basket: FC = () => {
  const dispatch = useAppDispatch();
  const basketProducts = useAppSelector((state) => state.basket.products);

  return (
    <div className="basket-wrapper">
      {basketProducts?.map((item) => (
        <div key={item._id} className="basket-product-container">
          <div className="image">
            <img
              src={baseUrl + item.previewImage?.lg}
              alt=""
              className="product-img"
            />
          </div>
          <p className="name">{item.name}</p>
          <div className="product-actions">
            <div className="actions-left">
              <p className="count">{item.quantity}</p>
              <div className="count-actions-container">
                <img
                  onClick={() => {
                    dispatch(
                      basketSlice.actions.decreaseProductQuantity(item._id)
                    );
                  }}
                  src={images.minus}
                  alt=""
                />
                <img
                  onClick={() => {
                    dispatch(
                      basketSlice.actions.increaseProductQuantity(item._id)
                    );
                  }}
                  src={images.plus}
                  alt=""
                />
              </div>
            </div>
            <div className="actions-right">
              <p className="price">${item.price}</p>
              <button
                onClick={() => {
                  dispatch(
                    basketSlice.actions.removeProductFromBasket(item._id)
                  );
                }}
                className="remove"
              >
                Remove
              </button>
            </div>
          </div>
          <div>
            <hr />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Basket;
