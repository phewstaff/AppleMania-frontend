import SelectedProduct from "./components/selectedProduct/SelectedProduct";
import AuthorisationPage from "./pages/AuthorizationPage";
import BasketPage from "./pages/BasketPage";
import CategoriesPage from "./pages/CategoriesPage";
import LoadingPage from "./pages/LoadingPage";
import ProductsPage from "./pages/ProductsPage";
import { paths } from "./utils/const";

export const routes = [
  {
    path: paths.CATEGORIES_ROUTE,
    Component: CategoriesPage,
  },
  {
    path: paths.BASKET_ROUTE,
    Component: BasketPage,
  },
  {
    path: paths.PRODUCTS_ROUTE,
    Component: ProductsPage,
  },
  {
    path: paths.AUTHORIZATION_ROUTE,
    Component: AuthorisationPage,
  },
  {
    path: paths.LOADING_ROUTE,
    Component: LoadingPage,
  },
  {
    path: paths.SELECTED_PRODUCT_ROUTE,
    Component: SelectedProduct,
  },
];
