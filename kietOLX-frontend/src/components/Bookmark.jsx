import bookmarkOutline from "../images/bookmark-outline.svg";
import bookmark from "../images/bookmark.svg";

const Bookmark = ({ bookmarked }) => {
  return (
    <img
      src={bookmarked ? bookmark : bookmarkOutline}
      alt="login"
      width={20}
      height={20}
      onClick={() => alert("image clicked")}
    />
  );
};

export default Bookmark;
