import React from 'react'
import { IoClose } from "react-icons/io5";
function DisplayImage({
    imageurl, onClose
}) {
    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 w-full h-full flex justify-center items-center'>
            <div className='relative bg-white shadow-lg max-w-[80%] mx-auto max-h-[80%] rounded-md'>

                <div className='cursor-pointer text-2xl w-fit hover:text-red-600 absolute top-2 right-2' onClick={onClose}>
                    <IoClose/>
                </div>

                <div className='flex items-center justify-center max-w-[80vh] max-h-[50vh]'>
                    <img src={imageurl} className='w-[80%] h-full' />
                </div>
            </div>
        </div>
    )
}

export default DisplayImage