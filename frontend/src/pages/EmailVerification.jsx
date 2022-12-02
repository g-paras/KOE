import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { BASE_URL, EMAIL_VERIFICATION } from "../utils/constants";

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(BASE_URL + EMAIL_VERIFICATION + token + "/", {
        signal: controller.signal,
      })
      .then((res) => {
        setLoading(false);
        setData(res?.data?.message);
        console.log(res?.data?.message);
        navigate("/login", {
          state: {
            message:
              res.data?.message ||
              "You account has been verified ✅, you can login in now",
          },
          replace: true,
        });
      })
      .catch((err) => {
        if (err.response) {
          console.log(err?.response.data?.message);
          setLoading(false);
          setError(true);
          setData(err?.response?.data?.message);
        } else if (err.request) {
          toast.error("Connection error, Please try later");
        } else {
          setLoading(false);
          setError(true);
          setData("Sorry we are unable to process request at the moment");
        }
      });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [token]);

  return (
    <div>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {error && <p className="text-danger">{data}</p>}
      {!error && data && <p>{data}</p>}
    </div>
  );
};

export default EmailVerification;
