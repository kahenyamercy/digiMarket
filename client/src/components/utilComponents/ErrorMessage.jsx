import React from 'react'

const ErrorMessage = ({children}) => {
  return (
    <div className='bg-orange-100 px-3 py-1 rounded max-w-max mx-auto my-1'>
      <p className='text-red-500'>{children}</p>
    </div>
  );
}

export default ErrorMessage;