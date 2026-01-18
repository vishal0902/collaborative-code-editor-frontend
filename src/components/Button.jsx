import React from 'react'
import { Spinner } from './Spinner'

const Button = (props) => {
  return (
    <div className='mt-4'>
        <button 
          onClick={props.onClick} 
          className={props.cn} 
          type= {props.type} 
          >
            {props.loading ? <span className='flex justify-center'><Spinner /> </span>: props.buttonName}
          </button>
    </div>
  )
}

export default Button