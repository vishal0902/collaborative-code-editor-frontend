import React from 'react'
import Avatar from 'react-avatar'

const ClientSelf = ({ username, avatar}) => {
  if(!avatar){
    return (
      <div className='flex flex-col items-center ml-2'>
          <Avatar name={username} round={30} size='62' />
          <div className='relative bottom-2 mr-8 border-3 rounded-full bg-green-600/90 w-3 h-3'></div>
          <div className='text-xs m-0'>You</div>
      </div>
    )
  } 
  return (
     <div className='flex flex-col items-center ml-2'>
          <img src={avatar} alt={username} className='size-15 rounded-full ' />
          <div className='relative bottom-2  mr-8 border-3 rounded-full bg-green-600/90 w-3 h-3'></div>
          <div className='text-xs m-0'>You</div>
      </div>
  )
}

export default ClientSelf