import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import CreateAdContext from "../contexts/PostContext";
import { BASE_URL, CATEGORY } from "../utils/constants";
import Loader from "../components/Loader";

const Post = () => {
  const { postAttributes, setPostAttributes, categories, setCategories } =
    useContext(CreateAdContext);
  // const [disable, setDisable] = useState(postAttributes?.category === "");
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (categories.length !== 0) return;
      setApiLoading(true);
      axios
        .get(BASE_URL + CATEGORY)
        .then((res) => {
          setCategories(res.data);
          setApiLoading(false);
        })
        .catch((err) => {
          setApiLoading(false);
        });
    }
    if (!apiLoading) fetchData();
  }, [setCategories]);

  const [selectElement, setSelectElement] = useState(0);

  const handleClick = (type) => {
    setSelectElement(type);
    setPostAttributes({
      ...postAttributes,
      category: type,
    });
    // setDisable(false);
  };

  return (
    <div>
      {apiLoading && <Loader />}
      {/* categories of ad  */}
      <ul className="cards">
        {categories.map((category, id) => (
          <button
            className="select-button"
            onClick={() => handleClick(category.type)}
            data-category-type={category.type}
            key={id}
          >
            {selectElement === category.type ? "✓" : ""}
            <li className="card12">{category.type.toUpperCase()}</li>
          </button>
        ))}
      </ul>

      {/* next button */}
      {!apiLoading && (
        <Link to={"/post/attribute"}>
          <button disabled={!postAttributes?.category} className="buttonNext">
            {" "}
            Next
          </button>
        </Link>
      )}
    </div>
  );
};

export default Post;
