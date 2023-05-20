import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";

import ProductItem from "../components/ProductItem";
import AuthContext from "../contexts/AuthContext";
import PostContext from "../contexts/PostContext";
import { BASE_URL, PRODUCT_LIST } from "../utils/constants";
import Loader from "../components/Loader";

const Cards = () => {
  const { products, setProducts } = useContext(PostContext);
  const { token } = useContext(AuthContext);
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    const config = {};

    if (token) {
      config["headers"] = {
        Authorization: `Token ${token}`,
      };
    }
    if (!apiLoading && products.length===0) {
      setApiLoading(true);
      axios
        .get(BASE_URL + PRODUCT_LIST, config)
        .then((res) => {
          setProducts(res.data);
          setApiLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setApiLoading(false);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p className="freshr">
        <b>Fresh Recommendations</b>
      </p>
      <div className="bg-light py-5 service-5">
        <div className="container">
          <div className="row">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}

            {apiLoading && <Loader />}
          </div>
          {/* uncomment when pagination is implemented */}
          {/* {!apiLoading && (
            <div className="col-md-12 mt-3 text-center">
              <a
                href="#loadmore"
                className="btn btn-success-gradiant btn-md border-0 text-white"
              >
                <span>View More</span>
              </a>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Cards;
