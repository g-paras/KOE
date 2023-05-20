import { useState } from "react";
import { useEffect } from "react";

import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import { GET_MY_ADS } from "../utils/constants";
import ProductItem from "../components/ProductItem";

const MyAds = () => {
  const { token } = useAuth();
  const axios = useAxios(token);

  const [myAds, setMyAds] = useState();

  useEffect(() => {
    axios
      .get(GET_MY_ADS)
      .then((res) => {
        console.log("my-ads", res.data);
        setMyAds(res.data);
      })
      .catch((err) => {
        console.log("my-ads", err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>My ads</h1>
      <div className="container">
        <div className="row">
          {myAds &&
            myAds.map((ad, id) => <ProductItem product={ad} key={id} />)}
        </div>
      </div>
    </div>
  );
};

export default MyAds;
