

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from 'react-icons/fa6';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);
  const navegate = useNavigate();

  useEffect(() => {
      if(user?.role !== ROLE.ADMIN){
          navegate('/');
        
      }
  },[user])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
      <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
        <div className='h-32 flex items-center justify-center flex-col gap-1 mt-6'>
          <div className='text-4xl cursor-pointer flex items-center justify-center'>
            {user?.profilePic ? (
              <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt='Profile' />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className='capitalize text-[15px] font-medium'>{user?.name}</p>
          <p className='text-[13px]'>{user?.role}</p>
        </div>

        {/* Navigation */}
        <div>
          <nav className='grid p-4 gap-1'>
            <Link to={'all-user'} className='px-2 text-[14px] hover:bg-slate-200 font-medium'>
              All User
            </Link>
            <Link to={'all-products'} className='px-2 text-[14px] hover:bg-slate-200 font-medium'>
              All Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className='w-full h-full p-2'>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPanel;