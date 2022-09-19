import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineHome, AiFillFileAdd, AiFillEdit } from 'react-icons/ai'

const NavItem = ({ to, value, Icon, closed }) => {
    const commonClass = "flex items-center space-x-2 w-full p-2 block whitespace-nowrap";
    const activeClass = commonClass + ' bg-blue-500 text-white';
    const inActiveClass = commonClass + ' text-grey-500';

    return (
        <NavLink className={({isActive}) => isActive ? activeClass : inActiveClass } to={to}>
            {Icon}
            <span className={closed ? 'w-0 transition-width overflow-hidden' : 'w-full transition-width overflow-hidden' }>{value}</span>
        </NavLink>
    )
}

const Navbar = ({closed}) => {
  return (
    <nav>
        <div className="flex justify-center px-3 py-5">
            <img src="./logo.png" alt="wein's blog" className={closed ? 'min-logo transition-width': 'logo transition-width'} />
        </div>
        <ul>
            <li>
                <NavItem closed={closed} to="/" value='Home' Icon={<AiOutlineHome />} />
            </li>
            <li>
                <NavItem closed={closed} to="/create-post" value="CreatePost" Icon={<AiFillFileAdd />} />   
            </li>
            <li>
                <NavItem closed={closed} to="/update-post" value="UpdatePost" Icon={<AiFillEdit />} />   
            </li>           
        </ul>
    </nav>
  )
}

export default Navbar