import { FC } from "react";
import Authorization from "../components/authorization/Authorization";
import Layout from "../components/layout/Layout";

const AuthorizationPage: FC = () => {
  return (
    <>
      <Layout basket={false} backButton={true} title="Authorization">
        <Authorization />
      </Layout>
    </>
  );
};

export default AuthorizationPage;
