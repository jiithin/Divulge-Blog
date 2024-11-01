
import { TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
//import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

import { TbLoader } from 'react-icons/tb';

function Home() {
  //const {currentUser}=useSelector((state)=>state.user)
  const [userPosts,setUserPosts]=useState([])
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  //get all posts only 9 posts willshow becoz we set a query limiter
  useEffect(()=>{
    const fetchPosts=async()=>{
      try{
        const res=await fetch(`/blog/post/getposts`)
        const data=await res.json()
        if(res.ok){
          setUserPosts(data.posts)
        }
        //console.log(data)
      }catch(error){
        console.log(error.message)
      }
    };

      fetchPosts()
  });


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
    
    
<>
{/* second nav */}
<div className="">
<div className="flex flex-wrap place-items-center font-Montserrat ">
  <section className="relative mx-auto">

    <div className="flex justify-between bg-transparent ">
      <div className=" py-6 flex items-center">
        <p className="flex text-xl lg:text-3xl font-medium mr-3 text-slate-600 dark:text-slate-300">Welcome to
          <span className='text-2xl lg:text-3xl px-2 font-ElsieSwash font-semibold text-transparent bg-clip-text bg-gradient-to-l to-blue-300 from-purple-500'>Divulge.</span> Blog
        </p>
          <div className='hidden lg:inline '>
          <Link to={'/blogs'} className='px-3'>
            Latest Blogs
            </Link>
          <Link to={'/updates'} className='px-5'>
          Guidelines
            </Link>
            <span className='text-2xl'>|</span>
            <Link to={'/about'} className='px-3'>
            About Us
            </Link>
        </div>
        </div>




        <div className="justify-center items-center py-6 hidden lg:inline">
        <form onSubmit={handleSubmit}>
  <TextInput
    type='text'
    placeholder='Search...'
    rightIcon={IoSearchOutline}
    className=''
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  </form>

      </div>
    </div>
    <div className='flex items-center lg:hidden'>
          <Link to={'/blogs'} className='px-5'>
            Latest Blogs
            </Link>
          <Link to={'/updates'} className='px-3'>
          Guidelines
            </Link>
            <span className='text-2xl'>|</span>
            <Link to={'/about'} className='px-3'>
            About
            </Link>
            <form onSubmit={handleSubmit} className='hidden md:inline'>
  <TextInput
    type='text'
    placeholder='Search...'
    rightIcon={IoSearchOutline}
    className=''
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  </form>
        </div>
  </section>
</div>
</div>



{/* card top only one */}
{userPosts && userPosts.length > 0 ? ( 
<div className="mx-auto h-auto flex items-center justify-center max-w-6xl px-5 my-8 " onClick={(e) =>  navigate(`/post/${userPosts[0].slug}`)}>
  <div className="flex flex-col w-full rounded shadow-lg ">
    <div className="w-full h-64 bg-top bg-cover rounded-t">
    <img src={userPosts[0].image} alt={userPosts[0].title} className='h-full w-full object-cover' />
    </div>
    <div className="flex flex-col w-full md:flex-row dark:bg-gray-300">
        <div className="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 dark:text-white uppercase bg-white dark:bg-gray-800 md:flex-col md:items-center md:justify-center md:w-1/4">
            <div className="md:text-xl">Latest</div>
            <div className="md:text-3xl">{new Date(userPosts[0].createdAt).toLocaleDateString()}  </div>
        </div>
        <div className="p-4 font-normal text-gray-800 md:w-3/4">
            <p className="py-1 text-4xl font-Montserrat font-semibold leading-none tracking-tight text-gray-800 line-clamp-2">{userPosts[0].title}</p>
            <p className="leading-normal" dangerouslySetInnerHTML={{ __html: userPosts && userPosts[0].content.slice(0, userPosts[0].content.indexOf('.'))}}></p>
            <div className="flex flex-row items-center mt-4 text-gray-700">
                <div className="w-auto bg-slate-900 text-white font-Montserrat p-1">
                {userPosts[0].category}
                </div>
                <div className="w-full flex justify-end text-gray-400">
                {userPosts[0] && (userPosts[0].content.length / 1000).toFixed(0)} mins read
                </div>
            </div>
        </div>
    </div>
</div>
</div>
):(
  <div className='flex justify-center items-center min-h-screen'>

  {/* loader custom */}
  <div className="w-full gap-x-2 flex justify-center items-center">
  <p className='text-gray-500'>Try reloading</p>
        <TbLoader    className='w-8 h-8 text-purple-600 animate-spin'/>
  </div>
  
        </div>
    )}

{/* <div><p id='head'>DIVULGE</p></div> */}




{/* cards middle*/}
<div className='max-w-6xl mx-auto px-5'>

<div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1  gap-4  ">
  

  {/* card */}
{userPosts && userPosts.length > 0 ? ( userPosts.slice(1,5).map((post) => (
<div
  className="card shadow-lg lg:h-[20em] h-[15em] max-w-screen-2xl group gap-[0.5em] relative flex justify-end flex-col z-10 overflow-hidden " onClick={(e) =>  navigate(`/post/${post.slug}`)}>
    <img src={ post.image} alt={ post.title} className="absolute align-middle top-0 left-0 w-full h-full  object-cover" />
  <div className="absolute align-middle top-0 left-0 h-full w-full group-hover:backdrop-blur-sm bg-gradient-to-b from-transparent via-transparent to-gray-900 group-hover:bg-gray-900/40"></div>


  <div
    className="container text-white z-10  font-Montserrat flex flex-col gap-1"
  >
    
    <div className="h-fit w-full">
      {/* category tag */}
    <div className="flex justify-center items-center h-fit w-fit gap-1">
      <div className="  text-black font-semibold text-sm p-1 bg-gray-100 duration-300 cursor-pointer">
        <p>{post.category}</p>
      </div>
    </div>
      
    <p className="card_heading lg:text-xl px-1 font-semibold text-md text-gray-100 line-clamp-2">
        {post.title}
      </p>
      {/* <p className="text-sm text-gray-200">
        {post.username}
      </p> */}
    </div>

    {/* <div className="flex justify-left items-center h-fit w-full gap-2">
      <div className="w-fit h-fit text-gray-300  text-xs font-light">
        <p>{post && new Date(post.createdAt).toLocaleDateString()}</p>
        
      </div>
    </div> */}
  </div>
  <p
    className=" block px-3 text-sm text-pretty lg:text-base text-blackfont-light relative h-[0em] group-hover:h-24 leading-[1.2em] duration-500 overflow-hidden text-gray-300 "
    dangerouslySetInnerHTML={{ __html: post && post.content }} >
    
  </p>
</div>
))):(
  <>
{/* loading card */}
<div className="hidden lg:block md:block">
</div>
</>


)}
</div>
</div>


{/* list end */}
<div className="flex flex-col h-auto bg-transparent items-center mt-5 font-Montserrat mx-auto max-w-6xl mb-5">
  <div className="grid gap-7  px-5 grid-cols-3 ">
   {/* cards */}
   {userPosts && userPosts.length > 0 ? (userPosts.slice(5,8).map((post) => (
  <div className="relative mx-auto col-span-3 md:col-span-2 lg:col-span-2 w-full pt-3">
  <Link to={`/post/${post.slug}`} className="relative inline-block w-full transform transition-transform duration-300 ease-in-out">
    <div className="rounded-lg">
      <div className="relative bg-purple-800/20 flex h-auto justify-center overflow-hidden">
        <div className="w-auto h-40 lg:h-52 transform transition-transform duration-500 ease-in-out hover:scale-110">
          <img src={ post.image} alt={ post.title} />
        </div>


        <span className="absolute left-0 top-0 z-10 ml-3 mt-3 inline-flex select-none bg-gray-100 px-2 py-1 text-sm text-slate-900 font-semibold">{post.category}</span>
      </div>

      <div className="">
        <div className="mt-4">
          <div className="flex items-center">
            <div className="relative">
              <p className="line-clamp-1 text-base lg:text-2xl  font-semibold text-gray-800 dark:text-gray-200 md:text-lg" title="New York">{post.title}</p>
              <p className="mt-1 line-clamp-1 text-sm text-gray-500 dark:text-gray-300"><span className=' font-semibold'>{post.username}</span>	·  {post && (post.content.length / 1000).toFixed(0)} mins read</p>
              <p className=" text-gray-400 dark:text-gray-500 text-xs">{post && new Date(post.createdAt).toLocaleDateString()} </p>
            </div>
          </div>
        </div>

        <p
    className=" block h-20 lg:h-24 text-sm text-pretty lg:text-base text-blackfont-light relative group-hover:h-24 leading-[1.2em] duration-500 overflow-hidden text-gray-900 dark:text-gray-300 "
    dangerouslySetInnerHTML={{ __html: post && post.content }} >
    
  </p>

        <div className="mt-4 border-b border-gray-300 dark:border-gray-700 ">

        </div>
      </div>
    </div>
  </Link>
</div>))):(
      <div className='flex justify-center items-center w-screen  min-h-screen '>

      </div>
)}

<div className="col-span-1 items-start pt-3 hidden md:block lg:block">
<div className="mx-auto max-w-xs rounded-xl px-3 text-gray-600 dark:text-gray-100">
  <p className="mb-4 w-fit rounded-md bg-purple-200 dark:bg-purple-200/70 px-2 py-1 text-sm font-medium text-purple-700 dark:text-purple-800">Related</p>
  <p className="mb-2 text-2xl">Read our Community guidelines</p>
  <p className="mb-6 text-gray-500 dark:text-gray-300">Avoid offensive or derogatory language. Be mindful of the words you choose and their potential impact on readers. 
    <span className='hidden lg:inline'>
  When referencing others' work, always give credit. This not only shows respect for the original creator but also enhances your credibility.
    </span> </p>
  <Link to={'/updates'} className="flex items-center space-x-2 rounded-md px-4 py-2 font-semibold text-purple-500 hover:text-purple-600 group"> Learn more
    <span><IoIosArrowForward className='w-5 h-5 group-hover:translate-x-2 ml-1 duration-300 delay-150' /></span>
  </Link>
</div>

</div>
</div>
</div>


</>
  )
}

export default Home