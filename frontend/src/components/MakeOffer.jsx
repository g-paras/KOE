import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { MAKE_OFFER } from "../utils/constants";

const MakeOffer = ({ product_id, is_owner }) => {
  const { token } = useAuth();
  const axios = useAxios(token);

  const [loading, setLoading] = useState(false);

  const makeOffer = async () => {
    const formData = new FormData();
    formData.append("product_id", product_id);

    if (!token) {
      toast.error("You need to login first");
      return;
    }
    setLoading(true);

    await axios
      .post(MAKE_OFFER, formData)
      .then((res) => {
        toast.success(res.data.message);
        console.log(res.data.message);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });

    setLoading(false);
  };

  const button = (
    <button
      type="button"
      onClick={makeOffer}
      className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center"
      disabled={loading}
    >
      {loading && <div className="loader"></div>}
      {loading || "Make Offer"}
    </button>
  );

  return is_owner ? <div></div> : button;
};

export default MakeOffer;
