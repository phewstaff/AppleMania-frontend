import { useParams } from "react-router-dom";
import { FC } from "react";
import "./SelectedProduct.scss";
import { useAppDispatch } from "../../hooks/redux";
import Layout from "../layout/Layout";
import { apiStoreService } from "../../services/apiStoreService";
import { basketSlice } from "../store/reducers/BasketSlice";

const SelectedProduct: FC = () => {
  const dispatch = useAppDispatch();
  const handleAddToBasket = (product: any) => {
    dispatch(basketSlice.actions.addToBasket(product));
  };
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = apiStoreService.useFetchProductByIdQuery(id);
  return (
    <>
      <Layout
        basket={true}
        backButton={true}
        title={product && product[0].name}
      >
        {isLoading && <h1>идет загрузка</h1>}
        {error && <h1>произошла ошибка</h1>}
        <div className="selected-product-container">
          {product && (
            <>
              <img className="image" alt="" src={product[0].image1?.lg} />
              <div className="text-content">
                <h3 className="name">{product[0].name}</h3>
                <p className="price">{product[0].price} руб</p>
                <p className="description">
                  {product[0].description}
                  lfkjgkjldsjfg;lkdsfjg;lsdkjfg;ldsfa.dksfnsa;ldkfn;lkasdnflksadflkdjsflkdjsf
                </p>
                <button onClick={handleAddToBasket} className="add-to-basket">
                  Добавить в корзину
                </button>
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default SelectedProduct;
