import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../routes";

const AppRouter: FC = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} key={path} />
      ))}
      <Route path="*" element={<Navigate to="/categories" />} />
    </Routes>
  );
};
export default AppRouter;
