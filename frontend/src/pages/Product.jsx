import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

import MakeOffer from "../components/MakeOffer";
import BookmarkIcon from "../components/BookmarkIcon";
import AuthContext from "../contexts/AuthContext";
import { BASE_URL, PRODUCT_GET } from "../utils/constants";
import Loader from "../components/Loader";

const Product = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState();
  const [apiLoading, setApiLoading] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!apiLoading) {
      const config = {};

      if (token) {
        config["headers"] = {
          Authorization: `Token ${token}`,
        };
      }
      setApiLoading(true);
      axios
        .get(`${BASE_URL}${PRODUCT_GET}${productId}/`, config)
        .then((res) => {
          console.log(res.data);
          setProduct(res.data);
          setApiLoading(false);
        })
        .catch((err) => {
          toast.error("Product does not exist");
          console.log(err);
          setApiLoading(false);
        });
    }
  }, [productId, token]);

  return (
    <>
      {product && !apiLoading ? (
        <div className="viewParentDiv mx-4 mb-4">
          <div className="imageShowDiv border mr-4">
            <img src={product?.image} alt={product.title} height={400} />
          </div>
          <div className="rightSection">
            <div className="mb-2 d-flex self-end">
              {/* <button
                className="btn btn-secondary btn-sm active ml-auto mr-2"
                aria-pressed="true"
              >
                Mark Sold
              </button>
              <button className="btn btn-danger btn-sm active" aria-pressed="true">
                Delete
              </button> */}
            </div>
            <div className="productDetails rounded">
              <div className="d-flex justify-content-between mb-0">
                <p>&#x20B9; {product.price}</p>
                <BookmarkIcon bookmarked={product.bookmarked} pk={product.id} />
              </div>
              <div className="make-offer">
                <MakeOffer
                  product_id={product.id}
                  is_owner={product.is_owner}
                />
              </div>
              <span>Title : {product.title}</span>
              <p> Category : {product.category} </p>
              <span>Posted: {moment(product.created_at).fromNow()}</span>
            </div>
            <div className="productDescription rounded">
              <p className="p-bold">Product Description : </p>
              <p>{product?.description}</p>
            </div>

            <div className="contactDetails rounded">
              <p className="p-bold">Seller details</p>
              <p>Name : {product?.username}</p>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Product;
