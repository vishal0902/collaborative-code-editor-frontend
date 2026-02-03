import React from 'react'
import Avatar from 'react-avatar'

const Client = ({username, avatar, status}) => {
  // console.log({localUser, username});
  if(!avatar){
    return (
      <div className='flex flex-col items-center'>
          <Avatar name={username} round={30} size='62' />
          {status === 'offline' ? <div className='relative bottom-2 mr-8 rounded-lg bg-slate-100 w-10 h-4 text-[0.6rem] text-slate-700 text-center'>Away</div> : <div className='relative bottom-2 mr-8 border-3 rounded-full bg-green-600/90 w-4 h-4'></div>}
          <div className='text-xs mb-2'>{`${username.split(" ")[0]} ${username.split(" ")[1]?.slice(0,1) ?? ''}`}</div>
      </div>
    )
  } 
  return (
     <div className='flex flex-col items-center'>
          <img src={avatar} alt={username} className='size-15 rounded-full ' />
          {status === 'offline' ? <div className='relative bottom-1 mr-8   rounded-lg bg-slate-100 w-10 h-3 text-[0.5rem] text-slate-700 text-center'>offline</div> : <div className='relative bottom-1 mr-8 border-3 rounded-full bg-green-600/90 w-3 h-3'></div>}
          <div className='text-xs mb-2'>{`${username.split(" ")[0]} ${username.split(" ")[1]?.slice(0,1) ?? ''}`}</div>
      </div>
  )
}

export default Client