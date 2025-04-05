 

// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom';
// import scrollTop from '../healper/scrollTop';
// import displayCurrency from '../healper/displayCurrency';
// import Context from '../context';
// import addToCart from '../healper/addToCart';

// function VerticalProductCard({ loading, data = [] }) {
//     const loadingList = new Array(10).fill(null);
//     const { fetchUserAddToCart } = useContext(Context);

//     const handleAddToCart = async (e, id) => {
//         e.preventDefault();
//         e.stopPropagation();
//         try {
//             await addToCart(e, id);
//             await fetchUserAddToCart();
//         } catch (error) {
//             console.error("Failed to add to cart:", error);
//         }
//     }

//     return (
//         <div
//             style={{
//                 overflowX: 'scroll',
//                 msOverflowStyle: 'none',
//                 scrollbarWidth: 'none',
//             }}
//             className='grid grid-cols-[repeat(auto-fill,minmax(260px,320px))] justify-between gap-2 hide-scrollbar'
//         >
//             <style>
//                 {`
//                     .hide-scrollbar::-webkit-scrollbar {
//                         display: none;
//                     }
//                 `}
//             </style>

//             {loading
//                 ? loadingList.map((_, index) => (
//                     <div
//                         key={`loading-${index}`}
//                         className='w-full min-w-[300px] md:min-w-[300px] max-w-[300px] md:max-w-[310px] h-36 bg-white rounded-md shadow-md flex animate-pulse'
//                     >
//                         <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'></div>
//                         <div className='p-4 grid gap-2'>
//                             <div className='h-4 bg-slate-200 rounded'></div>
//                             <div className='h-4 bg-slate-200 rounded'></div>
//                             <div className='h-4 bg-slate-200 rounded'></div>
//                         </div>
//                     </div>
//                 ))
//                 : data.map((product) => (
//                     <Link 
//                         to={`/product/${product?._id}`}
//                         key={`product-${product?._id}`}
//                         className='w-full min-w-[300px] md:min-w-[300px] max-w-[300px] md:max-w-[300px] bg-white rounded-md shadow-md'
//                         onClick={scrollTop}
//                     >
//                         <div className='bg-slate-200 h-48 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center'>
//                             <img
//                                 src={product.productImage[0]}
//                                 alt={product.productName}
//                                 className='object-scale-down h-full cursor-pointer hover:scale-110 transition-all mix-blend-multiply'
//                                 onError={(e) => {
//                                     e.target.onerror = null;
//                                     e.target.src = '/path-to-default-image.jpg';
//                                 }}
//                             />
//                         </div>
//                         <div className='p-4 grid gap-3'>
//                             <h2 className='text-[13px] md:text-[16px] font-semibold text-ellipsis line-clamp-1 text-black'>
//                                 {product?.productName}
//                             </h2>
//                             <p className='text-[12px] md:text-[13px] text-gray-500 capitalize'>{product?.category}</p>
//                             <div className='flex items-center gap-2'>
//                                 <p className='font-medium text-[13px] md:text-[14px] text-red-600'>
//                                     {displayCurrency(product?.sellingPrice)}
//                                 </p>
//                                 <p className='font-medium text-[13px] md:text-[14px] text-gray-500 line-through'>
//                                     {displayCurrency(product?.price)}
//                                 </p>
//                             </div>
//                             <button 
//                                 className='bg-red-600 text-white px-3 py-0.5 rounded-full text-sm hover:bg-red-700'
//                                 onClick={(e) => handleAddToCart(e, product._id)}
//                             >
//                                 Add to cart
//                             </button>
//                         </div>
//                     </Link>
//                 ))}
//         </div>
//     )
// }

// export default VerticalProductCard




import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import scrollTop from '../healper/scrollTop';
import displayCurrency from '../healper/displayCurrency';
import Context from '../context';
import addToCart from '../healper/addToCart';

function VerticalProductCard({ loading, data = [] }) {
    const loadingList = new Array(4).fill(null); // Changed to 4 for better loading state
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await addToCart(e, id);
            await fetchUserAddToCart();
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    }

    return (
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
    )
}

export default VerticalProductCard



