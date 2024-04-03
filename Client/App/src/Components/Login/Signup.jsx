import React from 'react';
import signupImg from '../../assets/signup2.webp';
import Navbar from '../BeforeLogin/Navbar';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Signup = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data); 
    toast.success('You have successfully created your account.');
    reset(); 
  };

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <div className='flex justify-evenly' style={{paddingTop:"120px"}} >
        <div>
          <h1 className="text-black text-3xl mt-5 font-[inter] font-bold text-center">Sign Up</h1>
          <p style={{color:"grey"}} className='mb-6 mt-2 text-center font-[inter]'>Enter credential to create your account</p>
          
          <form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
            <button className="btn flex items-center text-black border-solid border-2 border-gray-500 text-lg md:text-xl bg-[white] py-2 px-8 w-96 rounded-lg hover:bg-opacity-80 transition duration-300">
              <img width={"20px"} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="" />Google
            </button>
            
            <div className="divider">OR</div>

            <label className="text-left mb-2">Name</label>
            <input type="text" id="name" {...register("name", { required: true, minLength: 2 })} placeholder="Enter your Name" className={`mb-2 w-96 px-4 py-2 border rounded-md focus:outline-none focus:border-[#F35258] bg-white text-black ${errors.name && 'border-red-500'}`} />

            {errors.name && errors.name.type === "minLength" && (
              <span className="text-red-500 text-sm">Name must be at least 2 characters</span>
            )}

            <label className="text-left mt-4">Email id</label>
            <input type="email" id="email" {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} placeholder="Your email" className={`mb-2  w-96 px-4 py-2 border rounded-md focus:outline-none focus:border-[#F35258] bg-white text-black ${errors.email && 'border-red-500'}`} />

            {errors.email && errors.email.type === "pattern" && (
              <span className="text-red-500 text-sm">Invalid email address</span>
            )}

            <label className="text-left mt-4">Password</label>
            <input type="password" id="password" {...register("password", { required: true, minLength: 10, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[a-zA-Z]).{8,}$/ })} placeholder="Enter your Password" className={`mt-2 mb-2 w-96 px-4 py-2 border rounded-md focus:outline-none focus:border-[#F35258] bg-white text-black ${errors.password && 'border-red-500'}`} />

            {errors.password && errors.password.type === "minLength" && (
              <span className="text-red-500 text-sm">Password must be at least 10 characters</span>
            )}

            {errors.password && errors.password.type === "pattern" && (
              <span className="text-red-500 text-sm">Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character</span>
            )}

           <Link to="/personalDashboard">
             <button type="submit" className=" mt-2 w-2/4 bg-[#F35258] text-white py-2 px-4 rounded-md w-96 hover:bg-red-600 transition duration-300">Create your account</button>
           </Link>
          </form>
        </div>
        <div>
          <img src={signupImg} className='h-full' style={{width:"580px"}} alt="Signup" />
        </div>
      </div>
    </div>
  )
}

export default Signup;
