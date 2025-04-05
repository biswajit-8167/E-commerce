import React, { useState } from 'react';
import SignInIcon from '../assest/signin.gif';
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import ImageToBase64 from '../healper/ImageToBase64';
import SummmaryApi from '../common/index';
import { toast } from 'react-toastify';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const handleProfilePic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await ImageToBase64(file);

    console.log("Profile Picture (Base64):", imagePic); // Debugging

    setData((preve) => ({
      ...preve,
      profilePic: imagePic,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (data.password === data.confirmPassword) {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        profilePic: data.profilePic,
      };
  
      console.log("Payload being sent:", payload); // Debugging
  
      const dataResponse = await fetch(SummmaryApi.signUp.url, {
        method: SummmaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const dataApi = await dataResponse.json();
      console.log("Response from backend:", dataApi); // Debugging
  
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check your password and confirm password");
    }
  };

  return (
    <section id='signup'>
      <div className='container mx-auto p-4'>
        <div className='bg-white w-full max-w-sm mx-auto p-4'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic || SignInIcon} alt='signinIcon' />
            </div>
            <form>
              <label>
                <div className='bg-slate-200 bg-opacity-80 cursor-pointer py-2 pb-3 pt-1 text-center text-[10px] absolute bottom-0 left-[8px]'>
                  Upload photo
                </div>
                <input type='file' className='hidden' onChange={handleProfilePic} />
              </label>
            </form>
          </div>

          <form className='pt-5' onSubmit={handleSubmit}>
            <div className='my-4'>
              <label>Name</label>
              <div className='bg-slate-100 py-2'>
                <input
                  type='text'
                  placeholder='Enter your name'
                  className='w-full h-full outline-none bg-transparent text-[14px] px-3 rounded-md'
                  value={data.name}
                  name='name'
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='my-4'>
              <label>Email</label>
              <div className='bg-slate-100 py-2'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  value={data.email}
                  name='email'
                  className='w-full h-full outline-none bg-transparent text-[14px] px-3 rounded-md'
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='my-4'>
              <label>Password</label>
              <div className='bg-slate-100 py-2 flex'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter your password'
                  value={data.password}
                  name='password'
                  className='w-full h-full outline-none bg-transparent text-[15px] px-3 rounded-md'
                  required
                  onChange={handleChange}
                />
                <div className='cursor-pointer px-3' onClick={() => setShowPassword(!showPassword)}>
                  <span>{showPassword ? <FaEyeSlash /> : <IoMdEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label>Confirm Password</label>
              <div className='bg-slate-100 py-2 flex'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Enter your confirm password'
                  value={data.confirmPassword}
                  name='confirmPassword'
                  className='w-full h-full outline-none bg-transparent text-[15px] px-3 rounded-md'
                  required
                  onChange={handleChange}
                />
                <div className='cursor-pointer px-3' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <span>{showConfirmPassword ? <FaEyeSlash /> : <IoMdEye />}</span>
                </div>
              </div>
            </div>
            <button className='w-full bg-red-600 text-white py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-5'>
              Sign Up
            </button>
          </form>
          <p className='text-center mt-4 text-[15px]'>
            Already have an account? <Link to={'/login'} className='text-red-600 hover:underline'>Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;