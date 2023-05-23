import { useNavigate, useParams } from "react-router-dom";
import { FC } from "react";
import "./SelectedProduct.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Layout from "../layout/Layout";
import { apiStoreService } from "../../services/apiStoreService";
import { basketSlice } from "../../store/reducers/BasketSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../consts";

const updateProductFormSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    price: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

type FormData = yup.InferType<typeof updateProductFormSchema>;

const SelectedProduct: FC = () => {
  const [updatePost] = apiStoreService.useUpdateProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(updateProductFormSchema),
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const handleAddToBasket = (product: any) => {
    dispatch(basketSlice.actions.addToBasket(product[0]));
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
    refetch: invalidateProduct,
    data: product,
    isLoading,
    error,
  } = apiStoreService.useFetchProductByIdQuery(id);

  const submitUpdateForm = (data: FormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    updatePost({ formData, id })
      .unwrap()
      .then((response) => {
        if (response) {
          invalidateProduct();
        }
      })
      .catch((error) => {});
  };

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
              <div className="carousel">
                <div className="images-container">
                  <img alt="1" src={baseUrl + product[0].previewImage?.lg} />
                  <img alt="2" src={baseUrl + product[0].image1?.lg} />
                  <img alt="3" src={baseUrl + product[0].image2?.lg} />
                  <img alt="4" src={baseUrl + product[0].image3?.lg} />
                </div>
              </div>

              <div className="text-content">
                <h3 className="name">{product[0].name}</h3>
                <p className="price">{product[0].price} руб</p>
                <p className="description">{product[0].description}</p>
                {admin ? (
                  <button
                    onClick={handleDeleteProduct}
                    className="add-to-basket"
                  >
                    Delete product
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      dispatch(basketSlice.actions.addToBasket(product[0]))
                    }
                    className="add-to-basket"
                  >
                    Add to basket
                  </button>
                )}
              </div>
              {admin && (
                <form onSubmit={handleSubmit(submitUpdateForm)}>
                  <input
                    onChangeCapture={(e) => {}}
                    {...register("name")}
                    type="text"
                    defaultValue={product[0].name}
                  />

                  <input
                    {...register("price")}
                    type="text"
                    defaultValue={product[0].price}
                  />

                  <input
                    {...register("description")}
                    type="text"
                    defaultValue={product[0].description}
                  />

                  <button onClick={() => submitUpdateForm} type="submit">
                    Update Product
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default SelectedProduct;
