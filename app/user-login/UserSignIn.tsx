"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/apis/auth'

const UserSignInPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await signIn({ email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.userId)
      localStorage.setItem('email', data.email)
      router.push('/select-service')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center m-12 text-[#285770]'>
      <div className='italic mb-8 text-center'>
        <h1 className='text-center text-6xl -mb-2'>NDIS</h1>
        <span className='text-xl'>Service System</span>
      </div>
      <div className='flex flex-col items-center rounded-xl bg-[#E1F0F2] p-16 space-y-8 max-w-[500px]'>
        <h3 className='text-2xl font-semibold'>Login</h3>
        <form onSubmit={handleLogin} className='flex flex-col space-y-6 font-normal text-sm max-w-[400px]'>
            <div className='flex flex-col space-y-2'>
              <label className='text-center' htmlFor="email">User Name/Email address</label>
              <input
                className='border rounded-2xl h-12 p-2'
                type='email'
                id='email'
                name='email'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>

            <div className='flex flex-col text-center space-y-2'>
              <label htmlFor="password">Password</label>
              <input
                className='border rounded-2xl h-12 p-2'
                type='password'
                id='password'
                name='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <a href="#" className='underline font-semibold w-full text-left'>Forgot password?</a>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='border rounded-2xl text-white bg-[#285770] w-28 h-10 mx-auto disabled:opacity-50'>
              {loading ? 'Login...' : 'Login'}
            </button>

            <div className='flex flex-row justify-around border-t border-[#285770] pt-4'>
              <span>New to NDIS service system?</span>
              <a href="/user-signup" className='underline font-semibold'>Create an account</a>
            </div>
        </form>
      </div>
    </div>
  )
}

export default UserSignInPage
