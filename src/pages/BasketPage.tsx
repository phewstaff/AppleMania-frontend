import { FC } from "react";
import Basket from "../components/basket/Basket";
import Layout from "../components/layout/Layout";

const BasketPage: FC = () => {
  return (
    <>
      <Layout basket={false} backButton={true} title="Basket">
        <Basket />
      </Layout>
    </>
  );
};

export default BasketPage;
