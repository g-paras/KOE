import React, { createContext } from "react";
import { useState } from "react";

const CreateAdContext = createContext();

export const CreateAdProvider = ({ children }) => {
  const [postAttributes, setPostAttributes] = useState({
    category: "",
    price: "",
    title: "",
    image: "",
    description: "",
    imageUrl: "",
  });
  const [products, setProducts] = useState([]);

  return (
    <CreateAdContext.Provider
      value={{ postAttributes, setPostAttributes, products, setProducts }}
    >
      {children}
    </CreateAdContext.Provider>
  );
};

export default CreateAdContext;
