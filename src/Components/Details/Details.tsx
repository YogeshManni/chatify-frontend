import { Card, List } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import { getUser } from "../../helpers/helper";
import moment from "moment";

function Details({ chatId }: any) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    console.log(chatId);
    setUser(chatId);
  }, [chatId]);

  return (
    user && (
      <div className="details hidden lg:block w-[20%]">
        <div className="flex justify-center items-center border-b-[1px] border-[rgba(255,255,255,0.2)] mb-5 h-[7.5%]">
          {" "}
          User Details{" "}
        </div>
        <div className="flex justify-center w-full">
          <Card
            hoverable
            style={{ width: 240, backgroundColor: "transparent" }}
            cover={<img alt="user image" src={user.img} />}
            className="text-white border-none shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"
          >
            <div className="w-full flex justify-between py-2">
              <b>User Name</b>
              <span>{user.username}</span>
            </div>
            <hr className="border-gray-600" />
            <div className="w-full flex justify-between py-2">
              <b>Full Name</b>
              <span>{user.fullname}</span>
            </div>
            <hr className="border-gray-600" />
            <div className="w-full flex justify-between py-2">
              <b>Phone no</b>
              <span>{user.phoneno}</span>
            </div>
            <hr className="border-gray-600" />
            <div className="w-full flex justify-between py-2">
              <b>Email</b>
              <span>{user.email}</span>
            </div>
            <hr className="border-gray-600" />
            <div className="w-full flex justify-between py-2">
              <b>Date joined</b>
              <span>{moment().format("Do MMM YYYY")}</span>
            </div>
          </Card>
        </div>
      </div>
    )
  );
}

export default Details;
