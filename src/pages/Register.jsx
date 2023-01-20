import React from "react";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { RiImageAddFill } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].files[0];
      const fileName = e.target[3].files[0].name;
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">
          <img id="my_image" src="../../img/logo.png" alt="error" />
        </span>
        <span className="title">Register</span>
        <form method="get" onSubmit={submitHandler}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Your Email</label>
          <input type="text" id="email" name="email" required />
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" name="password" required />
          {/* <input style={{ display: "none" }} type="file" id="file" /> */}
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            id="file"
          />
          <label htmlFor="file">
            <RiImageAddFill size={"4rem"} />
            Profile picture
          </label>
          <button type="submit">SignUp</button>
        </form>
        <p>
          <Link to="/login">Login to an existing account</Link>
        </p>
        {err && <p className="error">Try again with valid credentials</p>}
      </div>
    </div>
  );
};

export default Register;
