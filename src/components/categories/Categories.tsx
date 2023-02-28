import { apiStoreService } from "../../services/apiStoreService";
import "./Categories.scss";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "../../hooks/redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Category from "./Category";

const categoryFormSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    image: yup.mixed().required(),
  })
  .required();
type FormData = yup.InferType<typeof categoryFormSchema>;

const Categories: React.FC = () => {
  //   const admin = useAppSelector((state) => {
  //     return state.authReducer.admin;
  //   });
  const [value, setValue] = useState<string | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files![0]);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(categoryFormSchema),
  });
  const [currentCategoryId, setCurrentCategoryId] = useState<
    string | undefined
  >();
  const [postCategory, { isError }] =
    apiStoreService.useCreateCategoryMutation();
  const [updateCategory, { isError: updateError }] =
    apiStoreService.useUpdateCategoryMutation();

  const addOrUpdateCategory = async (data: FormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", selectedFile as File);

    if (currentCategoryId) {
      await updateCategory({ currentCategoryId, formData });
    } else {
      await postCategory(formData);
    }

    setCurrentCategoryId(undefined);
    invalidateCategories();
  };

  const {
    refetch: invalidateCategories,
    data: categories,
    isLoading,
    error,
  } = apiStoreService.useFetchCategoriesQuery();

  return (
    <>
      <ToastContainer position="bottom-right" />
      <div className="categories-container">
        {/* {admin && ( */}
        <div className="add-category">
          <input
            value={value}
            onChangeCapture={(e) => {
              setValue(e.currentTarget.value);
            }}
            {...register("name")}
            placeholder="Name"
            className="category-name-input"
          ></input>
          <label className="choose-image">
            Choose image
            <input
              {...register("image")}
              onChange={handleFileChange}
              name="image"
              type="file"
              className="choose-image-input"
            />
          </label>
          <label
            className="submit-button"
            onClick={handleSubmit(addOrUpdateCategory)}
          >
            Post category
          </label>
        </div>
        {/* )} */}
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>Error</h1>}
        {categories &&
          categories.map((item) => {
            return (
              <Category
                // admin={admin}
                setValue={setValue}
                key={item._id}
                id={item._id}
                name={item.name}
                image={item.image}
                setCurrentCategoryId={setCurrentCategoryId}
              />
            );
          })}
      </div>
    </>
  );
};

export default Categories;
export {};
