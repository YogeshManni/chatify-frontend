import React from 'react'
import { Avatar, Button, List } from 'antd';
import "./Chatlist.css"



function Chatlist() {

    const data = [
        {
          title: 'Tom Hidelton',
        },
        {
          title: 'Tom Hidelton',
        },
        {
          title: 'Tom Hidelton',
        },
        {
          title: 'Tom Hidelton',
        },
      ];

  return (
    <div className='flex flex-col w-[30%] border-r-[1px] border-[rgba(255,255,255,0.2)] chatlist p-4 cursor-pointer' >
        <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      
      <List.Item >
       
        <List.Item.Meta 
        className='border-b-[1px]  border-[rgba(255,255,255,0.2)] pb-5'
          avatar={<Avatar size={50} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
          title={<a  href="https://ant.design">{item.title}</a>}
          description="this is the last msg"
        />

      </List.Item>
     
    
    )}
  />
    </div>
  )
}

export default Chatlist