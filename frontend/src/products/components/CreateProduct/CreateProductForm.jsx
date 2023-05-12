import React, { useContext, useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { BASE_URL, PRODUCT_CREATE } from "src/utils/constants";
import AuthContext from "src/contexts/AuthContext";
import CreateAdContext from "src/contexts/PostContext";
import FormField from "src/shared/components/FormField";
import ChoiceField from "src/shared/components/ChoiceField";
import commonConstants from "src/products/constants/CommonConstants";
import TextArea from "src/shared/components/TextArea";

const { categories } = commonConstants;

const CreateProductForm = () => {
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
      <div className="card auth-card input-field">
        <div className="input-group1">
          <ChoiceField label='Category' name='category' choices={categories} required />
        </div>
        <div className="input-group1">
          <FormField
            name="title"
            placeholder="Enter title"
            label="Title"
            type="text"
            required
          />
          <TextArea
            name="description"
            placeholder="Enter description"
            label="Description"
            type="text"
            rows={5}
            required
          />
        </div>
        <div className="input-group1">
          <FormField
            name="price"
            placeholder="Enter Price"
            label="Price"
            type="number"
            required
          />
          <FormField
            name="image"
            label="Upload Image"
            type="file"
            accept="image/png, image/jpeg"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProductForm;
