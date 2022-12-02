import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

import ProductItem from "../components/ProductItem";
import { GET_BOOKMARKS } from "../utils/constants";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

const Bookmark = () => {
  const { token } = useAuth();
  const axios = useAxios(token);

  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    axios
      .get(GET_BOOKMARKS)
      .then((res) => {
        setBookmarks(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h2>Bookmarked Items</h2>
      <div>
        {bookmarks.map((bookmark, id) => (
          <ProductItem key={id} product={bookmark} />
        ))}
      </div>
    </>
  );
};

export default Bookmark;
