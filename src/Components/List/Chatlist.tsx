import React, { useEffect, useState } from "react";
import { Avatar, Button, Input, List, Modal } from "antd";
import "./Chatlist.css";
import { getUser } from "../../helpers/helper";
import { getSearchUsers } from "../../services/api";
import {
  PlusCircleFilled,
  PlusOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

function Chatlist() {
  const [orgUsers, setOrgUsers]: any = useState(null);
  const [users, setUsers]: any = useState(null);

  useEffect(() => {
    /* const _getChatUsers = async () => {
      const data = await getChatUsers(1);
      setOrgUsers(data);
      setUsers(data);
    };

    _getChatUsers(); */
    const data = [
      {
        name: "Tom Hidelton",
      },
      {
        name: "Jamie campbell",
      },
      {
        name: "Roney Millis",
      },
      {
        name: "Cobie cooper",
      },
    ];

    setOrgUsers(data);
    setUsers(data);
  }, []);

  const filterUsers = async (e: any) => {
    const searchQuery = e.target.value.toLowerCase();
    if (searchQuery === "") {
      setUsers(orgUsers);
    } else {
      const _getUsers = await getSearchUsers({ query: searchQuery });
      console.log(_getUsers);
      const filteredUsers = users.filter((item: any) =>
        item.name.toLowerCase().includes(searchQuery)
      );
      setUsers(filteredUsers);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col w-[30%] border-r-[1px] border-[rgba(255,255,255,0.2)] chatlist p-4">
      <div className="flex pb-3">
        <Avatar
          size={50}
          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=0`}
        />
        <h2 className="mt-5">{getUser().username}</h2>
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
            <List.Item>
              <List.Item.Meta
                className="border-b-[1px]  border-[rgba(255,255,255,0.2)] pb-5 hover:bg-[rgba(255,255,255,0.2)]"
                avatar={
                  <Avatar
                    size={50}
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={<a href="https://ant.design">{item.name}</a>}
                description="this is the last msg"
              />
            </List.Item>
          )}
        />
      )}

      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p className="text-[15px]  mb-5"> Add users</p>
        <div className=" search pb-5 border-b-[1px] border-[rgba(255,255,255,0.2)]">
          <Input.Search
            className=" bg-transparent text-white-500 max-w-[300px]"
            placeholder="Search user"
            allowClear
            onChange={filterUsers}
          />
        </div>
        <List
          className="cursor-pointer"
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(item: any, index) => (
            <List.Item>
              <List.Item.Meta
                className="border-b-[1px]  border-[rgba(255,255,255,0.2)] pb-5 hover:bg-[rgba(255,255,255,0.2)]"
                avatar={
                  <Avatar
                    size={50}
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={<a href="https://ant.design">{item.name}</a>}
                description="this is the last msg"
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
}

export default Chatlist;
