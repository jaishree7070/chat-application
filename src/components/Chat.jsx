import React, { useContext } from "react";
import { MdVideoCall } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
      {data.user.photoURL && <img id="my_image" src={data.user.photoURL} alt="error" />}
        <span className="info">{data.user?.displayName}</span>
        <div className="chatIcons">
          <MdVideoCall size={"1.8rem"} />
          <IoIosCall size={"1.8rem"} />
          <AiOutlineMail size={"1.8rem"} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
