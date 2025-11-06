import React from 'react'
import Avatar from 'react-avatar'

const Client = ({username, avatar}) => {
  console.log(avatar);
  if(!avatar){
    return (
      <div className='flex flex-col items-center'>
          <Avatar name={username} round={30} size='62' />
          <div className='relative bottom-2 mr-8 border-3 rounded-full bg-green-600/90 w-3 h-3'></div>
          <div className='text-xs mt-0'> {`${username.split(" ")[0]} ${username.split(" ")[1]?.slice(0,1) ?? ''}`}</div>
      </div>
    )
  } 
  return (
     <div className='flex flex-col items-center'>
          <img src={avatar} alt={username} className='size-15 rounded-full ' />
          <div className='relative bottom-2  mr-8 border-3 rounded-full bg-green-600/90 w-3 h-3'></div>
          <div className='text-xs m-0'>{`${username.split(" ")[0]} ${username.split(" ")[1]?.slice(0,1) ?? ''}`}</div>
      </div>
  )
}

export default Client