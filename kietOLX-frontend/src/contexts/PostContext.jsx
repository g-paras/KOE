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
  return (
    <CreateAdContext.Provider value={{ postAttributes, setPostAttributes }}>
      {children}
    </CreateAdContext.Provider>
  );
};

export default CreateAdContext;
