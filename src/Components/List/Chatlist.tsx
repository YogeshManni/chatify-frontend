import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Input, List, Modal } from "antd";
import "./Chatlist.css";
import { getUser } from "../../helpers/helper";

import {
  addTodbChatlist,
  getChatUsers,
  getSearchUsers,
} from "../../services/api";
import {
  PlusCircleFilled,
  PlusOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { dataContext } from "../../App";
import { Console } from "console";

function Chatlist() {
  const [orgUsers, setOrgUsers]: any = useState([]);
  const [users, setUsers]: any = useState([]);
  const [globalUsers, setGlobalUSers]: any = useState(null);
  const { refreshChat, addChatUser, updateMsg }: any = useContext(dataContext);
  const [selectedUser, setSelectedUser]: any = useState(null);
  /********* use effects  ************/
  const _getChatUsers = async () => {
    const data = await getChatUsers({ id: getUser().id });
    console.log(data);
    if (data.status == "success") {
      setOrgUsers(data.data);
      setUsers(data.data);
    }
  };
  useEffect(() => {
    _getChatUsers();
  }, []);

  useEffect(() => {
    const _addUser = async () => {
      if (addChatUser) {
        setOrgUsers([addChatUser, ...orgUsers]);
        setUsers([addChatUser, ...users]);
        await addTodbChatlist({ chatId: addChatUser.id, userId: getUser().id });
      }
    };

    _addUser();
  }, [addChatUser]);

  /****  use effect to update last message when updateMSg is updated from chat component */
  useEffect(() => {
    // update msg here
    //console.log(updateMsg, users);
    /*  if (!updateMsg) return;
    const _users = users.map((item: any) =>
      item.id === updateMsg.id
        ? {
            ...item,
            content: {
              ...item.content,
              msg: updateMsg.msg,
              isRead: selectedUser === item.id ? true : false,
            },
          }
        : item
    );

    // set msg to render UI
    setOrgUsers(_users);
    setUsers(_users); */
    console.log("upMsg");
    _getChatUsers();
  }, [updateMsg]);
  /*********************/

  const filterUsers = (e: any) => {
    const searchQuery = e.target.value.toLowerCase();
    if (searchQuery === "") {
      setUsers(orgUsers);
    } else {
      const filteredUsers = users.filter((item: any) =>
        item.username.toLowerCase().includes(searchQuery)
      );
      setUsers(filteredUsers);
    }
  };

  const searchGlobalUsers = async (e: any) => {
    const searchQuery = e.target.value.toLowerCase();
    if (searchQuery != "") {
      const _getUsers = await getSearchUsers({ query: searchQuery });
      setGlobalUSers(_getUsers.data);
    } else {
      setGlobalUSers([]);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /*** On clicking addbutton from modal, add new user to current chatlist ****/

  const addtoChatUser = async (user: any) => {
    const isAlreadyChatUser = orgUsers.find((item: any) => item.id === user.id);
    if (!isAlreadyChatUser) {
      setOrgUsers([user, ...orgUsers]);
      setUsers([user, ...orgUsers]);
      await addTodbChatlist({ chatId: user.id, userId: getUser().id });
    }
    handleCancel();
  };

  const updateChat = (item: any) => {
    //console.log(item.id);
    setSelectedUser(item.id);
    refreshChat(item);
  };

  const isRead = (item: any) => {
    return item.content &&
      item.content.isRead === false &&
      item.id === item.content.user
      ? true
      : false;
  };
  return (
    <div className="flex flex-col w-[30%] border-r-[1px] border-[rgba(255,255,255,0.2)] chatlist p-4">
      <div className="flex pb-3">
        <Avatar
          size={50}
          src={
            getUser().img?.includes("https://")
              ? getUser().img
              : `https://api.dicebear.com/7.x/miniavs/svg?seed=0`
          }
        />
        <h2 className="mt-5 ml-2">{getUser().username}</h2>
      </div>

      <div className="flex justify-between">
        <div className=" search pb-5 border-b-[1px] border-[rgba(255,255,255,0.2)]">
          <Input.Search
            className=" bg-transparent text-white-500 max-w-[300px]"
            placeholder="Search user"
            allowClear
            onChange={filterUsers}
          />
        </div>
        <Button className="w-10" onClick={showModal}>
          {" "}
          <PlusOutlined />{" "}
        </Button>
      </div>
      {users && (
        <List
          className="cursor-pointer"
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(item: any, index) => (
            <List.Item onClick={() => updateChat(item)} className="!py-1">
              <List.Item.Meta
                className={`border-b-[1px] hover:bg-[rgba(255,255,255,0.2)] ${
                  item.id === selectedUser && "bg-[rgba(255,255,255,0.2)]"
                } border-[rgba(255,255,255,0.2)] py-2 pl-2`}
                avatar={
                  <Avatar
                    size={50}
                    src={
                      item.img?.includes("https://")
                        ? item.img
                        : `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`
                    }
                  />
                }
                title={
                  <label
                    className={`text-white ${isRead(item) && "font-bold"}`}
                  >
                    {item.username}
                  </label>
                }
                description={
                  <span className={`${isRead(item) && "font-bold"}`}>
                    {item.content && item.content.msg}
                  </span>
                }
              />
              <div>
                {/** If an message is read make message and username bold and add a blue dot **/}
                {isRead(item) && (
                  <span className="ml-[-20px] text-[20px] text-blue-500">
                    ●
                  </span>
                )}
              </div>
            </List.Item>
          )}
        />
      )}

      <Modal open={isModalOpen} footer={null} onCancel={handleCancel}>
        <p className="text-[15px]  mb-5"> Add users</p>
        <div className=" search pb-5 border-b-[1px] border-[rgba(255,255,255,0.2)]">
          <Input.Search
            className=" bg-transparent text-white-500 max-w-[300px]"
            placeholder="Search user"
            allowClear
            onChange={searchGlobalUsers}
          />
        </div>
        <List
          className="cursor-pointer"
          itemLayout="horizontal"
          dataSource={globalUsers || [{}]}
          renderItem={(item: any, index) =>
            globalUsers && (
              <div className="">
                <List.Item>
                  <List.Item.Meta
                    className={`border-b-[1px]  border-[rgba(255,255,255,0.2)] pb-5 hover:bg-[rgba(255,255,255,0.2)] `}
                    avatar={
                      <Avatar
                        size={50}
                        src={
                          item.img?.includes("https://")
                            ? item.img
                            : `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`
                        }
                      />
                    }
                    title={<a href="https://ant.design">{item.username}</a>}
                    description={item.content && item.content.msg}
                  />
                  <Button
                    className="text-[25px]"
                    onClick={() => addtoChatUser(item)}
                  >
                    +
                  </Button>
                </List.Item>
              </div>
            )
          }
        />
      </Modal>
    </div>
  );
}

export default Chatlist;
