import React, { useEffect, useState } from 'react'
import { Avatar, Button, Input, List } from 'antd';
import "./Chatlist.css"



function Chatlist() {

  const [orgUsers,setOrgUsers]:any = useState(null);
  const [users,setUsers]:any = useState(null);

  useEffect(() =>
  {
    const data = [
      {
        name: 'Tom Hidelton',
      },
      {
        name: 'Jamie campbell',
      },
      {
        name: 'Roney Millis',
      },
      {
        name: 'Cobie cooper',
      }];

      setOrgUsers(data);
      setUsers(data);
        
  },[])
  

 const filterUsers = (e:any) =>
 {
  
  const searchQuery = e.target.value.toLowerCase();
  if(searchQuery === "")
  {
    setUsers(orgUsers);
  }
  else
  {
    const filteredUsers = users.filter((item:any) => item.name.toLowerCase().includes(e.target.value))
    setUsers(filteredUsers);
  }
 }
  return (
    <div className='flex flex-col w-[30%] border-r-[1px] border-[rgba(255,255,255,0.2)] chatlist p-4' >
       
       <div className='flex pb-3'>
          <Avatar size={50} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=0`}/>
          <h2 className='mt-5'>Yogesh Manni</h2>
       </div>

       <div className=' search pb-5 border-b-[1px] border-[rgba(255,255,255,0.2)]'>
        <Input.Search  className=' bg-transparent text-white-500 max-w-[300px]' placeholder="Search user" allowClear onChange={filterUsers} />
       </div>
       
      { users && (
        <List
        className='cursor-pointer'
    itemLayout="horizontal"
    dataSource={users}
    renderItem={(item:any, index) => (
      
      <List.Item >
       
        <List.Item.Meta 
        className='border-b-[1px]  border-[rgba(255,255,255,0.2)] pb-5 hover:bg-[rgba(255,255,255,0.2)]'
          avatar={<Avatar size={50} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
          title={<a  href="https://ant.design">{item.name}</a>}
          description="this is the last msg"
        />

      </List.Item>
     
    
    )}
  />)}
    </div>
  )
}

export default Chatlist