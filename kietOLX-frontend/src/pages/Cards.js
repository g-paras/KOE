import React, { useEffect } from "react";
import { useContext } from "react";
import axios from "axios";

import ProductItem from "../components/ProductItem";
import AuthContext from "../contexts/AuthContext";
import PostContext from "../contexts/PostContext";
import { BASE_URL, PRODUCT_LIST } from "../utils/constants";

const Cards = () => {
  const { products, setProducts } = useContext(PostContext);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const config = {};

    if (token) {
      config["headers"] = {
        Authorization: `Token ${token}`,
      };
    }

    axios
      .get(BASE_URL + PRODUCT_LIST, config)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

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

            <div className="col-md-12 mt-3 text-center">
              <a
                href="#loadmore"
                className="btn btn-success-gradiant btn-md border-0 text-white"
              >
                <span>View More</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
