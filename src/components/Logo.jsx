import React from 'react'
import logo from '../assets/logo.png'

function Logo({width=100}) {
  return (
    <div>
      <img src={logo} alt="" width={100} />
    </div>
  )
}

export default Logo