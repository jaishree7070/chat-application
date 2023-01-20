import React, { useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  //to view the current message with scrolling effect
  // const ref = useRef();
  // useEffect(()=>{
  //   ref.current?.scrollInView({behaviour:"smooth"});
  // },[message])
  return (
    <div
      // ref={ref}
      className={`message ${props.message.senderId == currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            props.message.senderId == currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="error"
        />
        {/* <span>{props.date}</span> */}
      </div>
      <div className="messageContent">
        <p>{props.text}</p>
        {props.message.img && <img src={props.message.img} alt="error" />}
      </div>
    </div>
  );
};

export default Message;
