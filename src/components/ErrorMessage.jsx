import React from 'react'

function ErrorMessage({errorMessage}) {
  return (
        <span className='text-red-500 text-xs m-0 p-0'>{errorMessage}</span>
  )
}

export default ErrorMessage