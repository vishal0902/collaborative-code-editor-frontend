import React from 'react'

const Input = (props) => {
  return (
    <div className='mb-4 mt-2'>
        <input spellCheck='false' type={props.type} onChange={props.onChange} onKeyUp={props.onKeyUp} value={props.value} placeholder={props.placeholder} className={props.cn ? props.cn : 'p-3 outline-none rounded-sm bg-gray-200 text-gray-900 w-full font-semibold'} />
    </div>
  )
}

export default Input