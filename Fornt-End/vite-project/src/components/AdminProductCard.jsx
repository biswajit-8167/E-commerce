import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayCurrency from '../healper/displayCurrency';

function AdminProductCard({ data, fetchData }) {
  const [editProduct, setEditProduct] = useState(false);



  return (
    <div className='w-[200px] h-[260px] bg-white p-2 shadow-md rounded-md'>
      <div className='w-[180px]'>
        <div className='w-32 h-32 flex justify-center items-center'>
          <img src={data?.productImage[0]} className='mx-auto object-fill h-full' />
        </div>
        <h2 className='text-ellipsis line-clamp-2 text-[14px]  font-bold mt-3'>{data?.productName}</h2>

        <div>

          <p className='text-[13px] font-semibold mt-1'>
            {
              displayCurrency(data?.sellingPrice)
            }

          </p>

          <div
            className='w-fit ml-auto bg-green-100 rounded-full p-2 hover:text-white cursor-pointer hover:bg-green-700'
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          onClose={() => setEditProduct(false)}
          productData={data}
          fetchData={fetchData} // Pass the update function
        />
      )}
    </div>
  );
}
export default AdminProductCard