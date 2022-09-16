import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import noProduct from "../images/product-not-found.jpg";
import ProductItem from "../components/ProductItem";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { SEARCH } from "../utils/constants";

export default function ProductSearch() {
  const { query } = useParams();
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();
  const axios = useAxios(token);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${SEARCH}${query}/`)
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        toast("Something went wrong");
        console.log(err);
      });
    setLoading(false);
  }, [query, axios]);

  return (
    <div>
      {loading && <div className="loader"></div>}
      {result &&
        result.map((item, id) => <ProductItem key={id} product={item} />)}
      <div className="text-center">
        {!loading && result && !result.length && <img src={noProduct} alt="" />}
      </div>
    </div>
  );
}
