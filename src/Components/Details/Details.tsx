import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

function Details() {
  return (
    <div className="details hidden lg:block">
      <div className="flex border-b-[1px] border-[rgba(255,255,255,0.2)] mb-5">
        {" "}
        User Details{" "}
      </div>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
    </div>
  );
}

export default Details;
