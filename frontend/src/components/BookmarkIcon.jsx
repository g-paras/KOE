import { useState } from "react";

import bookmarkOutline from "../images/bookmark-outline.svg";
import bookmark from "../images/bookmark.svg";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";
import { BOOKMARK } from "../utils/constants";

const Bookmark = ({ bookmarked, pk }) => {
  const { token } = useAuth();
  const axios = useAxios(token);

  const [_bookmark, setBookmark] = useState(bookmarked);

  const addRemoveBookmark = () => {
    
    if (!token) {
      toast.error("You need to login first");
      return;
    }
    
    setBookmark(prev => !prev);
    const formData = new FormData();
    formData.append("product", pk);
    axios
      .post(BOOKMARK, formData)
      .then((res) => {
        const value = res.data["value"];
        setBookmark(value);
        if (value) toast.success("Bookmark added");
        else toast.success("Bookmark removed");
      })
      .catch((err) => {
        setBookmark(bookmarked);
        toast.error("Something went wrong");
      });
  };

  return (
    <img
      style={{ cursor: "pointer" }}
      src={_bookmark ? bookmark : bookmarkOutline}
      alt="login"
      width={20}
      height={20}
      onClick={addRemoveBookmark}
    />
  );
};

export default Bookmark;
