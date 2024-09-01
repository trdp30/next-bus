import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
// import { db } from "../utils/firebase"
import { collection, getDocs } from "firebase/firestore";
const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // const users = collection(db, "user");
    // console.log("users", users)
    // const getUserData = async () => {
    //     try {
    //         const data = await getDocs(users)
    //         console.log("data",data)
    //     } catch (error) {
    //         console.log("error");
    //     }
    // }
    // getUserData();
  }, []);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signout");
        navigate("/signin");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <>
      <div>Dashboard</div>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
};

export default Dashboard;
