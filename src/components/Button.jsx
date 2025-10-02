import React from 'react'

const Button = (props) => {
  return (
    <div className='m-2'>
        <button 
          onClick={props.onClick} 
          className={props.cn+' mt-2 w-full'} 
          type= {props.type} 
          >
            {props.buttonName}
          </button>
    </div>
  )
}

export default Button