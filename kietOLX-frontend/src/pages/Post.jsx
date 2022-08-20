import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CreateAdContext from "../contexts/PostContext";

const Post = () => {
  const { postAttributes, setPostAttributes } = useContext(CreateAdContext);
  const [disable, setDisable] = useState(postAttributes?.category === "");

  const handleClick = (e) => {
    setPostAttributes({
      ...postAttributes,
      category: e.target.getAttribute("data-category-type"),
    });
    // console.log(e.target.getAttribute("data-category-type"));
    setDisable(false);
  };

  return (
    <div>
      <ul className="cards">
        <li className="card12" data-category-type="quantum" onClick={handleClick}>
          Quantum
        </li>
        <li
          className="card12"
          data-category-type="Lan Cabel"
          onClick={handleClick}
        >
          Lan Cabel
        </li>
        <li className="card12" data-category-type="Book" onClick={handleClick}>
          Book
        </li>
        <li className="card12" data-category-type="Notes" onClick={handleClick}>
          Notes
        </li>
        <li
          className="card12"
          data-category-type="Lab Coat"
          onClick={handleClick}
        >
          Lab Coat
        </li>
        <li
          className="card12"
          data-category-type="ED Drafter"
          onClick={handleClick}
        >
          ED Drafter
        </li>
        <li
          className="card12"
          data-category-type="Scientfic Calculator"
          onClick={handleClick}
        >
          Scientfic Calculator
        </li>
        <li className="card12" data-category-type="Cooler" onClick={handleClick}>
          Cooler
        </li>
        <li className="card12" data-category-type="Others" onClick={handleClick}>
          Others
        </li>
      </ul>

      <Link to={"/post/attribute"}>
        <button disabled={disable} className="buttonNext">
          {" "}
          Next
        </button>
      </Link>
    </div>
  );
};

export default Post;
