// import React,{useEffect,useState} from 'react'


// import { useLocation } from 'react-router-dom'
// import SummmaryApi from '../common';
// import VerticalProductCard from '../components/VerticalProductCard';

// function SearchProduct() {

//     const query = useLocation();
//     const [data,setData] = useState([]);
//     const [loading,setLoading] = useState(false);

//     console.log("query",query.search);

//     const fetchProduct = async () => {
//       setLoading(true);
//         const response = await fetch(SummmaryApi.searchProduct.url+query.search);
//         const dataResponse = await response.json();
//          setLoading(false);
//          setData(dataResponse.data);
        
           
//     }

//     useEffect(() => {
//         fetchProduct();
//       }, [query.search]);

//   return (
//     <div className='container mx-auto p-4'>
//       {
//         loading && (
//           <p className='text-center'>Loading .....</p>
//         )
//       }
//         <p>Search Result : {data.length} </p>

//       {
//         data.length === 0 && loading && (
//           <p className='bg-white text-lg text-center'>No data found ...</p>
//         )
//       }

//       {
//         data.length !== 0 && !loading && (
//           <VerticalProductCard loading={loading} data={data}/>
//         )
//       }

//     </div>
//   )
// }

// export default SearchProduct


import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummmaryApi from '../common';
import VerticalProductCard from '../components/VerticalProductCard';

function SearchProduct() {
    const query = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(SummmaryApi.searchProduct.url + query.search);
            const dataResponse = await response.json();
            
            if (!response.ok) {
                throw new Error(dataResponse.message || 'Failed to fetch products');
            }
            
            setData(dataResponse.data || []);
        } catch (error) {
            setError(error.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [query.search]);

    return (
        <div className='container mx-auto p-4'>
            {loading && (
                <p className='text-center'>Loading .....</p>
            )}
            
            {error && (
                <p className='text-center text-red-500'>{error}</p>
            )}
            
            <p className='mb-4'>Search Result: {data.length}</p>

            {!loading && data.length === 0 && (
                <p className='bg-white text-lg text-center py-8'>No products found</p>
            )}

            {data.length > 0 && (
                <VerticalProductCard loading={loading} data={data}/>
            )}
        </div>
    )
}

export default SearchProduct