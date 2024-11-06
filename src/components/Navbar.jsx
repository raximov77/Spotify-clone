import React from 'react'
import NavbarItem from './NavbarItem'
import {HomeIcon, LibraryIcon, LikeIcon, PlaylistIcon, SearchIcon} from "../assets/Icons"
import logoText from "../assets/images/logoText.svg"
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='w-[20%] flex flex-col gap-8 bg-black h-[100vh] overflow-y-auto pt-[70px] pl-[30px]'>
      <div>
        <NavLink to={"/"}>
          <img src={logoText} alt="Logo" width={145} height={145} />
        </NavLink>
      </div>
      <div className=''>
        <NavbarItem extraStyle={"mb-6 opacity-[60%]"} to={"/"} icon={<HomeIcon/>} title={'Home'}/>
        <NavbarItem extraStyle={"mb-6 opacity-[60%]"} to={"/search"} icon={<SearchIcon/>} title={'Search'}/>
        <NavbarItem extraStyle={"mb-[49px] opacity-[60%]"} to={"#"} icon={<LibraryIcon/>} title={'Your Library'}/>
        <NavbarItem extraStyle={"mb-5 opacity-[60%]"} to={"#"} icon={<PlaylistIcon/>} title={'Create Playlist'}/>
        <NavbarItem spanStyle={"opacity-[60%]"} to={"/liked"} icon={<LikeIcon/>} title={'Liked Songs'}/>
      </div>
    </div>
  )
}

export default Navbar