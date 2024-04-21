import React, { useState,createContext } from 'react';
import signupImg from '../../assets/signup2.webp';
import Navbar from '../BeforeLogin/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import {AppContext} from '../Context'

const Signup = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    password: ''
  });

  const { name, emailId, password } = formData;


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { isSignedUp, setIsSignedUp } = useContext(AppContext);
  
  // on form submission 
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://s54-rajashree-capstone-expense-tracker.vercel.app/userdata/post', formData);
      setIsSignedUp(true);
      toast.success('You have successfully created your account.', {
        onClose: () => {
          setFormData({ name: '', emailId: '', password: '' });
          navigate('/personalDashboard');
        }
      });
    } catch (error) {
      console.error('Error creating account:', error.message);
      toast.error('An error occurred while creating your account.');
    }
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className='flex justify-evenly' style={{ paddingTop: "120px" }}>
        <div>

          <h1 className="text-black text-3xl mt-5 font-[inter] font-bold text-center">Sign Up</h1>
          <p style={{ color: "grey" }} className='mb-6 mt-2 text-center font-[inter]'>Enter credential to create your account</p>

          <form className="flex flex-col w-full max-w-md" onSubmit={onSubmit}>

            {/* google sign up button  */}
          <button className="btn flex items-center text-black border-solid border-2 border-gray-500 text-lg md:text-xl bg-[white] py-2 px-8 w-96 rounded-lg hover:bg-opacity-80 transition duration-300">
              <img width={"20px"} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="" />Google
            </button>
            
            <div className="divider">OR</div>

            {/* name  */}
            <label className="text-left mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your Name"
              className="mb-2 w-96 px-4 py-2 border rounded-md focus:outline-none focus:border-[#F35258] bg-white text-black"
            />

            {/* email  */}
            <label className="text-left mt-4">Email</label>
            <input
              type="emailId"
              name="emailId"
              value={emailId}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="mb-2  w-96 px-4 py-2 border rounded-md focus:outline-none focus:border-[#F35258] bg-white text-black"
            />

            {/* password  */}
            <label className="text-left mt-4">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your Password"
              className="mt-2 mb-2 w-96 px-4 py-2 border rounded-md focus:outline-none focus:border-[#F35258] bg-white text-black"
            />

            {/* submit button  */}
            <button type="submit" className=" mt-2 w-2/4 bg-[#F35258] text-white py-2 px-4 rounded-md w-96 hover:bg-red-600 transition duration-300">Create your account</button>
          </form>

        </div>
        <div>
          <img src={signupImg} className='h-full' style={{ width: "580px" }} alt="Signup" />
        </div>
      </div>
    </div>
  )
}

export default Signup;
