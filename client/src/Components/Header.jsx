import React, { useEffect, useState } from 'react'
import { Avatar, Navbar, TextInput } from "flowbite-react";

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { CgDarkMode } from "react-icons/cg";
  

import logo from "../assets/divulge.png"
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

import { signoutSuccess } from '../redux/user/userSlice.js';
import { IoPieChart } from "react-icons/io5";
import { IoExit  } from "react-icons/io5";

function Header() {
  const path = useLocation().pathname;
  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

//console.log(currentUser.currentUser.username); if not in {}

     //signout
     const handleSignout = async () => {
      try {
        const res = await fetch(`/blog/user/signout`, {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
          navigate('/');
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    // search
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }
    }, [location.search]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    };

  return (




<Navbar className='bg-transparent dark:bg-inherit backdrop-blur-0 p-5'>
<Link
  to='/'
  className='self-center whitespace-nowrap text-sm sm:text-xl  flex'
>
    <img src={logo} className="mr-3 h-6 sm:h-9" alt=" Logo"/>
    <span className=" self-center whitespace-nowrap lg:text-3xl text-xl font-ElsieSwash font-bold "><span className='text-transparent bg-clip-text bg-gradient-to-l to-blue-300 via-purple-500 from-teal-300'>Divulge.</span></span>
</Link>



<div className='flex gap-2 md:order-2'>

{/* <Button className='w-12 h-10 lg:hidden' color='light'>
  <IoSearchOutline />
</Button> */}

{/* darkmode button */}

  <button type="button" className="w-12 h-10 hidden sm:inline  bg-transparent   rounded-lg text-sm px-3 text-center items-center  dark:bg-inherit" 
  onClick={() => dispatch(toggleTheme())}>
  {theme === 'light' ?(<CgDarkMode className='w-7 h-7 duration-500 text-indigo-500'/>):(<CgDarkMode className='w-7 h-7 rotate-180 duration-500 text-indigo-300'/>)}
</button>


    
    {currentUser ? (
    <>
    <Link to={'/dashboard?tab=stats'} className='hidden lg:inline md:inline'>
    <Avatar img={currentUser.profilePicture} >
    <div className="space-y-1 font-Montserrat dark:text-white">
      <div><span className="block text-sm font-ElsieSwash font-semibold text-center "><span className='text-transparent bg-clip-text bg-gradient-to-l to-teal-300 via-purple-400 from-blue-400'>{currentUser.username}</span>
        </span>
      </div>
    </div>
  </Avatar>
  </Link>

<Link to={'/dashboard?tab=stats'} className='lg:hidden md:hidden'>
<Avatar img={currentUser.profilePicture} >
</Avatar>
</Link>
</>
    ):(
          <Link to='/sign-in' className=' '>
            <button className='divulge bg-transparent dark:bg-inherit py-2 font-ElsieSwash font-semibold'>
            <span className='text-transparent bg-clip-text bg-gradient-to-l to-teal-300 via-purple-400 from-blue-400'>Sign In</span>
            </button>
        </Link>
    )}


  <Navbar.Toggle className=' text-purple-400 dark:text-purple-400'/>
</div>

<Navbar.Collapse className='lg:text-center bg-transparent lg:hidden'>
<form onSubmit={handleSubmit}>
  <TextInput
    type='text'
    placeholder='Search...'
    rightIcon={IoSearchOutline}
    className='lg:hidden sm:hidden'
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}

  />

  
</form>
  {/* <Navbar.Link  as={'div'} className='hover:translate-y-0.5 duration-300 text-center'>
    <Link to={'/'} className='text-purple-500 dark:text-purple-400 lg:text-base  font-Montserrat font-semibold'>Home</Link>
  </Navbar.Link>
  <Navbar.Link  as={'div'} className='hover:translate-y-0.5  duration-300 text-center'>
    <Link to={'/blogs'} className='text-purple-500 dark:text-purple-400 lg:text-base font-Montserrat font-semibold'>Blogs</Link>
  </Navbar.Link>
  <Navbar.Link  as={'div'} className='hover:translate-y-0.5 duration-300 text-center'>
    <Link to={'/about'} className='text-purple-500 dark:text-purple-400 lg:text-base font-Montserrat font-semibold'>Contact</Link>
  </Navbar.Link> */}
  
  {currentUser ? (
  <Navbar.Link  as={'div'} className='hover:translate-y-0.5 duration-300 lg:hidden md:hidden p-3 mt-4'>

    <Link to={'/dashboard?tab=stats'} className='  flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-l to-teal-300 via-purple-400 from-blue-400 px-3 py-2 rounded-lg font-Montserrat font-bold text-lg space-x-2  '><IoPieChart className='h-6 w-6 text-indigo-400 dark:text-indigo-400 mr-1'/> Dashboard</Link>

    <Link onClick={handleSignout} className='text-end text-red-500 flex items-center justify-center  dark:text-red-400 lg:text-base p-1 font-Montserrat font-bold text-lg mt-8 mb-6'><IoExit  className='h-6 w-6 text-red-500 dark:text-red-400 mr-1'/>SignOut</Link>
  </Navbar.Link>):(<></>)}
  <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
</Navbar.Collapse>


</Navbar>
  )
}

export default Header