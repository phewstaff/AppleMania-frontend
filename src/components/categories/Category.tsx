import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiStoreService } from "../../services/apiStoreService";
import "./Categories.scss";
import CategoryDropdown from "./CategoryDropdown";
// import CategoryDropdown from "./CategoryDropdown";

type CategoryProps = {
  //   admin: boolean;
  id: string;
  name: string;
  image: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCurrentCategoryId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
};

const Category: React.FC<CategoryProps> = ({
  id,
  name,
  image,
  setValue,
  setCurrentCategoryId,
  //   admin,
}) => {
  const [deleteCategory, response] =
    apiStoreService.useDeleteCategoryMutation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div key={id} className="category-card">
      <CategoryDropdown
        id={id}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onUpdate={() => {
          setValue(name);
        }}
        onDelete={() => {
          return deleteCategory(id), window.location.reload();
        }}
      />
      {/* {admin && ( */}
      <div
        onClick={() => {
          setCurrentCategoryId(id);
          setIsOpen(true);
        }}
        className="dropdown-dots"
      >
        <div className="dropdown-dot"></div>
        <div className="dropdown-dot"></div>
        <div className="dropdown-dot"></div>
      </div>
      {/* )} */}

      <img
        className="category-image"
        onClick={() => navigate(`/products/category/${id}`)}
        src={`http://localhost:4000/api/` + image}
        alt=""
      />
      <h3 className="category-name">{name}</h3>
    </div>
  );
};

export default Category;
export {};