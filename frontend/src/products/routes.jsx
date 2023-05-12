import { Routes, Route } from "react-router";
import React from "react";

import Bookmark from "src/pages/Bookmark";
import Attribute from "src/pages/Attribute";
import RequireAuth from "src/routes/RequireAuth";
import ProductSearch from "src/pages/ProductSearch";
import Post from "src/pages/Post";
import Cards from "src/pages/Cards";
import MyAds from "src/pages/MyAds";
import Product from "src/pages/Product";
import Profile from "src/pages/Profile";

const ProductsRoutes = () => {
  return (
    <Route>
      <Route path="" element={<Cards />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/product/search/:query" element={<ProductSearch />} />
      <Route element={<RequireAuth />}>
        <Route element={<Post />} path="/post" />
        <Route element={<MyAds />} path="/my-ads" />
        <Route element={<Bookmark />} path="/bookmarks" />
        <Route element={<Attribute />} path="/post/attribute" />
        <Route element={<Profile />} path="/profile" />
      </Route>
    </Route>
  );
};

export default ProductsRoutes;
