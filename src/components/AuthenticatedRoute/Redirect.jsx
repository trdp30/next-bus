import React, { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

export const Redirect = () => {
  const { queryParams } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("loaded redirect");

  useEffect(() => {
    if (queryParams?.from) {
      const path = `${queryParams?.from}`;
      navigate(path, { replace: true });
    }
  }, [queryParams?.from]);

  return <div>Redirecting...</div>;
};
