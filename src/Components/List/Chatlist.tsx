import React from 'react'
import { Avatar, Button, Input, List } from 'antd';
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
 const filterUsers = (e:any) =>
 {
  console.log( e.target.value);
 }
  return (
    <div className='flex flex-col w-[30%] border-r-[1px] border-[rgba(255,255,255,0.2)] chatlist p-4' >
       
       <div className='flex pb-3'>
          <Avatar size={50} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=0`}/>
          <h2 className='mt-5'>Yogesh Manni</h2>
       </div>

       <div className='search pb-5 border-b-[1px] border-[rgba(255,255,255,0.2)]'>
        <Input.Search  className='bg-transparent text-white-500' placeholder="input search text" allowClear onChange={filterUsers} style={{ width: 200 }} />
       </div>
       
        <List
        className='cursor-pointer'
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