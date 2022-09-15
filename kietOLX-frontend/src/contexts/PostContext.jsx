import React, { createContext } from "react";
import { useState } from "react";

const CreateAdContext = createContext();

export const CreateAdProvider = ({ children }) => {
  const InitialState = {
    category: "",
    price: "",
    title: "",
    image: "",
    description: "",
    imageUrl: "",
  };
  const [postAttributes, setPostAttributes] = useState(InitialState);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const clearPostAttribute = () => {
    setPostAttributes(InitialState);
  };
  return (
    <CreateAdContext.Provider
      value={{
        postAttributes,
        setPostAttributes,
        products,
        setProducts,
        clearPostAttribute,
        categories,
        setCategories,
      }}
    >
      {children}
    </CreateAdContext.Provider>
  );
};

export default CreateAdContext;
