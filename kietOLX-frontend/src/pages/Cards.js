import React, { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import PostContext from "../contexts/PostContext";
import { BASE_URL, PRODUCT_LIST } from "../utils/constants";
import bookmarkOutline from "../images/bookmark-outline.svg";
import bookmark from "../images/bookmark.svg";
import AuthContext from "../contexts/AuthContext";

const Cards = () => {
  const { products, setProducts } = useContext(PostContext);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const controller = new AbortController();
    const config = { signal: controller.signal };

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

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p className="freshr">
        <b>Fresh Recommendations</b>
      </p>
      <div className="bg-light py-5 service-5">
        <div className="container">
          {/* <!-- Row --> */}
          <div className="row">
            {/* <!-- Column --> */}
            {products.map((product) => (
              <div key={product.id} className="col-md-4 wrap-service5-box">
                <div className="card card-shadow border-0 mb-4">
                  <div className="card-body d-flex">
                    <div className="mr-4 mb-2 text-success-gradiant icon-size">
                      <img
                        className="card-image"
                        src={product.image}
                        alt="cooler"
                      />
                    </div>
                    <div className="">
                      <h6 className="font-weight-medium">
                        <Link to={`/product/${product.slug}`} className="linking">
                          <b>{product.title}</b>
                        </Link>
                      </h6>
                      <p className="mt-3">
                        Owner: {product.username}
                        <br />
                        Contact Deatils: <br /> Price: {product.price}
                      </p>
                    </div>
                    <img
                      src={product.bookmarked ? bookmark : bookmarkOutline}
                      alt="login"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="col-md-12 mt-3 text-center">
              <a
                href="/login"
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
