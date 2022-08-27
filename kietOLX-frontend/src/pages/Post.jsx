import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import CreateAdContext from "../contexts/PostContext";
import { BASE_URL, CATEGORIES, CATEGORY } from "../utils/constants";

const Post = () => {
  const { postAttributes, setPostAttributes } = useContext(CreateAdContext);
  const [disable, setDisable] = useState(postAttributes?.category === "");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      axios
        .get(BASE_URL + CATEGORY)
        .then((res) => setCategories(res.data))
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

  const handleClick = (e) => {
    setPostAttributes({
      ...postAttributes,
      category: e.target.getAttribute("data-category-type"),
    });
    setDisable(false);
  };

  return (
    <div>
      <ul className="cards">
        {categories.map((category) => (
          <li
            className="card12"
            data-category-type={category.type}
            onClick={handleClick}
          >
            {category.type.toUpperCase()}
          </li>
        ))}
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
