import NotFoundImage from "src/shared/assets/404.gif";

const NotFound = () => {
  return (
    <div>
      <img
        src={NotFoundImage}
        className="d-block mx-auto"
        alt="404 not found"
      />
      <p className="text-center text-2xl font-semibold">The page your are looking for does not exists. Back to home</p>
    </div>
  );
};

export default NotFound;
