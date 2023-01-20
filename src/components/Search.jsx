import {
  collection,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  doc,
  where,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { MdPersonSearch } from "react-icons/md";
import { db } from "../firebase";
const Search = () => {
  const [username, setUsername] = useState("");
  const [err, setErr] = useState(false);
  const [user, setUser] = useState("");
  const [allUsers, fetchedAllUser] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSearchAllKey = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const d = doc.data();
        // setSearches([query].concat(searches))
        fetchedAllUser((allUsers) => allUsers.concat(d));
      });
      console.log("clicked");
    } catch (e) {
      setErr(true);
    }
  };
  const handleSelect = async () => {
    //checks whether the chats exists with the person or not
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    //create if it does'nt
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists())
        //create chats in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      //user chat
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      setErr(true);
    }
    setUser(null);
    setUsername("");
  };
  return (
    <div className="search">
      <div className="searchForm">
        <MdPersonSearch size={"1.8rem"} onClick={handleSearchAllKey} />
        <input
          type="text"
          placeholder="Find your friend"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="userImage" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
      {allUsers?.forEach((obj) => {
        <div className="userChat" onClick={handleSelect}>
          <img src={obj.photoURL} alt="userImage" />
          <div className="userChatInfo">
            <span>{obj.displayName}</span>
          </div>
        </div>;
      })}
    </div>
  );
};

export default Search;
