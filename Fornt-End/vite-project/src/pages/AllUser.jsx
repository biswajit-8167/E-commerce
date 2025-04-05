import React, { useEffect, useState } from 'react'
import SummmaryApi from '../common/index'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
function AllUser() {
  const [allUser, setAllUser] = useState([])
   const [openUpdateRole, setOpenUpdateRole] = useState(false);
   const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: ""
   })

  const feathAllUser = async () => {
    try {
      const fetchData = await fetch(SummmaryApi.allUser.url, {
        method: SummmaryApi.allUser.method,
        credentials: "include",
      })
      const dataResponse = await fetchData.json()

      if (dataResponse.success) {
        setAllUser(dataResponse.data)
      }
      if (dataResponse.error) {
        toast.error(dataResponse.message)
      }

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    feathAllUser();
  }, [])


  return (
    <div className='bg-white p-5'>
 
      <table className='w-full'>
        <thead className='bg-black text-white'> 
          <tr>
            <th className='text-base font-medium border '>Sr.No</th>
            <th className='text-base font-medium border'>Name</th>
            <th className='text-base font-medium border'>Email</th>
            <th className='text-base font-medium border'>Role</th>
            <th className='text-base font-medium border'>Create Date</th>
            <th className='text-base font-medium border'>Action</th>
          </tr>
        </thead>
        <tbody >
          {
           allUser.map((el,index) =>{
            return(
               <tr>
                  <td className='text-[14px] font-normal border text-center'>{index+1}</td>
                  <td className='text-[14px] font-normal border text-center'>{el?.name}</td>
                  <td className='text-[14px] font-normal border text-center'>{el?.email}</td>
                  <td className='text-[14px] font-normal border text-center'>{el?.role}</td>
                  <td className='text-[14px] font-normal border text-center'>{moment(el?.createdAt).format("LL")}</td>
                  <td className='text-[14px] font-normal border text-center'>
                    <button className='bg-green-100 p-1 cursor-pointer rounded-full hover:bg-green-400 hover:text-white'
                     onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true)}}>
                      <MdModeEdit />
                    </button>
                  </td>

               </tr>
            )
           })
          }
        </tbody>
      </table>

      {
        openUpdateRole && (
          <ChangeUserRole onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails?.name}
          email={updateUserDetails?.email}
          role={updateUserDetails?.role}  
          userId={updateUserDetails?._id}
           callFunc={feathAllUser}
          />
        )
      }
    
    </div>
  )
}

export default AllUser