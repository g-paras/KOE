const Attribute = () => {
  

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <div className="input-group1">
          <h3>Category</h3>
          <label htmlFor="category" >Selected Category: </label>
          <input type="text" name="category" />
        </div>
        <div className="input-group1"> 
          <h3>Details</h3>
          <label htmlFor="title" >Title: </label>
          <input type="text" name="title" />
          <br />
          <label htmlFor="description" >Description: </label>
          <input type="text" name="description" />
        </div>
        <div className="input-group1">
          <h3 >Price</h3>
          <label htmlFor="price" >Price: </label>
          <input type="number" name="price" />
        </div>
        <div className="input-group1">
            <h3>Upload Image</h3>
          <input name="image" type="file" />
        </div>
        <div className="input-group1">
            <h3>Review Details</h3>
            {/* todo */}

        </div>
        <button className="primary1">Post</button>
      </div>
    </div>
  );
};

export default Attribute;
