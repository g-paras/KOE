import Login from "src/accounts/scenes/Login";
import Register from "src/accounts/scenes/Register";
import ProductList from "src/products/scenes/ProductList";
import ProductDetail from "src/products/scenes/ProductDetail";
import CreateProduct from "src/products/scenes/CreateProduct";
import EditProduct from "src/products/scenes/EditProduct";
import { NotFound } from "src/shared/components";

import stateUrls from "./StateUrls";
import commonConstants from "./CommonConstants";

const { PAGE_TITLES } = commonConstants;

const routes = [
  {
    path: stateUrls.LOGIN,
    component: Login,
    guarded: false,
    title: PAGE_TITLES.LOGIN,
  },
  {
    path: stateUrls.REGISTER,
    component: Register,
    guarded: false,
    title: PAGE_TITLES.LOGIN,
  },
  {
    path: stateUrls.PRODUCT_LIST_PAGE,
    component: ProductList,
    guarded: false,
    title: PAGE_TITLES.HOME,
  },
  {
    path: stateUrls.CREATE_PRODUCT,
    component: CreateProduct,
    guarded: true,
    title: PAGE_TITLES.CREATE_PRODUCT,
  },
  {
    path: stateUrls.PRODUCT_DETAIL_PAGE,
    component: ProductDetail,
    guarded: false,
    title: PAGE_TITLES.PRODUCT_DETAIL,
  },
  {
    path: stateUrls.EDIT_PRODUCT,
    component: EditProduct,
    guarded: true,
    title: PAGE_TITLES.EDIT_PRODUCT,
  },
  {
    path: stateUrls.REST,
    component: NotFound,
    guarded: false,
    title: PAGE_TITLES.PAGE_NOT_FOUND,
  },
];

export default routes;
