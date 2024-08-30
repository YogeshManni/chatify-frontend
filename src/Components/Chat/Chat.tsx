import {
  InfoCircleFilled,
  VideoCameraFilled,
  PhoneFilled,
  PictureFilled,
  SendOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, Space } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";

import moment from "moment";
import io from "socket.io-client";
import { getUser } from "../../helpers/helper";
import { getChatUsers, getMessages, saveMessageToDb } from "../../services/api";
import { dataContext } from "../../App";
const socket = io(`${process.env.REACT_APP_BASEURL}`);

function Chat({ chatId }: any) {
  interface Message {
    msg: string;
    timestamp: string;
    user: Number;
  }

  const { setChatuser }: any = useContext(dataContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [msg, setMsg] = useState("");
  const [chatUsers, setChatUsers]: any = useState([]);
  const chatBox: any = useRef();

  useEffect(() => {
    const _getMessages = async () => {
      const data = await getMessages({
        sender: chatId,
        receiver: getUser().id,
      });

      console.log(data);
      if (data.status === "success") {
        setMessages(data.data);
      }
    };

    const _getChatUsers = async () => {
      const data = await getChatUsers({ id: getUser().id });

      if (data.status === "success") {
        setChatUsers(data.data);
      }
    };

    _getMessages();
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
            setChatuser(data.from);
          }
        }
        return currUser;
      });

      // add messages to UI
      setMessages((prevMessages) => [...prevMessages, data.newMsg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  useEffect(() => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (msg.length > 0 && msg != "") {
      const message = {
        msg: msg,
        timestamp: new Date().toISOString(),
        user: getUser().id,
      };

      // create a msgPacket to send to DB
      const msgPacket = {
        sender: getUser().id,
        receiver: chatId.id,
        msg: message,
        firstTime: false,
      };

      // if this is the first time sending message to user mark firstTime flag true
      messages.length === 0 && (msgPacket.firstTime = true);

      // Save message packet to DB
      await saveMessageToDb(msgPacket);

      socket.emit("chat message", {
        from: getUser().id,
        to: chatId.id,
        message: message,
      });
      setMessages([...messages, message]);
      setMsg("");
    }
  };

  return (
    <div className="h-full flex flex-col lg:w-[50%] w-[100%] border-r-[1px] border-[rgba(255,255,255,0.2)] py-2">
      {/*************  User Info  *************/}

      <div className="userInfo flex border-b-[1px] border-[rgba(255,255,255,0.2)]">
        <Avatar
          size={50}
          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=0`}
        />
        <div className="flex flex-col mt-2 pb-2">
          <span className="text-[15px]"> Yogesh Manni</span>
          <span className="text-[13px]">Status is here............ </span>
        </div>
        <div className="userOptions flex gap-5 ml-auto pr-5 cursor-pointer">
          <PhoneFilled style={{ fontSize: "20px" }} />
          <VideoCameraFilled style={{ fontSize: "20px" }} />
          <InfoCircleFilled style={{ fontSize: "20px" }} />
        </div>
      </div>

      {/*************  Chat Area  *************/}
      <div
        ref={chatBox}
        className="overflow-y-auto chatArea flex flex-col h-[85%]  p-5 border-b-[1px] border-[rgba(255,255,255,0.2)] "
      >
        {messages.map((item: any) => (
          <div className="flex flex-col mb-3 ">
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
              {moment().fromNow(item.timestamp)}{" "}
            </span>
          </div>
        ))}
      </div>

      {/*************  Send Message  *************/}

      <div className="sendMsg flex">
        <div className="flex p-5">
          <PictureFilled style={{ fontSize: "22px" }} />
        </div>
        <Space.Compact className="w-[100%] p-5">
          <Input
            onPressEnter={sendMessage}
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            placeholder="Write a message to send"
            size="large"
          />
          <Button type="primary" size="large" onClick={sendMessage}>
            <SendOutlined />
          </Button>
        </Space.Compact>
      </div>
    </div>
  );
}

export default Chat;
