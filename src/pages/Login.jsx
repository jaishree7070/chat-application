import React from "react";
import { auth } from "../firebase";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    console.log(email)
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
      console.log(err)
    }
  };

  return (
    
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">
          <img id="my_image" src="../../img/logo.png" alt="error" />
        </span>
        <span className="title">Login</span>
        <form method="get" onSubmit={submitHandler}>
          <div>
            <label htmlFor="email">Your Email</label>
            <input type="text" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Your Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">SignUp</button>
        </form>
        <p>
          <Link to="/register">Register a new account</Link>
        </p>
       {err&&<p className="error">Try again with valid credentials</p>}
      </div>
    </div>
  );
};

export default Login;
