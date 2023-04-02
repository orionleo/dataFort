import React, { useState } from 'react'
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai"
import Image from "next/image"

import logo from "../images/logo.png"

const NavItem = ({ title, classProps }) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    )
}

function Navbar() {

    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <nav className='w-full flex md:justify-center justify-between items-center p-4 mt-[-100px]'>
            <div className="md:flex[0.5] flex-initial justify-center items-center">
                <Image src={logo} alt="logo" className='w-[400px] cursor-pointer' />
            </div>
            <ul className='text-white md:flex text-[40px] list-none flex-row justify-between items-center flex-initial'>
                {["About The Team"].map((item, index) => (
                    <NavItem key={item + index} title={item} />
                ))}
            </ul>

            
        </nav>
    )
}

export default Navbar