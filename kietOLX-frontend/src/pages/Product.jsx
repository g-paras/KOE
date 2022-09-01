import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

// import Heart from "./Hearts";
import bookmarkOutline from "../images/bookmark-outline.svg";
import bookmark from "../images/bookmark.svg";
import AuthContext from "../contexts/AuthContext";
import { BASE_URL, PRODUCT_GET } from "../utils/constants";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const { token } = useContext(AuthContext);

  useEffect(() => {
    toast.info("Fetching Product, Please wait...");

    const controller = new AbortController();
    const config = { signal: controller.signal };

    if (token) {
      config["headers"] = {
        Authorization: `Token ${token}`,
      };
    }

    axios
      .get(BASE_URL + PRODUCT_GET + productId, config)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        toast.error("Product does not exist");
        console.log(err);
      });

    return () => {
      controller.abort();
    };
  }, [productId, token]);

  return (
    <div className="card-product">
      <div className="favorite">
        <img
          src={product.bookmarked ? bookmark : bookmarkOutline}
          alt="login"
          width={20}
          height={20}
          onClick={() => alert("image clicked")}
        />
      </div>
      <div className="image">
        <img src={product?.image} alt={product.title} />
      </div>
      <div className="content">
        <p className="rate">&#x20B9; {product.price}</p>
        <span className="category"> {product.category} </span>
        <p className="name"> {product.title}</p>
        <p className="description">Description: {product?.description}</p>
        <img
          src={product?.profile_img}
          className="rounded-circle"
          width={50}
          alt=""
        />
        <p className="owner">Owner: {product?.username}</p>
        <div className="date">
          <span>Posted: {moment(product.created_at).fromNow()}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
