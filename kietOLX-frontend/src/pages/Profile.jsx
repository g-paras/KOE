import React, { useState, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { BASE_URL, GET_PROFILE } from "../utils/constants";
import AuthContext from "../contexts/AuthContext";

const Profile = () => {
  const { token, profileData, setProfileData } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      if (profileData) return;
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      axios
        .get(`${BASE_URL}${GET_PROFILE}`, config)
        .then((resp) => {
          console.log(resp.data);
          setProfileData(resp.data);
        })
        .catch((err) => {
          console.log("fetch-profile", err);
          toast.error("Something went wrong");
        });
    }
    fetchData();
  }, []);

  return (
    <>
      <div>Username: {profileData?.username}</div>
      <div>Email: {profileData?.email}</div>
      <img
        src={profileData?.profile?.image}
        alt={profileData?.username}
        width={100}
        className="rounded-circle"
      />
    </>
  );
};

export default Profile;
