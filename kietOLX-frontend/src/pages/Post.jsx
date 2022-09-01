import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import CreateAdContext from "../contexts/PostContext";
import { BASE_URL, CATEGORY } from "../utils/constants";

const Post = () => {
  const { postAttributes, setPostAttributes, categories, setCategories } =
    useContext(CreateAdContext);
  const [disable, setDisable] = useState(postAttributes?.category === "");

  useEffect(() => {
    async function fetchData() {
      if (categories.length !== 0) return;
      axios
        .get(BASE_URL + CATEGORY)
        .then((res) => setCategories(res.data))
        .catch((err) => console.log(err));
    }
    fetchData();
    // eslint-disable-next-line
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
      {/* categories of ad  */}
      <ul className="cards">
        {categories.map((category, id) => (
          <li
            key={id}
            className="card12"
            data-category-type={category.type}
            onClick={handleClick}
          >
            {category.type.toUpperCase()}
          </li>
        ))}
      </ul>

      {/* next button */}
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
