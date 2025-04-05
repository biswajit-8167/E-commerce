import React, { useContext, useEffect, useState } from 'react'
import SummmaryApi from '../common';
import Context from '../context';
import displayCurrency from '../healper/displayCurrency';
import { MdDelete } from "react-icons/md";

function Cart() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(context.cartProductCount).fill(null);

    const fetchData = async () => {
        const response = await fetch(SummmaryApi.addToCartViewProduct.url, {
            method: SummmaryApi.addToCartViewProduct.method,
            credentials: "include",
            headers: {
                'content-type': 'application/json'
            }
        });

    
        const responseData = await response.json();
        if (responseData.success) {
            setData(responseData.data);
        }
    }




    const incrementQuantity = async (id, qty) => {
        const response = await fetch(SummmaryApi.updateAddToCartProduct.url, {
            method: SummmaryApi.updateAddToCartProduct.method,
            credentials: "include",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1
            })
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
        }
    }

    const decrementQuantity = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummmaryApi.updateAddToCartProduct.url, {
                method: SummmaryApi.updateAddToCartProduct.method,
                credentials: "include",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1
                })
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
            }
        }
    }


    const deleteCartProduct = async (id) => {
        const response = await fetch(SummmaryApi.deleteAddToCartProduct.url, {
            method: SummmaryApi.deleteAddToCartProduct.method,
            credentials: "include",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                _id: id,

            })
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    }


    // const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
    // const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr.product?.sellingPrice), 0);
    const totalQty = data.reduce((prev, curr) => prev + (curr.quantity || 0), 0);
const totalPrice = data.reduce((prev, curr) => {
    const price = curr.product?.sellingPrice || 0;
    const qty = curr.quantity || 0;
    return prev + (price * qty);
}, 0);

    const handleLoading = async() => {
        await fetchData();
     }
 
     useEffect(() => {
          setLoading(true);
         handleLoading();
         setLoading(false);
     }, [])


    return (
        <div className='container mx-auto py-6'>
            <div className='text-center text-lg'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No data</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between'>
                {/* view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart.map((el,index) => {
                                return (
                                    <div key={el + "Add to cart" + index} className='w-full h-32 bg-slate-200 border border-slate-300 my-2 animate-pulse'>

                                    </div>
                                )
                            })

                        ) : (
                            data.map((product, index) => {
                                return (
                                    <div key={product?._id + "Add to cart"} className='w-full h-32 bg-white border border-slate-300 my-2 
                                flex gap-2'>
                                        <div className='w-32 h-full bg-slate-200 object-cover p-2'>
                                            <img src={product?.product?.productImage[0]} className='w-20 h-full object-scale-down mix-blend-multiply' />
                                        </div>
                                        <div className='w-full px-4 py-2 relative'>
                                            {/* delete produc */}
                                            <div className='absolute top-2 right-2 text-red-600 cursor-pointer rounded-full p-1 hover:bg-red-600 hover:text-white'
                                                onClick={() => deleteCartProduct(product?._id)}>
                                                <MdDelete />
                                            </div>
                                            <p className='text-[14px] lg:text-[16px] text-ellipsis line-clamp-1'>{product?.product?.productName}</p>
                                            <p className='text-sm lg:text-[14px] text-slate-500 capitalize'>{product?.product?.category}</p>
                                            <div className='flex justify-between items-center'>
                                                <p className='text-red-600 font-medium text-lg'>{displayCurrency(product?.product?.sellingPrice)}</p>
                                                <p className='text-slate-500 font-semibold text-md'>{displayCurrency(product?.product?.sellingPrice * product?.quantity)}</p>
                                            </div>
                                            <div className='flex items-center mt-2'>
                                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-4 flex justify-center items-center gap-4 rounded'
                                                    onClick={() => decrementQuantity(product?._id, product?.quantity)}>-</button>
                                                <span className='px-2'>{product?.quantity}</span>
                                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-4 flex justify-center items-center gap-4 rounded'
                                                    onClick={() => incrementQuantity(product?._id, product?.quantity)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>

                {/* Total product */}

                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 my-2 animate-pulse'>

                            </div>
                        ) : (
                            <div className='h-36 bg-white '>
                                <h2 className='text-lg font-medium bg-red-600 text-white p-1'>Summary</h2>
                                <div className='flex justify-between items-center mt-2 px-4 gap-4 text-lg font-medium text-slate-600'>
                                    <p>Quantity :</p>
                                    <p>{totalQty}</p>
                                </div>

                                <div className='flex justify-between items-center px-4 gap-4 text-lg font-medium text-slate-600 '>
                                    <p>Total Price :</p>
                                    <p>{displayCurrency(totalPrice)}</p>
                                </div>
                                <button className='w-full h-10 bg-blue-600 text-white mt-4'>Payment</button>
                            </div>
                        )
                    }
                </div>


            </div>
        </div>
    )
}

export default Cart