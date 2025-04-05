

import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SummmaryApi from '../common';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayCurrency from '../healper/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../healper/addToCart';
import Context from '../context';

function ProductDetails() {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    discription: "",
    price: "",
    sellingPrice: "",
  });

    const {fetchUserAddToCart} =useContext(Context);
    const navigate = useNavigate();

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomImageStyle, setZoomImageStyle] = useState({});

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummmaryApi.ProductDetails.url, {
      method: SummmaryApi.ProductDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId: params?.id })
    })
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse.data);
    setActiveImage(dataResponse.data.productImage[0]);
  }

  useEffect(() => {
    fetchProductDetails();
  }, [params.id]);

  const handleMouseEnterProduct = (imaUrl) => {
    setActiveImage(imaUrl);
  }

  const handleZoomImage = useCallback((e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomImageStyle({
      backgroundImage: `url(${activeImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%',
      backgroundRepeat: 'no-repeat'
    });
    setZoomImage(true);
  }, [activeImage]);

  const handleZoomOutIamge = () => {
    setZoomImage(false);
  }

  const handleAddToCart = async (e,id) => {
    await addToCart(e,id);
    fetchUserAddToCart();

  }

  const handleByProduct = async (e,id) => {
    await addToCart(e,id);
    fetchUserAddToCart();
    navigate('/cart');
  }
 

  return (
    <div className='container mx-auto py-6'>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Left Column - Product Images */}
        <div className='flex flex-col-reverse lg:flex-row gap-4 '>
          {/* Thumbnail Images */}
          <div className='flex  lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible scrollbar-none'>
            {
              loading ? (
                productImageLoading.map((_, index) => (
                  <div className='h-20 w-20 bg-slate-200 rounded-md animate-pulse' key={`loading-${index}`} />
                ))
              ) : (
                data.productImage.map((imgUrl) => (
                  <div className='h-20 w-20 bg-slate-200 rounded-md p-1 flex-shrink-0' key={imgUrl}>
                    <img
                      src={imgUrl}
                      className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'
                      onMouseEnter={() => handleMouseEnterProduct(imgUrl)}
                      onClick={() => setActiveImage(imgUrl)}
                    />
                  </div>
                ))
              )
            }
          </div>

          {/* Main Image */}
          <div className='h-[300px] w-full lg:h-96 lg:w-96 bg-slate-200 relative p-10'>
            <img
              src={activeImage}
              className='w-full h-full object-scale-down mix-blend-multiply cursor-zoom-in'
              alt={data.productName}
              onMouseMove={handleZoomImage}
              onMouseEnter={() => setZoomImage(true)}
              onMouseLeave={handleZoomOutIamge}
            />
          </div>
        </div>

        {/* Middle Column - Product Details */}
        <div className='flex-1 flex flex-col gap-4'>
          {
            loading ? (
              <>
                <div className='bg-slate-200 animate-pulse h-6 w-24 rounded-full' />
                <div className='bg-slate-200 animate-pulse h-8 w-full rounded' />
                <div className='bg-slate-200 animate-pulse h-4 w-32 rounded' />
                <div className='flex gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className='bg-slate-200 animate-pulse h-5 w-5 rounded' />
                  ))}
                </div>
                <div className='flex gap-3'>
                  <div className='bg-slate-200 animate-pulse h-8 w-24 rounded' />
                  <div className='bg-slate-200 animate-pulse h-8 w-24 rounded' />
                </div>
                <div className='bg-slate-200 animate-pulse h-4 w-full rounded' />
                <div className='bg-slate-200 animate-pulse h-16 w-full rounded' />
              </>
            ) : (
              <>
                <span className='bg-red-200 text-red-600 px-3 py-0.5 rounded-full text-sm inline-block w-fit'>
                  {data.brandName}
                </span>
                <h1 className='text-2xl lg:text-3xl font-medium'>{data.productName}</h1>
                <p className='text-slate-400 capitalize text-sm'>{data.category}</p>
                <div className='flex items-center gap-1 text-red-500'>
                  {[...Array(4)].map((_, i) => <FaStar key={`star-${i}`} />)}
                  <FaStarHalf />
                </div>
                <div className='flex items-center gap-3 text-xl lg:text-2xl font-medium'>
                  <span className='text-red-600'>{displayCurrency(data.sellingPrice)}</span>
                  <span className='text-slate-400 line-through'>{displayCurrency(data.price)}</span>
                </div>
                <div className='flex gap-4'>
                  <button className='border-2 border-red-600 rounded px-3 py-1 text-red-600 font-medium hover:bg-red-600 hover:text-white transition-all'
                 onClick={(e) => handleByProduct(e, data._id)}>
                    Buy Now
                  </button>
                  <button className='border-2 border-red-600 rounded px-3 py-1 font-medium bg-red-600 text-white hover:text-red-600 hover:bg-white transition-all'
                   onClick={(e) => handleAddToCart(e, data._id)}>
                    Add To Cart
                  </button>
                </div>
                <div>
                  <h3 className='text-slate-600 font-medium'>Description:</h3>
                  <p className='text-slate-600'>{data.discription}</p>
                </div>
              </>
            )
          }
        </div>

        {/* Right Column - Zoom Container */}
        <div className='my-4'>
          {zoomImage && (
            <div className='hidden lg:block h-[400px] w-[400px] lg:h-96 lg:w-96 bg-slate-200 m absolute top-[90px] right-[440px] overflow-hidden '>
              <div
                className=' w-full h-full min-w-[400px] min-h-[400px] bg-no-repeat bg-cover mix-blend-multiply'
                style={zoomImageStyle}
              />
            </div>
          )}
        </div>
      </div>

    
    {
      data.category && (
        <CategoryWiseProductDisplay category={data.category} heading={"Recommended"}/>
      )
    }

    
    </div>
  )
}

export default ProductDetails