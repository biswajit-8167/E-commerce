import React, { useState, useEffect } from 'react'
import SummmaryApi from '../common';
import { Link } from 'react-router-dom';
function CaategoryList() {

    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async () => {
        setLoading(true);
        const response = await fetch(SummmaryApi.getCetagoryProduct.url);
        const dataResponse = await response.json();
        setLoading(false);
        setCategoryProduct(dataResponse.data);
    }


    useEffect(() => {
        fetchCategoryProduct();
    }, [])


    return (
        <div className='container mx-auto py-4 px-4'>

            <div className='flex items-center gap-4 justify-between overflow-y-scroll  scrollbar-none'>
                
                    {
                      
                      loading ?(

                            categoryLoading.map((el, index) => {
                                return (
                                    <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden 
                                        animate-pulse ' key={"category" + index }>
                                    </div>
                                )
                            })
                       
                      ):
                       (
                        categoryProduct.map((product, index) => {
                            return (
                                <Link to={'/product-category?category=' +  product?.category} className='cursor-pointer' key={product?.category}> 
                                    <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-6 bg-white shadow-md
                                    flex items-center justify-center'>
                                        <img src={product?.productImage[0]} className='w-full  object-scale-down mix-blend-multiply
                                        hover:scale-125 transition-all' />
                                    </div>
                                    <p className='text-center mt-2 text-sm md:text-base capitalize'>{product?.category}</p>
                                    {/* <p className='text-ellipsis line-clamp-2 text-[14px]  font-bold mt-3'>{product?.productName}</p> */}
                                </Link>
                            )
                        })
                       )
                    }
             

            </div>

        </div>
    )
}

export default CaategoryList

