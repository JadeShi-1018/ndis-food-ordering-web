"use client"
import React, { useState } from 'react'

const UserSignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  return (
    <div className='flex flex-col items-center m-12 text-[#285770]'>
      <div className='italic mb-8 text-center'>
        <h1 className='text-center text-6xl -mb-2'>NDIS</h1>
        <span className='text-xl'>Service System</span>
      </div>
      <div className='flex flex-col items-center rounded-xl bg-[#E1F0F2] p-16 space-y-8 max-w-[500px]'>
        <h3 className='text-2xl font-semibold'>登入</h3>
        <form onSubmit={handleLogin} className='flex flex-col space-y-6 font-normal text-sm max-w-[400px]'>
            <div className='flex flex-col space-y-2'>
              <label className='text-center' htmlFor="username">用戶名/Email address</label>
              <input
                className='border rounded-2xl h-12 p-2'
                type='text'
                id='username'
                name='username'
                placeholder='Username/Email address'
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                />
            </div>

            <div className='flex flex-col text-center space-y-2'>
              <label htmlFor="password">密 碼</label>
              <input
                className='border rounded-2xl h-12 p-2'
                type='password'
                id='password'
                name='password'
                placeholder='Password'
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                />
                <a href="#" className='underline font-semibold w-full text-left'>Forgot password?</a>
            </div>

            <button 
              type='submit' 
              className='border rounded-2xl text-white bg-[#285770] w-28 h-10 mx-auto'>
              登 入
            </button>

            <div className='flex flex-row justify-around border-t border-[#285770] pt-4'>
              <span>New to NDIS service system?</span>
              <a href="#" className='underline font-semibold'>Create an account</a>
            </div>
        </form>
      </div>
    </div>
  )
}

export default UserSignInPage