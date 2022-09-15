import { Link } from "react-router-dom";

import Bookmark from "../components/Bookmark";

const ProductItem = ({ product }) => {
  return (
    <div className="col-md-4 wrap-service5-box">
      <div className="card card-shadow border-0 mb-4">
        <div className="card-body d-flex">
          <div className="mr-4 mb-2 text-success-gradiant icon-size">
            <img className="card-image" src={product.image} alt="cooler" />
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
          <Bookmark bookmarked={product.bookmarked} pk={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
