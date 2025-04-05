 

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchCategoryWiseProduct from '../healper/fetchCategoryWiseProduct';
import displayCurrency from '../healper/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import addToCart from '../healper/addToCart';
import Context from '../context';

function HorizetalCardProduct({ category, heading }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(10).fill(null);

  const scrollElement = useRef(null);

     const {fetchUserAddToCart} = useContext(Context);
  
     const handleAddToCart = async(e,id) =>{
       await addToCart(e, id);
       await fetchUserAddToCart();
     }

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  return (
    <div className='container mx-auto px-4 my-8 relative'>
      <h2 className='text-[22px] font-semibold py-3'>{heading}</h2>

      {/* Scrollable container with hidden scrollbar */}
      <div
        ref={scrollElement}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          overflowX: 'scroll',
          msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
        }}
        className='hide-scrollbar' // Class for WebKit browsers
      >
        {/* Hide scrollbar for Chrome, Safari, and Opera */}
        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {/* Scroll buttons (only visible on desktop) */}
        <button
          className='bg-white rounded-full p-1 absolute left-0 text-xl hidden md:block transition-all z-10'
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className='bg-white rounded-full p-1 absolute right-0 text-xl hidden md:block transition-all z-10'
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {/* Loading skeleton */}
        {loading
            
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className='w-full min-w-[300px] md:min-w-[320px] max-w-[300px] md:max-w-[300px] h-36 bg-white rounded-md shadow-md flex animate-pulse'
              >
                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'></div>
                <div className='p-4 grid gap-2'>
                  <div className='h-4 bg-slate-200 rounded'></div>
                  <div className='h-4 bg-slate-200 rounded'></div>
                  <div className='h-4 bg-slate-200 rounded'></div>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link to={`/product/${product._id}`}
                key={index}
                className='w-full min-w-[300px] md:min-w-[320px] max-w-[300px] md:max-w-[300px] h-36 bg-white rounded-md shadow-md flex'
              >
                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className='object-scale-down h-full cursor-pointer hover:scale-110 transition-all'
                  />
                </div>
                <div className='p-4 grid'>
                  <h2 className='text-[13px] md:text-[16px] font-semibold text-ellipsis line-clamp-1 text-black'>
                    {product?.productName}
                  </h2>
                  <p className='text-[12px] md:text-[13px] text-gray-500 capitalize'>{product?.category}</p>
                  <div className='flex items-center justify-between gap-2'>
                    <p className='font-medium text-[13px] md:text-[14px] text-red-600'>
                      {displayCurrency(product?.sellingPrice)}
                    </p>
                    <p className='font-medium text-[13px] md:text-[14px] text-gray-500 line-through'>
                      {displayCurrency(product?.price)}
                    </p>
                  </div>
                  <button className='bg-red-600 text-white px-3 py-0.5 rounded-full text-sm hover:bg-red-700'
                  onClick={(e) => handleAddToCart(e, product._id)}>
                    Add to cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}

export default HorizetalCardProduct;
