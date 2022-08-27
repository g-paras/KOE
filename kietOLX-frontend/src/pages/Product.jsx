import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

import { BASE_URL, PRODUCT_GET } from "../utils/constants";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    function fetchData() {
      toast.info("Fetching Product, Please wait...");
      axios
        .get(BASE_URL + PRODUCT_GET + productId)
        .then((res) => {
          console.log(res.data);
          setProduct(res.data);
        })
        .catch((err) => {
          toast.error("Product does not exist");
          console.log(err);
        });
    }
    fetchData();
  }, []);

  return (
    <div className="col-sm-12 col-md-8">
      <img src={product?.image} alt={product.title} />
      <div className="card-body">
        Category: {product?.category} <br />
        Title: {product?.title} <br />
        <img
          src={product?.profile_img}
          className="rounded-circle"
          width={50}
          alt=""
        />
        Owner: {product?.username} <br />
        Description: {product?.description} <br />
        Price: {product?.price} <br />
        Posted: {moment(product.created_at).fromNow()}
      </div>
    </div>
  );
};

export default Product;
