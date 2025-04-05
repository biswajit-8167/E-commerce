import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { IoSearch } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummmaryApi from '../common/index';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import Context from '../context';
function Navbar() {
   const user = useSelector(state => state?.user?.user);
   // console.log("user header", user);

   const dispatch = useDispatch();
   const [menuDisplay, setMenuDisplay] = useState(false);
   const context = useContext(Context)
   const navigate = useNavigate();
   const searchInput = useLocation();
   const URLsearch =new URLSearchParams(searchInput?.search);
   const searchQuery = URLsearch.get('q');
   const [search, setSearch] = useState( searchQuery || '');

   console.log("searchInput", searchInput?.search.split("=")[1]);

   const handlelogout = async () => {
      const featchData = await fetch(SummmaryApi.logout_user.url, {
         method: SummmaryApi.logout_user.method,
         credentials: "include",

      });

      const dataFeatch = await featchData.json();

      if (dataFeatch.success) {
         toast.success(dataFeatch.message);
         dispatch(setUserDetails(null));
         navigate('/');

      }
      if (dataFeatch.error) {
         toast.error(dataFeatch.message);

      }
   }

   // search ...product

   const handleSearchProduct =async (e) => {
       const {value} = e.target;

       setSearch(value);

       if(value){
         navigate(`/search?q=${value}`);
       }else{
         navigate('/search');
       }
   }
 

   return (
      <header className='bg-white h-16 shadow-md fixed w-full z-50'>
         <div className='h-full container mx-auto flex items-center justify-between px-4'>
            <Link to={'/'}>
               <Logo w={90} h={100} />
            </Link>

            <div className='hidden w-[50%] ml-4  md:flex items-center  justify-between max-w-sm border rounded-full focus-within:shadow-sm '>
               <input type='text' placeholder='search product here ...' className='w-[30%] text-sm pl-2  md:w-full md:pl-4outline-none h-8 rounded-l-full  ' 
               onChange={handleSearchProduct} value={search}/>
               <div className='hidden text-[22px] text-white bg-red-600 rounded-r-full min-w-[50px] h-8 md:flex items-center justify-center cursor-pointer'>
                  <IoSearch />
               </div>
            </div>

            <div className='flex items-center gap-7'>
               <div className='relative flex justify-center items-center'>

                  {
                     user?._id && (
                        <div className='text-[26px] cursor-pointer' onClick={() => setMenuDisplay(!menuDisplay)}>
                           {
                              user?.profilePic ? (
                                 <img src={user?.profilePic} className='w-10 h-10 rounded-full' />
                              ) : (
                                 <FaRegCircleUser />
                              )
                           }

                        </div>
                     )
                  }

                  {
                     menuDisplay && (
                        <div className='absolute bottom-0 top-10 h-fit bg-white p-2 rounded-lg shadow-lg ' onClick={() => setMenuDisplay(!menuDisplay)}>

                           {
                              user?.role === ROLE.ADMIN && (
                                 <Link to={'/admin-panel/all-products'} className='whitespace-nowrap hidden md:block  hover:bg-slate-200 text-[15px]'>Admin Panel</Link>
                              )
                           }

                        </div>
                     )
                  }


               </div>

               {
                  user?._id && (
                     <Link to={'/cart'} className='text-[24px] relative cursor-pointer'>
                        <span> <FaShoppingCart /></span>

                        <div className='w-5 h-5 p-1 bg-red-600 text-white rounded-full flex items-center justify-center absolute top-[-10px] right-[-10px]'>
                           <p className='text-sm'>{context?.cartProductCount}</p>
                        </div>
                     </Link>
                  )
               }


               <div>
                  {
                     user?._id ? (
                        <button onClick={handlelogout} className=' bg-red-600 text-white px-[10px] py-[2px] rounded-full hover:bg-red-700'>Logout</button>
                     ) :
                        (
                           <Link to={'/login'} className=' bg-red-600 text-white px-[10px] py-[2px] rounded-full hover:bg-red-700'>Login</Link>
                        )
                  }

               </div>
            </div>
         </div>

      </header>
   )
}

export default Navbar