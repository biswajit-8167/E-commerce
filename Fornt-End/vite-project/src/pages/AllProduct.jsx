import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import AdminProductCard from '../components/AdminProductCard'
import SummmaryApi from '../common';

function AllProduct() {

  const [uploadProduct, setUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const allProductResponse = await fetch(SummmaryApi.allProduct.url);
    const allDataResponse = await allProductResponse.json();

    console.log("get data", allDataResponse);

    setAllProduct(allDataResponse?.data || []);
  }

  useEffect(() => {
    fetchAllProduct();
  }, [])

  return (
    <div>
      <div className=' bg-white py-2 px-4 flex justify-between items-center'>
        <h1 className='text-[18px] font-bold'>All Products</h1>
        < button className='border-2 border-red-600 px-3 py-1 rounded-full text-red-600 text-[15px] font-medium
      hover:bg-red-600 hover:text-white transition-all' onClick={() => setUploadProduct(true)}>Upload Product</button>
      </div>

      {/* all product */}

      <div className='flex  flex-wrap gap-3 py-3  h-[calc(100vh-180px)]  overflow-y-scroll'>

        {
          allProduct.map((product, index) => {
            return (
              <AdminProductCard data={product} key={index + 'allProduct'}
                fetchData={fetchAllProduct}
              />

            )
          })
        }

      </div>



      {/* upload product component */}

      {
        uploadProduct && (
          <UploadProduct onClose={() => setUploadProduct(false)} fetchData={fetchAllProduct} />
        )
      }

    </div>
  )
}

export default AllProduct