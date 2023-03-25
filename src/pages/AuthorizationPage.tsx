import { FC } from "react";
import Authorisation from "../components/authorisation/Authorization";
import Layout from "../components/layout/Layout";

const AuthorisationPage: FC = () => {
  return (
    <>
      <Layout basket={false} backButton={true} title="Authorisation">
        <Authorisation />
      </Layout>
    </>
  );
};

export default AuthorisationPage;
