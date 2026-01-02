import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await fetch(BASE_URL + "/profile", {
        credentials: "include",
      });
      const result = await res.json();

      if (!res.ok || result?.error) {
        navigate("/");
        return;
      }

      dispatch(addUser(result.data));
      navigate("/dashboard");
    } catch (err) {
      navigate("/");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Body;
