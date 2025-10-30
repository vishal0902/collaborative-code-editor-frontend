import React from 'react'

const Button = (props) => {
  return (
    <div className='mt-4'>
        <button 
          onClick={props.onClick} 
          className={props.cn} 
          type= {props.type} 
          >
            {props.buttonName}
          </button>
    </div>
  )
}

export default Button