import { FC } from "react";
import Layout from "../components/layout/Layout";
import Products from "../components/products/Products";

const ProductsPage: FC = () => {
  return (
    <Layout basket={true} backButton={true} title="products">
      <Products />
    </Layout>
  );
};

export default ProductsPage;
