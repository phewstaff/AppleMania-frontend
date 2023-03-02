import { useNavigate, useParams } from "react-router-dom";
import { FC, useState } from "react";
import "./SelectedProduct.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Layout from "../layout/Layout";
import { apiStoreService } from "../../services/apiStoreService";
import { basketSlice } from "../store/reducers/BasketSlice";
import { IProduct } from "../../types/dataTypes";

interface IProps {
  productToUpdate?: IProduct | null;
}
const SelectedProduct: FC<IProps> = (productToUpdate) => {
  console.log(productToUpdate);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const handleAddToBasket = (product: any) => {
    dispatch(basketSlice.actions.addToBasket(product));
  };
  const [deleteProduct, { isLoading: loading }] =
    apiStoreService.useDeleteProductMutation();
  const handleDeleteProduct = () => {
    deleteProduct(id);
    navigate(-1);
  };
  const admin = useAppSelector((state) => {
    return state.auth.admin;
  });
  const {
    data: product,
    isLoading,
    error,
  } = apiStoreService.useFetchProductByIdQuery(id);
  const [formData, setFormData] = useState<IProduct>();
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
              <img
                className="image"
                alt=""
                src={`http://localhost:4000/api/` + product[0].previewImage?.lg}
              />
              <div className="text-content">
                <h3 className="name">{product[0].name}</h3>
                <p className="price">{product[0].price} руб</p>
                <p className="description">
                  {product[0].description}
                  lfkjgkjldsjfg;lkdsfjg;lsdkjfg;ldsfa.dksfnsa;ldkfn;lkasdnflksadflkdjsflkdjsf
                </p>
                {admin ? (
                  <button
                    onClick={handleDeleteProduct}
                    className="add-to-basket"
                  >
                    Delete product
                  </button>
                ) : (
                  <button onClick={handleAddToBasket} className="add-to-basket">
                    Add to basket
                  </button>
                )}
              </div>
              {/* {admin && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input {...register("name")} type="text" />
                  <input {...register("price")} type="number" />
                  <input {...register("description")} type="text" />

                  <button type="submit">Update Product</button>
                </form>
              )} */}
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default SelectedProduct;
