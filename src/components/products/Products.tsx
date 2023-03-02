import { FC, useEffect, useState } from "react";
import "./Products.scss";
import { useNavigate, useParams } from "react-router-dom";
import { apiStoreService } from "../../services/apiStoreService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../hooks/redux";
import { IProduct } from "../../types/dataTypes";
import SelectedProduct from "../selectedProduct/SelectedProduct";

const productFormSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    price: yup.string().required(),
    description: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof productFormSchema>;

const Products: FC = () => {
  const admin = useAppSelector((state) => {
    return state.auth.admin;
  });
  const [selectedPreviewFile, setPreviewFile] = useState<File | null>(null);
  const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
  const [selectedFile3, setSelectedFile3] = useState<File | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunc: React.Dispatch<React.SetStateAction<File | null>>
  ): void => {
    setFunc(event.target.files![0]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(productFormSchema),
  });
  const { id } = useParams();
  const [postProduct, { isError }] = apiStoreService.useCreateProductMutation();
  const submitForm = async (data: FormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("previewImage", selectedPreviewFile as File);
    formData.append("image1", selectedFile1 as File);
    formData.append("image2", selectedFile2 as File);
    formData.append("image3", selectedFile3 as File);
    formData.append("categoryId", id as string);
    console.log("submittim");
    await postProduct(formData);
    invalidateProducts();
  };
  const navigate = useNavigate();
  const {
    refetch: invalidateProducts,
    data: products,
    isLoading,
    error,
  } = apiStoreService.useFetchProductsByCategoryIdQuery(id);
  useEffect(() => {
    invalidateProducts();
  }, []);

  return (
    <>
      <div className="products-page-container">
        {isLoading && <h1>идет загрузка</h1>}
        {error && <h1>это ошибка</h1>}
        {admin && (
          <div className="add-product">
            <input
              {...register("name")}
              placeholder="Name"
              className="product-input"
              type="text"
            ></input>
            <input
              {...register("price")}
              placeholder="Price"
              type="text"
              className="product-input"
            ></input>
            <textarea
              placeholder="Description"
              {...register("description")}
              name="description"
              className="product-input"
            />
            <label className="choose-image">
              Choose preview image
              <input
                onChange={(event) => handleFileChange(event, setPreviewFile)}
                name="image"
                type="file"
                className="choose-image-input"
              />
            </label>
            <label className="choose-image">
              Choose image 1
              <input
                onChange={(event) => handleFileChange(event, setSelectedFile1)}
                name="image"
                type="file"
                className="choose-image-input"
              />
            </label>
            <label className="choose-image">
              Choose image 2
              <input
                onChange={(event) => handleFileChange(event, setSelectedFile2)}
                name="image"
                type="file"
                className="choose-image-input"
              />
            </label>
            <label className="choose-image">
              Chosse image 3
              <input
                onChange={(event) => handleFileChange(event, setSelectedFile3)}
                name="image"
                type="file"
                className="choose-image-input"
              />
            </label>
            <label className="submit-button" onClick={handleSubmit(submitForm)}>
              Post Product
            </label>
          </div>
        )}
        <div className="product-container">
          {products &&
            products.map((item) => {
              console.log(item);
              return (
                <>
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(`/product/${item._id}`);
                      setSelectedProduct(item);
                      console.log(selectedProduct);
                    }}
                    className="product-card"
                  >
                    <img
                      src={`http://localhost:4000/api/` + item.previewImage?.lg}
                    />
                    <h3 className="product-name">{item.name}</h3>
                    <p className="price">{item.price} руб</p>
                  </div>
                </>
              );
            })}
          {selectedProduct && (
            <SelectedProduct productToUpdate={selectedProduct} />
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
export {};
