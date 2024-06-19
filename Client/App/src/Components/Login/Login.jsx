import React, { useState, useContext, useEffect } from 'react';
import signupImg from '../../assets/login1.png';
import Navbar from '../BeforeLogin/Navbar';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { AppContext } from '../Context';

const Login = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const { username, setUsername } = useContext(AppContext);
  const { userEmail, setUserEmail } = useContext(AppContext);

  useEffect(() => {
    console.log('userEmail:', userEmail);
    console.log('username:', username);
    console.log(isLoggedIn);
  }, [userEmail, username]);

  const onSubmit = async (data) => {
    setFormData(data);
    setIsLoading(true);

    try {
      const response = await axios.get('https://s54-rajashree-capstone-expense-tracker.vercel.app/userdata');
      const usersData = response.data;

      console.log("Form Data:", data);

      const matchingUser = usersData.find(user => user.emailId === data.email);

      if (matchingUser) {
        const isPasswordValid = await bcrypt.compare(data.password, matchingUser.password);

        if (isPasswordValid) {
          console.log("Matching User Data:", matchingUser);
          toast.success('You have successfully logged in.', {
            onClose: () => navigate('/personalDashboard')
          });
          reset();
          setIsLoggedIn(true);
          setUserEmail(data.email);
          localStorage.setItem('userEmail', data.email);
          localStorage.setItem('username', matchingUser.name);
          setUsername(matchingUser.name);
        } else {
          toast.error('Invalid email or password');
        }
      } else {
        toast.error('Invalid email or password');
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('An error occurred while logging in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className='flex justify-evenly items-center py-2' style={{ paddingTop: "150px" }}>
        <div>
          <img src={signupImg} className='h-full' style={{ width: "580px" }} alt="Login" />
        </div>
        <div>
          <h1 className="text-black text-4xl mt-5 font-[inter] font-bold text-center">Login</h1>
          <p style={{ color: "grey" }} className='mb-6 mt-2 text-center font-[inter]'>Enter credentials to access your account</p>
          <form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
            <label className="text-left mt-4 text-black">Email id</label>
            <input
              type="email"
              {...register("email", { required: "Email is required", pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
              placeholder="Your email"
              className={`mb-2 w-96 px-4 py-2 border rounded-md focus:outline-none focus:border-[#F35258] bg-white text-black ${errors.email && 'border-red-500'}`}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message || 'Invalid email address'}</span>}
            <label className="text-left mt-4 text-black">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required", minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
              placeholder="Enter your Password"
              className={`mt-2 mb-2 w-96 px-4 py-2 border rounded-md focus:outline-none focus:border-[#F35258] bg-white text-black ${errors.password && 'border-red-500'}`}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            <button type="submit" className="mt-2 bg-[#58289D] text-white py-2 px-4 rounded-md w-96 hover:bg-violet-600 transition duration-300">
              {isLoading ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;