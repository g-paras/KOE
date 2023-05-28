import Login from "src/accounts/scenes/Login";
import Register from "src/accounts/scenes/Register";
import ProductList from "src/products/scenes/ProductList";
import ProductDetail from "src/products/scenes/ProductDetail";
import CreateProduct from "src/products/scenes/CreateProduct";
import EditProduct from "src/products/scenes/EditProduct";
import EmailVerification from "src/accounts/scenes/EmailVerification";
import ResendEmailVerification from "src/accounts/scenes/ResendEmailVerification";
import { NotFound } from "src/shared/components";

import stateUrls from "./StateUrls";
import commonConstants from "./CommonConstants";
import MyAds from "src/products/scenes/MyAds";
import Bookmarks from "src/products/scenes/Bookmarks";
import EditProfile from "src/accounts/scenes/EditProfile";

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
    path: stateUrls.EMAIL_VERIFICATION,
    component: EmailVerification,
    guarded: false,
    title: PAGE_TITLES.EMAIL_VERIFICATION,
  },
  {
    path: stateUrls.RESEND_EMAIL_VERIFICATION,
    component: ResendEmailVerification,
    guarded: false,
    title: PAGE_TITLES.RESEND_EMAIL_VERIFICATION,
  },
  {
    path: stateUrls.MY_PROFILE,
    component: EditProfile,
    guarded: true,
    title: PAGE_TITLES.EDIT_PROFILE,
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
    path: stateUrls.MY_ADS,
    component: MyAds,
    guarded: true,
    title: PAGE_TITLES.MY_ADS,
  },
  {
    path: stateUrls.BOOKMARKS,
    component: Bookmarks,
    guarded: true,
    title: PAGE_TITLES.BOOKMARKS,
  },
  {
    path: stateUrls.REST,
    component: NotFound,
    guarded: false,
    title: PAGE_TITLES.PAGE_NOT_FOUND,
  },
];

export default routes;
