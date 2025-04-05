 
import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import productCategory from '../healper/productCategory';
import VerticalProductCard from '../components/VerticalProductCard';
import SummmaryApi from '../common';

function CategoryProduct() {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]); // Store original data for sorting
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    // Get initial categories from URL
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListArray = urlSearch.getAll('category') || [];

    // Initialize state with categories from URL
    const initialCategoryState = productCategory.reduce((acc, category) => {
        acc[category.value] = urlCategoryListArray.includes(category.value);
        return acc;
    }, {});

    const [selectCategory, setSelectCategory] = useState(initialCategoryState);
    const [filterCategoryList, setFilterCategoryList] = useState(urlCategoryListArray);
    const [sortby, setSortby] = useState(''); // Default sort order

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummmaryApi.filterProduct.url, {
                method: SummmaryApi.filterProduct.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: filterCategoryList,
                })
            });

            const dataResponse = await response.json();
            setData(dataResponse?.data || []);
            setOriginalData(dataResponse?.data || []); // Store original data
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
            setOriginalData([]);
        } finally {
            setLoading(false);
        }
    }

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;

        setSelectCategory(prev => {
            const newState = {
                ...prev,
                [value]: checked
            };

            // Update URL when category selection changes
            const selectedCategories = Object.keys(newState)
                .filter(category => newState[category]);

            // Create new search params
            const newSearchParams = new URLSearchParams();
            selectedCategories.forEach(cat => newSearchParams.append('category', cat));

            // Update URL without page reload
            navigate({
                pathname: location.pathname,
                search: newSearchParams.toString()
            }, { replace: true });

            return newState;
        });
    }

    const handleSortBy = (e) => {
        const { value } = e.target;
        setSortby(value);
        
        if (value === 'asc') {
            setData(prevData => [...prevData].sort((a, b) => a.sellingPrice - b.sellingPrice));
        } else if (value === 'dsc') {
            setData(prevData => [...prevData].sort((a, b) => b.sellingPrice - a.sellingPrice));
        } else {
            // Reset to original data if no sort option is selected
            setData([...originalData]);
        }
    }

    useEffect(() => {
        const arrOfCategory = Object.keys(selectCategory)
            .filter(categoryKeyName => selectCategory[categoryKeyName]);
        setFilterCategoryList(arrOfCategory);
    }, [selectCategory]);

    useEffect(() => {
        fetchData();
    }, [filterCategoryList]);

    return (
        <div className='container mx-auto px-4'>
            {/* desktop version */}
            <div className='visible md:grid grid-cols-[200px,1fr] gap-4'>
                {/* left site */}
                <div className='bg-white shadow-sm p-2 min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                    {/* Sort by */}
                    <div className='my-3'>
                        <h3 className='text-sm uppercase font-medium text-slate-500 border-b border-slate-500'>Sort by</h3>
                        <form className='flex flex-col gap-2 py-3 text-sm'>
                            <div className='flex items-center gap-2'>
                                <input 
                                    type='radio' 
                                    name='sortby' 
                                    id='sort1' 
                                    checked={sortby === 'asc'} 
                                    value="asc" 
                                    onChange={handleSortBy} 
                                />
                                <label htmlFor='sort1'>Price - low to high</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input 
                                    type='radio' 
                                    name='sortby' 
                                    id='sort2' 
                                    checked={sortby === 'dsc'} 
                                    value="dsc" 
                                    onChange={handleSortBy} 
                                />
                                <label htmlFor='sort2'>Price - high to low</label>
                            </div>
                        </form>
                    </div>

                    {/* Filter by */}
                    <div className='my-3'>
                        <h3 className='text-sm uppercase font-medium text-slate-500 border-b border-slate-500'>Category</h3>
                        <form className='flex flex-col gap-2 py-3 text-sm'>
                            {productCategory.map((categoryName, index) => (
                                <div className='flex items-center gap-2' key={index}>
                                    <input
                                        type='checkbox'
                                        name='category'
                                        checked={!!selectCategory[categoryName.value]}
                                        value={categoryName.value}
                                        id={categoryName.value}
                                        onChange={handleSelectCategory}
                                    />
                                    <label htmlFor={categoryName.value}>{categoryName.label}</label>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>

                {/* right site {product} */}
                <div className='mt-4 px-3'>
                    <p className='text-sm font-semibold pb-2'>Search Result : {data.length}</p>
                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                        {loading ? (
                            <p>Loading...</p>
                        ) : data.length > 0 ? (
                            <VerticalProductCard data={data} loading={loading} />
                        ) : (
                            <p>No products found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct