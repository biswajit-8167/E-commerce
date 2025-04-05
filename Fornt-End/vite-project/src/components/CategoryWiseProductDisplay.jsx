

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchCategoryWiseProduct from '../healper/fetchCategoryWiseProduct';
import displayCurrency from '../healper/displayCurrency';
import addToCart from '../healper/addToCart';
import Context from '../context';
import scrollTop from '../healper/scrollTop';

function CategoryWiseProductDisplay({ category, heading }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(10).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
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



  return (
    <div className='container mx-auto px-4 my-8 relative'>
      <h2 className='text-[22px] font-semibold py-3'>{heading}</h2>


      <div className="container mx-auto px-4">
        {/* Main grid container for 4 products per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? loadingList.map((_, index) => (
              <div
                key={`loading-${index}`}
                className='w-full h-80 bg-white rounded-md shadow-md flex flex-col animate-pulse'
              >
                <div className='bg-slate-200 h-48 w-full'></div>
                <div className='p-4 grid gap-2 flex-grow'>
                  <div className='h-4 bg-slate-200 rounded'></div>
                  <div className='h-4 bg-slate-200 rounded'></div>
                  <div className='h-4 bg-slate-200 rounded'></div>
                  <div className='h-8 bg-slate-200 rounded mt-2'></div>
                </div>
              </div>
            ))
            : data.map((product) => (
              <Link
                to={`/product/${product?._id}`}
                key={`product-${product?._id}`}
                className='w-full bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-300'
                onClick={scrollTop}
              >
                <div className='bg-slate-200 h-48 w-full flex justify-center items-center p-2'>
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className='object-contain h-full w-full hover:scale-105 transition-transform duration-300 mix-blend-multiply'
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/path-to-default-image.jpg';
                    }}
                  />
                </div>
                <div className='p-4 grid gap-3'>
                  <h2 className='text-sm md:text-base font-semibold text-ellipsis line-clamp-1 text-black'>
                    {product?.productName}
                  </h2>
                  <p className='text-xs md:text-sm text-gray-500 capitalize'>{product?.category}</p>
                  <div className='flex items-center gap-2'>
                    <p className='font-medium text-sm md:text-base text-red-600'>
                      {displayCurrency(product?.sellingPrice)}
                    </p>
                    {product?.price > product?.sellingPrice && (
                      <p className='font-medium text-xs md:text-sm text-gray-500 line-through'>
                        {displayCurrency(product?.price)}
                      </p>
                    )}
                  </div>
                  <button
                    className='bg-red-600 text-white px-3 py-1.5 rounded-full text-sm hover:bg-red-700 transition-colors duration-300 mt-2'
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryWiseProductDisplay;
