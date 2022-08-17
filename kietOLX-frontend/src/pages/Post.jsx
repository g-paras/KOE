import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Post = () => {
  const [disable, setDisable] = useState(true);
  
  

  //const [category, setCategory] = useState("");

  return (
    
    <div>
      
  <ul className="cards">
  <li  className="card12" onClick={() =>setDisable(false)} > Quantum</li>
  <li className="card12" onClick={() => setDisable(false)} >Lan Cabel</li>
  <li className="card12" onClick={() => setDisable(false)} >Book</li>
  <li className="card12" onClick={() => setDisable(false)} >Notes</li>
  <li className="card12" onClick={() => setDisable(false)} >Lab Coat</li>
  <li className="card12" onClick={() => setDisable(false)} >ED Drafter</li>
  <li className="card12" onClick={() => setDisable(false)} >Scientfic Calculator</li>
  <li className="card12" onClick={() => setDisable(false)} >Cooler</li>
  <li className="card12" onClick={() => setDisable(false)} >Others</li>
</ul>

   <Link to={"/post/attribute"}><button disabled={disable} className="buttonNext"> Next</button></Link>
    </div>
  );
};


export default Post;
