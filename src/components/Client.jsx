import React from 'react'
import Avatar from 'react-avatar'

const Client = ({username}) => {
  return (
    <div className='flex flex-col gap-2 ml-4 mt-2 items-center'>
        <Avatar name={username} round={10} size='60' />
        <div>{`${username.split(" ")[0]} ${username.split(" ")[1]?.slice(0,1) ?? ''}`}</div>
    </div>
  )
}

export default Client