 
import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import productCategory from '../healper/productCategory';
import { MdCloudUpload } from "react-icons/md";
import UploadImage from '../healper/UploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummmaryApi from '../common/index';
import { toast } from 'react-toastify';

function UploadProduct({ onClose,fetchData }) {
    const [data, setData] = useState({
        productName: '',
        brandName: '',
        category: '',
        productImage: [],
        discription: '',
        price: '',
        sellingPrice: '',
    });

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        const uploadImageCloudinary = await UploadImage(file);

        setData((prevState) => ({
            ...prevState,
            productImage: [...prevState.productImage, uploadImageCloudinary.url],
        }));
    };

    const handleDeleteProductImage = async (index) => {
        console.log('image index', index)

        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);
        setData((prevState) => ({
            ...prevState,
            productImage: [...newProductImage],
        }));
    }

    // upload Product

    const handleSubmitProduct = async (e) => {
        e.preventDefault();

        const uploadDataResponse = await fetch(SummmaryApi.uploadProduct.url, {
            method: SummmaryApi.uploadProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const ResponseUploadData = await uploadDataResponse.json();

        if (ResponseUploadData.success) {
            toast.success(ResponseUploadData.message);
            onClose();
            fetchData();
        }
        if (ResponseUploadData.error) {
            toast.error(ResponseUploadData.message);
        }

    }

    return (
        <>
            <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-black bg-opacity-50'>
                <div className='bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl h-full max-h-[80%] flex flex-col'>
                    {/* Header */}
                    <div className='relative flex justify-between items-center pb-3'>
                        <h2 className='text-[16px] font-semibold pb-3 mt-4'>Upload Product</h2>
                        <div className='cursor-pointer text-2xl w-fit hover:text-red-600' onClick={onClose}>
                            <IoClose />
                        </div>
                    </div>

                    {/* Scrollable Form Content */}
                    <form className='flex-1 overflow-y-scroll px-4 grid gap-4' onSubmit={handleSubmitProduct}>
                        <div>
                            <label htmlFor='productName' className='text-[15px] font-medium cursor-pointer'>Product Name :</label>
                            <input
                                type='text'
                                id='productName'
                                name='productName'
                                placeholder='Enter Product Name'
                                value={data.productName}
                                onChange={handleChange}
                                required
                                className='bg-slate-100 border p-2 text-[13px] font-normal rounded-md w-full mt-1'
                            />
                        </div>

                        <div>
                            <label htmlFor='brandName' className='text-[15px] font-medium cursor-pointer'>Brand Name :</label>
                            <input
                                type='text'
                                id='brandName'
                                name='brandName'
                                placeholder='Enter Brand Name'
                                value={data.brandName}
                                onChange={handleChange}
                                required
                                className='bg-slate-100 border p-2 text-[13px] font-normal rounded-md w-full mt-1'
                            />
                        </div>

                        <div>
                            <label htmlFor='category' className='text-[15px] font-medium cursor-pointer'>Category :</label>
                            <select
                                id='category'
                                name='category'
                                value={data.category}
                                onChange={handleChange}
                                required
                                className='bg-slate-100 border p-2 text-[13px] font-normal rounded-md w-full mt-1'
                            >
                                <option value={""}>select category</option>
                                {productCategory.map((el, index) => (
                                    <option key={el.value + index} value={el.value}>
                                        {el.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor='productImage' className='text-[15px] font-medium cursor-pointer'>Product Image :</label>
                            <label htmlFor='uploadImageInput'>
                                <div className='bg-slate-100 border p-2 rounded-md w-full h-[200px] mt-1'>
                                    <div className='flex flex-col justify-center items-center h-full gap-3 cursor-pointer'>
                                        <MdCloudUpload className='text-[40px] text-gray-500 mx-auto cursor-pointer' />
                                        <p className='text-[15px] text-gray-500'>Upload product image</p>
                                        <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} required />
                                    </div>
                                </div>
                            </label>
                        </div>

                        <div>
                            {data?.productImage[0] ? (
                                <div className='flex flex-wrap gap-2 items-center'>
                                    {
                                        data.productImage.map((el, index) => (
                                            <div className='relative group'>
                                                <img key={index} src={el} alt={`product-${index}`} width={80} height={80}
                                                    className='bg-slate-200 border w-[100px] h-[80px] cursor-pointer'
                                                    onClick={() => {
                                                        setOpenFullScreenImage(true)
                                                        setFullScreenImage(el)
                                                    }} />

                                                <div className='absolute bottom-0 right-0 text-[13px] p-1 w-fit bg-red-700 text-white cursor-pointer 
                                                    rounded-full hidden group-hover:block' onClick={() => handleDeleteProductImage(index)}>
                                                    <MdDelete />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <p className='text-[12px] text-red-500 '>*Please upload product image</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor='price' className='text-[15px] font-medium cursor-pointer'>Price :</label>
                            <input
                                type='number'
                                id='price'
                                name='price'
                                placeholder='Enter Product Price'
                                value={data.price}
                                onChange={handleChange}
                                required
                                className='bg-slate-100 border p-2 text-[13px] font-normal rounded-md w-full mt-1'
                            />
                        </div>


                        <div>
                            <label htmlFor='sellingPrice' className='text-[15px] font-medium cursor-pointer'>selling Price :</label>
                            <input
                                type='number'
                                id='sellingPrice'
                                name='sellingPrice'
                                placeholder='Enter selling Price '
                                value={data.sellingPrice}
                                onChange={handleChange}
                                required
                                className='bg-slate-100 border p-2 text-[13px] font-normal rounded-md w-full mt-1'
                            />
                        </div>

                        <div>
                            <label htmlFor='discription' className='text-[15px] font-medium cursor-pointer'>Discription :</label>
                            <textarea className='bg-slate-100 h-[200px] border p-2 text-[13px] resize-none font-normal 
                         rounded-md w-full mt-1'
                                name='discription' id='discription'
                                value={data.discription} onChange={handleChange}
                                required
                                placeholder='Enter Product Discription'>

                            </textarea>
                        </div>

                        <div className='p-4 border-t'>
                            <button type='submit' className='w-full bg-red-600 text-white py-2 rounded-md'>
                                Upload Product
                            </button>
                        </div>

                    </form>

                </div>

                {/* display image full screen */}

                {
                    openFullScreenImage && (
                        <DisplayImage imageurl={fullScreenImage} onClose={() => setOpenFullScreenImage(false)} />
                    )
                }

            </div>
        </>
    );
}

export default UploadProduct;