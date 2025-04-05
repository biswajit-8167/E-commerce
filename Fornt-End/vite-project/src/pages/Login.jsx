import React, { useState } from 'react';
import SignInIcon from '../assest/signin.gif';
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummmaryApi from '../common/index';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import Context from '../context';
function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
   
    const navegate = useNavigate();
    const {featchUserDetails,fetchUserAddToCart} = useContext(Context);

 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataResponse = await fetch(SummmaryApi.signIn.url, {
                method: SummmaryApi.signIn.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const dataApi = await dataResponse.json();

            if (dataApi.success) {
                toast.success(dataApi.message);
                navegate("/");
                featchUserDetails();
                fetchUserAddToCart();
                // Redirect or perform other actions on successful login
            } else {
                toast.error(dataApi.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error("Login error:", error);
        }
    };

    return (
        <section id='login'>
            <div className='container mx-auto p-4'>
                <div className='bg-white w-full max-w-sm mx-auto p-4'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={SignInIcon} alt='signinIcon' />
                    </div>

                    <form className='pt-5' onSubmit={handleSubmit}>
                        <div className='my-4'>
                            <label>Email</label>
                            <div className='bg-slate-100 py-2'>
                                <input 
                                    type='email' 
                                    name='email' 
                                    placeholder='Enter your email'
                                    className='w-full h-full outline-none bg-transparent text-[14px] px-3 rounded-md'
                                    onChange={handleChange}
                                    value={data.email}
                                />
                            </div>
                        </div>
                        <div>
                            <label>Password</label>
                            <div className='bg-slate-100 py-2 flex'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name='password' 
                                    placeholder='Enter your password'
                                    className='w-full h-full outline-none bg-transparent text-[15px] px-3 rounded-md'
                                    onChange={handleChange}
                                    value={data.password}
                                />
                                <div className='cursor-pointer px-3' onClick={() => setShowPassword(!showPassword)}>
                                    <span>
                                        {showPassword ? <FaEyeSlash /> : <IoMdEye />}
                                    </span>
                                </div>
                            </div>
                            <div className='text-right text-sm mt-2 hover:underline hover:text-red-500 '>
                                <Link to={'/forget-password'}>Forget Password ?</Link>
                            </div>
                        </div>
                        <button type='submit' className='w-full bg-red-600 text-white py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-5'>
                            Login
                        </button>
                    </form>
                    <p className='text-center mt-4 text-[15px]'> 
                        Don't have an account? <Link to={'/signup'} className='text-red-600 hover:underline'>Sign Up</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Login;