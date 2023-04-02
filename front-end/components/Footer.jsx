import React from 'react'
import logo from "../images/logo.png";
import Image from "next/image"

function Footer() {
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-center items-center">
        <div className='flex flex-[0.5] justify-center items-center'>
          <Image src={logo} alt="logo" className='' />
        </div>
      </div>

      <div className="flex justify-center items-center flex-col">
        <p className="text-white text-sm text-center">Come Join Us</p>
        <p className="text-white text-sm text-center">Contact us at: orionleoprojects@gmail.com</p>
      </div>

      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400" />

      <div className="sm:w-[90%] w-full flex justify-between items-center">
        <p className="text-white text-sm text-center">@orionleoProjects</p>
        <p className="text-white text-sm text-center">All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer