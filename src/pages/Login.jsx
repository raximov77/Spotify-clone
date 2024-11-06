import React from 'react'
import {CLIENT_ID} from "../hook/useEnv"
import logoText from "../assets/images/logoText.svg"
import { NavLink } from 'react-router-dom'

function Login() {
    const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played`

  return (
    <div className='login-bg flex flex-col gap-10 items-center justify-center h-[100vh]'>
      <div>
        <NavLink to={"/"}>
          <img src={logoText} alt="Logo" width={400} height={400} />
        </NavLink>
      </div>
        <a className='w-[200px] hover:scale-125 duration-300 p-3 rounded-md bg-green-400 text-center text-[25px] text-white font-semibold' href={AUTH_URL}>Login</a>
    </div>
  )
}

export default Login