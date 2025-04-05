import React from 'react'
import ROLE from '../common/role'
import { IoClose } from "react-icons/io5";
import SummmaryApi from '../common/index';
import { toast } from 'react-toastify';
function ChangeUserRole({name, email, role,userId,onClose,callFunc}) {

  const [userRole, setUserRole] = React.useState(role);

  const updateUserRole = async() => {
    
   const fetchResponse = await fetch(SummmaryApi.updateUser.url, {
          method: SummmaryApi.updateUser.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            userId:userId,
            role: userRole,
          })
        });

        const dataResponse = await fetchResponse.json();
         
        if (dataResponse.success) {
          toast.success(dataResponse.message);
          onClose();
          callFunc();
           

        }
        if (dataResponse.error) {
          toast.error(dataResponse.message);
        }

        console.log("Data Response:", dataResponse); // Debugging


      }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full  z-10 flex justify-center items-center 
    bg-black bg-opacity-50' >
      <div className='bg-white p-4 rounded-lg shadow-lg w-full max-w-sm'>
        
      <div className='relative' onClick={onClose}>
          <IoClose className='text-[20px] cursor-pointer absolute top-0 right-0' />
        </div>

        <h2 className='text-[18px] font-medium pb-3 mt-4'>change user role</h2>

        <p className='text-[15px] font-normal pb-1'>Name:{name}</p>
        <p className='text-[15px] font-normal pb-1'>Email:{email}</p>

        <div className='flex justify-between items-center mt-4'>
          <p className='text-[15px] font-normal pb-1'>Role</p>
          <select className=' px-2 border text-[15px] cursor-pointer' name="role" id="role"
            value={userRole} onChange={(e) => setUserRole(e.target.value)}
          >
            {
              Object.values(ROLE).map((el, index) => {
                return (
                  <option key={index} value={el}>{el}</option>
                )
              })
            }
          </select>
        </div>
        <button className='bg-red-600 text-white text-[16px] cursor-pointer px-3 py-1 rounded-full mt-6 w-fit mx-auto block hover:bg-red-700 '
         onClick={updateUserRole}
        >Change Role</button>
      </div>
    </div>
  )
}

export default ChangeUserRole