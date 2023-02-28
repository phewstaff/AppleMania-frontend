import { FC } from "react";
import Categories from "../components/categories/Categories";
import Layout from "../components/layout/Layout";

const CategoriesPage: FC = () => {
  return (
    <>
      <Layout
        basket={false}
        backButton={false}
        title="сategories"
        children={<Categories />}
      />
    </>
  );
};

export default CategoriesPage;
