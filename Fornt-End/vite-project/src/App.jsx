import React, {useState, useEffect } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Navber from './components/Navber';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import SummmaryApi from './common/index';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
    const dispatch = useDispatch();
    const [cartProductCount,setCartProductCount] = useState(0);
    const featchUserDetails = async () => {
        try {
            const dataResponse = await fetch(SummmaryApi.current_user.url, {
                method: SummmaryApi.current_user.method,
                credentials: 'include',
            });

            if (!dataResponse.ok) {
                throw new Error('Failed to fetch user details');
            }

            const dataApi = await dataResponse.json();
            if(dataApi.success) {
                dispatch(setUserDetails(dataApi.data));
            }

            // console.log("user details", dataApi);

        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const fetchUserAddToCart = async() =>{
        try {
            const dataResponse = await fetch(SummmaryApi.addToCartCountProduct.url, {
                method: SummmaryApi.addToCartCountProduct.method,
                credentials: 'include',
            });

            if (!dataResponse.ok) {
                throw new Error('Failed to fetch user details');
            }

            const dataApi = await dataResponse.json();
            
             console.log("dataApi", dataApi);
             setCartProductCount(dataApi?.data?.count)

        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }

    useEffect(() => {
        // Fetch user details
        featchUserDetails();
        // Fetch user add to cart
        fetchUserAddToCart();
    }, []);

    return (
        <div>
            <Context.Provider value={{ 
                featchUserDetails, //user details
                cartProductCount, // cart product count
                fetchUserAddToCart
                }}>
                <ToastContainer
                 position='top-center'
                />
                <Navber />
                <main className='min-h-[calc(100vh-120px)] pt-16'>
                    <Outlet />
                </main>
                <Footer />
            </Context.Provider>
        </div>
    );
}

export default App;