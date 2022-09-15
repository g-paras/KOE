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
   
    <div className="viewParentDiv">
      <div className="imageShowDiv">
      
        <img src={product?.image} alt={product.title} />
      </div> {" "}
      <div className="rightSection">
        <div className="productDetails">
        <p >&#x20B9; {product.price}</p>
        <div className="make-offer">
        <button type="button" className ="btn btn-outline-success btn-block">Make Offer</button>

        </div>
        <span >Title : {product.title}</span>
        <p> Category : {product.category} </p>
        <span>Posted: {moment(product.created_at).fromNow()}</span>
       </div>
       <div className="productDescription">
            <p className="p-bold">Product Description : </p>
            <p>{product?.description}</p>
            
        </div>
      
          <div className="contactDetails">
            <p className="p-bold">Seller details</p>
            <p>Name : {product?.username}</p>
           
          </div>
        
   </div>
  </div>
   
    
    
  );
};

export default Product;
