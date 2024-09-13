import {
  InfoCircleFilled,
  VideoCameraFilled,
  PhoneFilled,
  PictureFilled,
  SendOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, Space } from "antd";
import { useContext, useEffect, useRef, useState } from "react";

import moment from "moment";
import io from "socket.io-client";
import { getUser } from "../../helpers/helper";
import {
  getChatUsers,
  getMessages,
  saveMessageToDb,
  updatePreviousMsg,
} from "../../services/api";
import { dataContext } from "../../App";
const socket = io(`${process.env.REACT_APP_BASEURL}`, {
  transports: ["websocket"],
});

function Chat({ chatId }: any) {
  // chatId contain id of the selected chat user
  interface Message {
    msg: string;
    timestamp: string;
    user: Number;
    isRead: boolean;
  }

  const { setChatuser, setUpdateMsg }: any = useContext(dataContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [msg, setMsg] = useState("");
  const [chatUsers, setChatUsers]: any = useState([]);
  const newchatId: any = useRef();
  const chatBox: any = useRef();

  const saveMessage = async (message: any, type: string) => {
    // create a msgPacket to send to DB
    const msgPacket = {
      sender: getUser().id,
      receiver: chatId.id,
      msg: message,
      firstTime: false,
    };

    // if this is the first time sending message to user mark firstTime flag true (for db)
    messages.length === 0 && (msgPacket.firstTime = true);

    console.log(message.isRead);
    // Save message packet to DB (Update previous one or insert/update new)
    if (type === "add") {
      await saveMessageToDb(msgPacket);
    } else {
      //update Message to mark Isread true
      await updatePreviousMsg(msgPacket);
      setUpdateMsg({ id: chatId.id, msg: message.msg });
    }
  };

  const _getMessages = async () => {
    const data = await getMessages({
      sender: chatId.id,
      receiver: getUser().id,
    });

    console.log(data);
    const _messages = data.data;

    if (data.status === "success") {
      setMessages(_messages);
    }

    // if there is atleast one message update last message read state
    if (_messages.length > 0 && !_messages[_messages.length - 1].isRead) {
      console.log("hello");
      // Mark the last message true as user has read the chat
      _messages[_messages.length - 1].isRead = true;

      // save the last message isRead state to db
      await saveMessage(_messages[_messages.length - 1], "update");
    }
  };

  useEffect(() => {
    const _getChatUsers = async () => {
      const data = await getChatUsers({ id: getUser().id });
      //console.log(data);
      if (data.status === "success") {
        setChatUsers(data.data);
      }
    };

    newchatId?.current && _getMessages();

    _getChatUsers();
    // Register the user with the server
    socket.emit("register", getUser().id);

    socket.on("chat message", (data) => {
      // find if incoming chat user already exist

      setChatUsers((currUser: any) => {
        let userExist = null;

        if (currUser) {
          userExist = currUser.find((item: any) => item.id === data.from.id);
          // if yes then add the user to list
          if (!userExist) {
            setChatuser(data.from); // send user to chatlist component with usecontext hook
            setChatUsers([data.from, ...currUser]);
          } else {
            // update chatlist component to update last msg with setUpdateMsg context hook and send last message
            setUpdateMsg({ id: data.from.id, msg: data.newMsg.msg });
          }
        }
        return currUser;
      });

      // add messages to UI
      //check if the message is for the selected user or some other
      if (newchatId.current && data.from.id === newchatId.current.id) {
        setMessages((prevMessages) => [...prevMessages, data.newMsg]);
      }
    });

    return () => {
      socket.off("chat message");
    };
    //ff();
  }, []);

  const checkUserExist = () => {
    const chatIdExist = chatUsers.find((item: any) => item.id === chatId.id);
    if (!chatIdExist) {
      setChatUsers([chatId, ...chatUsers]);
    }
  };

  useEffect(() => {
    if (chatId) {
      //setting chat id to refs so it can be accessed in callbacks(sockets)
      newchatId.current = chatId;
      _getMessages();
    }
  }, [chatId]);

  /******* Useffect to scroll msg to bottom whenever new msg arrives  */
  useEffect(() => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    //check if msg is not empty and a chatId is selected
    if (msg.length > 0 && msg != "") {
      const message: Message = {
        msg: msg,
        timestamp: new Date().toISOString(),
        user: getUser().id,
        isRead: false,
      };

      await saveMessage(message, "add");

      // Send real  time message to user through socket
      socket.emit("chat message", {
        from: getUser(),
        to: chatId.id,
        message: message,
      });
      // update chatlist component to update last msg with setUpdateMsg context hook and send last message
      setUpdateMsg({ id: chatId.id, msg: message.msg });
      checkUserExist(); // check if user exist, if not add to current user array
      setMessages([...messages, message]);
      setMsg("");
    }
  };

  return (
    <div className="h-full flex flex-col lg:w-[50%] w-[100%] border-r-[1px] border-[rgba(255,255,255,0.2)] py-2">
      {/*************  User Info  *************/}

      <div className="userInfo flex border-b-[1px] border-[rgba(255,255,255,0.2)]">
        <>
          <Avatar
            className="ml-5"
            size={50}
            src={
              chatId?.img?.includes("https://")
                ? chatId.img
                : `https://api.dicebear.com/7.x/miniavs/svg?seed=0`
            }
          />
          <div className=" ml-3 flex flex-col mt-2 pb-2">
            <span className="text-[15px]">
              {" "}
              {chatId ? chatId.username : "Select a user to chat"}
            </span>
            <span className="text-[13px]">
              {" "}
              Last seen{" "}
              {chatId?.lastseen
                ? moment(chatId.lastseen).fromNow()
                : " .."}{" "}
            </span>
          </div>
          <div className="userOptions flex gap-5 ml-auto pr-5 cursor-pointer">
            <PhoneFilled style={{ fontSize: "20px" }} />
            <VideoCameraFilled style={{ fontSize: "20px" }} />
            <InfoCircleFilled style={{ fontSize: "20px" }} />
          </div>
        </>
      </div>

      {/*************  Chat Area  *************/}
      <div
        ref={chatBox}
        className="overflow-y-auto chatArea flex flex-col h-[85%]  p-5 border-b-[1px] border-[rgba(255,255,255,0.2)] "
      >
        {messages &&
          messages.map((item: any, index: number) => (
            <div className="flex flex-col mb-3 " key={index}>
              <div
                className={`${
                  item.user === getUser().id
                    ? "ml-auto bg-blue-500"
                    : "bg-slate-800"
                }  break-words  w-fit max-w-[60%] rounded-[15px]  h-auto p-5 text-[14px] whitespace-normal`}
              >
                <span>{item.msg}</span>
              </div>
              <span
                className={`text-[10px] mt-1  ${
                  item.user === getUser().id ? "ml-auto" : "ml-3"
                } `}
              >
                {" "}
                {moment(item.timestamp).fromNow()} at{" "}
                {moment(item.timestamp).format("LT")}
              </span>
            </div>
          ))}
      </div>

      {/*************  Send Message  *************/}

      <div className="sendMsg flex">
        <div className="flex p-5">
          <PictureFilled style={{ fontSize: "22px" }} />
        </div>
        <Space.Compact aria-disabled className="w-[100%] p-5">
          <Input
            onPressEnter={sendMessage}
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            placeholder="Write a message to send"
            size="large"
            disabled={!chatId}
          />
          <Button
            disabled={!chatId}
            type="primary"
            size="large"
            onClick={sendMessage}
          >
            <SendOutlined />
          </Button>
        </Space.Compact>
      </div>
    </div>
  );
}

export default Chat;
