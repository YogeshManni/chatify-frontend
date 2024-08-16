import { InfoCircleFilled,VideoCameraFilled,PhoneFilled,PictureFilled,SendOutlined } from '@ant-design/icons'
import { Avatar, Button, Input, Space } from 'antd'
import React, { useRef, useState } from 'react'
import { Interface } from 'readline'

function Chat() {

 interface Message {
    msg : string, 
    timestamp: string,
    isMine:boolean
 }


 const [messages, setMessages] = useState<Message[]>([]);
 const[msg, setMsg] = useState('');
 const sendMessage = () =>
 {
   console.log(messages)
    if(msg.length > 0 && msg != "")
    {
    const message = {msg:msg, timestamp: new Date().toISOString(),
        isMine: true,}
    setMessages([...messages,message])
    setMsg('')
    
    }
    
 }
  return (
    <div className='chatContainer flex flex-col lg:w-[50%] w-[100%] border-r-[1px] border-[rgba(255,255,255,0.2)] py-2'>
        <div className='userInfo flex border-b-[1px] border-[rgba(255,255,255,0.2)]'>
        <Avatar size={50} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=0`}/>
            <div className='flex flex-col mt-2 pb-2'>
                    <span className='text-[15px]'> Yogesh Manni</span>
                    <span className='text-[13px]'>Status is here............ </span>
            </div>
            <div className='userOptions flex gap-5 ml-auto pr-5 cursor-pointer'>
                
                <PhoneFilled style={{ fontSize: '20px'}}/>
                <VideoCameraFilled style={{ fontSize: '20px'}}/>
                <InfoCircleFilled style={{ fontSize: '20px'}}/>
            </div>

        </div>
        <div className='chatArea flex h-[85%]  p-5 border-b-[1px] border-[rgba(255,255,255,0.2)]'>
        <Avatar size={35} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=6`}/>
        </div>
        <div className='sendMsg flex'>
            <div className='flex p-5'>
                <PictureFilled style={{ fontSize: '22px'}}/>
            </div>
            <Space.Compact className='w-[100%] p-5'>
      <Input onChange={(e) => setMsg(e.target.value)} value={msg} placeholder="Write a message to send" size="large"/>
      <Button type="primary" size="large" onClick={sendMessage}><SendOutlined /></Button>
    </Space.Compact>
       </div>
    </div>
  )
}

export default Chat