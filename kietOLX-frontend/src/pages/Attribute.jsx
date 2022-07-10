const Attribute = () => {
  const styles = {
    main: {
      widht: "100%",
      display: "flex",
      justifyContent: "center",
    },
    wrapper: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
    },
  };

  return (
    <div style={styles.main}>
      <div style={styles.wrapper}>
        <div>
          <h3>Category</h3>
          <label htmlFor="category">Selected Category: </label>
          <input type="text" name="category" />
        </div>
        <div>
          <h3>Details</h3>
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" />
          <br />
          <label htmlFor="description">Description: </label>
          <input type="text" name="description" />
        </div>
        <div>
          <h3>Price</h3>
          <label htmlFor="price">Price: </label>
          <input type="number" name="price" />
        </div>
        <div>
            <h3>Upload Image</h3>
          <input name="image" type="file" />
        </div>
        <div>
            <h3>Review Details</h3>
            {/* todo */}

        </div>
        <button>Post</button>
      </div>
    </div>
  );
};

export default Attribute;
