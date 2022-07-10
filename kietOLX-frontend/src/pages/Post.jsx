import React from "react";
// import { useState } from "react";
import { Link } from "react-router-dom";

const Post = () => {
  const boxStyle = {
    display: "flex",
    height: "100px",
    width: "100px",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black",
    borderRadius: "5px",
    marginRight: "8px",
    marginBottom: "8px"
  };

  const mainStyle = {
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  }

//   const [category, setCategory] = useState("");

  return (
    <div>
        <h2 align="center">What would you like to sell ?</h2>
    <div style={mainStyle}>
      <div style={boxStyle}>Quantum</div>
      <div style={boxStyle}>Lan Cabel</div>
      <div style={boxStyle}>Book</div>
      <div style={boxStyle}>Notes</div>
    </div>
    <div style={mainStyle}>
      <div style={boxStyle}>Lab Coat</div>
      <div style={boxStyle}>ED Drafter</div>
      <div style={boxStyle}>Scientific Calculator</div>
      <div style={boxStyle}>Cooler</div>
    </div>
    <div style={mainStyle}>
      <div style={boxStyle}>Others</div>
    </div>
    <Link to="/post/attribute">Next</Link>
    </div>
  );
};

export default Post;
