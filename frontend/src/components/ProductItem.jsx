import { Link } from "react-router-dom";

import BookmarkIcon from "../components/BookmarkIcon";

const ProductItem = ({ product }) => (
  <div className="col-md-4 wrap-service5-box">
    <div className="card card-shadow border-0 mb-4 product-item">
      <div className="card-body d-flex">
        <div className="mr-4 h-content">
          <img className="card-image" src={product.image} alt="cooler" />
        </div>
        <div className="">
          <h6 className="font-weight-medium">
            <Link to={`/product/${product.slug}`} className="linking">
              <b>{product.title}</b>
            </Link>
          </h6>
          <p style={{fontSize: '15px'}} className="mt-3">
            Owner: {product.username}
            <br />
            Category: {product.category}
            <br />
            Price: {product.price}
          </p>
        </div>
        <BookmarkIcon bookmarked={product.bookmarked} pk={product.id} />
      </div>
    </div>
  </div>
);

export default ProductItem;
