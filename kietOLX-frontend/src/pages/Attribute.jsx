import React, { useContext, useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { BASE_URL, PRODUCT_CREATE } from "../utils/constants";
import AuthContext from "../contexts/AuthContext";
import CreateAdContext from "../contexts/PostContext";

const Attribute = () => {
  const { token } = useContext(AuthContext);
  const { postAttributes, setPostAttributes, clearPostAttribute } =
    useContext(CreateAdContext);
  const [formError, setFormError] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
  });

  const validateForm = () => {
    let is_valid = true;
    const errors = { ...formError };
    if (postAttributes.title.trim().length < 10) {
      errors.title = "Title should be atleast 10 letter";
      is_valid = false;
    } else if (postAttributes.title.trim().length > 50) {
      errors.title = "Title can not be more than 50 letters";
      is_valid = false;
    }

    if (postAttributes.description.trim().length < 50) {
      errors.description = "Description must be atleat 50 letters";
      is_valid = false;
    } else if (postAttributes.description.trim().length > 250) {
      errors.description = "Description can not be more than 250 letters";
      is_valid = false;
    }

    if (postAttributes.price < 10 || postAttributes.price > 5000) {
      errors.price = "Price must be inbetween 10 & 5000";
      is_valid = false;
    }

    setFormError(errors);
    return is_valid;
  };

  const btnRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image")
      setPostAttributes({
        ...postAttributes,
        [e.target.name]: e.target.files[0],
        imageUrl: e.target.value,
      });
    else
      setPostAttributes({ ...postAttributes, [e.target.name]: e.target.value });
    setFormError((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("clicked");
    btnRef.current.disabled = true;
    btnRef.current.innerHTML = "processing...";
    toast.info("Processing data");

    // todo: form validation
    if (!validateForm()) {
      toast.error("Invalid form data");
      btnRef.current.disabled = false;
      btnRef.current.innerHTML = "Post";
      return;
    }

    await axios
      .post(
        `${BASE_URL}${PRODUCT_CREATE}`,
        {
          ...postAttributes,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log("success post create", res.data);
        toast.success("Ad created successfully");
        navigate(`/product/${res.data.slug}`);
        clearPostAttribute();
      })
      .catch((err) => {
        console.log("post creation error", err);
        toast.error("Server Error");
      });

    btnRef.current.disabled = false;
    btnRef.current.innerHTML = "Post";
  };

  return (
    <div className="mycard">
      <form onSubmit={handleSubmit}>
        <div className="card auth-card input-field">
          <div className="input-group1">
            <h3>Category</h3>
            <label htmlFor="category">Selected Category: </label>
            <input
              type="text"
              name="category"
              value={postAttributes.category}
              onChange={handleChange}
              // className={`${fo}`}
            />
          </div>
          <div className="input-group1">
            <h3>Details</h3>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              value={postAttributes.title}
              onChange={handleChange}
              maxLength={50}
            />
            <div className="text-danger">{formError.title}</div>
            <br />
            <span>{postAttributes.title.trim().length} / 50</span>
            <br />
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              name="description"
              value={postAttributes.description}
              onChange={handleChange}
              maxLength={250}
            />
            <div className="text-danger">{formError.description}</div>
            <br />
            <span>{postAttributes.description.trim().length} / 250</span>
          </div>
          <div className="input-group1">
            <h3>Price</h3>
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              name="price"
              value={postAttributes.price}
              onChange={handleChange}
              min={0}
              max={10000}
            />
          </div>
          <div className="input-group1">
            <h3>Upload Image</h3>
            <input
              name="image"
              type="file"
              // value={}
              accept="image/png, image/jpeg"
              onChange={handleChange}
            />
            {postAttributes.image && (
              <img src={URL.createObjectURL(postAttributes.image)} alt="" />
            )}
          </div>
          <button type="submit" ref={btnRef} className="primary1">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Attribute;
