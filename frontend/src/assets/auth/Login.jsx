import React from 'react'

const Login = () => {
  return (
    <div className=' flex items-center justify-center h-screen bg-gray-100' >
      <div className='bg-white shadow-lg p-8 w-80 rounded-lg text-center' >
        <h2 className='font-bold text-2x1 mb-4'>Login </h2>
        <p className='text-grey-600 mb-8 ' > Enter your credentials</p>
        <input type="text"
        placeholder='email'
        className='border border-grey-300 rounded-xl text-center px-4 py-1 mb-4 w-full'
       />
      <input type="text"
      placeholder='password'
      className='border border-grey-300 rounded-xl text-center px-4 py-1 w-full'

      />
<button className="border border-black m-5 rounded-xl px-4 py-2 font-bold bg-blue-400 hover:bg-blue-500 text-white">
  Log In
</button>
      </div>
    </div>
  )
}

export default Login