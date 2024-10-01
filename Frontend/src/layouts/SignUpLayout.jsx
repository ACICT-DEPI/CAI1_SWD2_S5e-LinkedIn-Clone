import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../assets/images/login-logo.svg';

function SignUpLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex items-center justify-between px-16 md:px-48 py-4 bg-linkedinLightGray">
        <img src={logo} alt="LinkedIn Logo" className="h-8" />
      </nav>
      <Outlet/>
    </div>
  )
}

export default SignUpLayout
