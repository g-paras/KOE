const Loader = () => {
  return (
    <div
      className="fixed-top row justify-content-center h-100"
      style={{ backgroundColor: "white", opacity: "80%" }}
    >
      <div
        className="spinner-grow"
        role="status"
        style={{ marginBlock: "auto" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
