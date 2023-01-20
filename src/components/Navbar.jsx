import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { HiOutlineLogout } from "react-icons/hi";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const {currentUser} =useContext(AuthContext)
  return (
    <div className="navbar">
      <span className="logo">
        <img id="my_image" src="../../img/logo2.png" alt="error" />
      </span>
      <div className="user">
        <img src={currentUser.photoURL} alt="userImage" />
        <span className="title">{currentUser.displayName}</span>
        <p type="button" to="/">
        <HiOutlineLogout onClick={()=>{signOut(auth)}} size={'2.5rem'}/>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
