import Header from "src/shared/components/Header/Header";
import BookmarksContainer from "../containers/Bookmarks";

const Bookmarks = () => {
  return (
    <>
      <Header />
      <div className="px-6 lg:mx-5">
        <h1 className="mt-4 mb-3 text-xl font-bold">Bookmarks</h1>
        <BookmarksContainer />
      </div>
    </>
  );
};

export default Bookmarks;
