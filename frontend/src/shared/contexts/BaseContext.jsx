import React, { createContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BaseContext = createContext();

export const BaseProvider = ({ children, value }) => {
  return (
    <BaseContext.Provider value={value}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </BaseContext.Provider>
  );
};

export default BaseContext;
