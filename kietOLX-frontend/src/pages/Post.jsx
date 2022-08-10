import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Post = () => {
  const [disable, setDisable] = React.useState(true);
  
  

  //const [category, setCategory] = useState("");

  return (
    
    <div>
      
  <ul class="cards">
  <li  class="card12" onClick={() =>setDisable(false)} > Quantum</li>
  <li class="card12" onClick={() => setDisable(false)} >Lan Cabel</li>
  <li class="card12" onClick={() => setDisable(false)} >Book</li>
  <li class="card12" onClick={() => setDisable(false)} >Notes</li>
  <li class="card12" onClick={() => setDisable(false)} >Lab Coat</li>
  <li class="card12" onClick={() => setDisable(false)} >ED Drafter</li>
  <li class="card12" onClick={() => setDisable(false)} >Scientfic Calculator</li>
  <li class="card12" onClick={() => setDisable(false)} >Cooler</li>
  <li class="card12" onClick={() => setDisable(false)} >Others</li>
</ul>

   <Link to={"/post/attribute"}><button disabled={disable} className="buttonNext"> Next</button></Link>
    </div>
  );
};


export default Post;
