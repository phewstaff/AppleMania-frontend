import { FC } from "react";
import Authorisation from "../components/authorisation/Authorisation";
import Layout from "../components/layout/Layout";

const AuthorisationPage: FC = () => {
  return (
    <>
      <Layout
        basket={false}
        backButton={true}
        title="Authorisation"
        children={<Authorisation />}
      />
    </>
  );
};

export default AuthorisationPage;
