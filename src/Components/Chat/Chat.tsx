import { InfoCircleFilled,VideoCameraFilled,PhoneFilled } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import React from 'react'

function Chat() {
  return (
    <div className='chatContainer flex flex-col w-[50%] border-r-[1px] border-[rgba(255,255,255,0.2)] py-2'>
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

            <div className='chatArea'>

            </div>
            <div className='sendMsg'>

            </div>
        </div>

    </div>
  )
}

export default Chat