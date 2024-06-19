import React, { useState, useContext } from 'react';
import signupImg from '../../assets/signup2.webp';
import Navbar from '../BeforeLogin/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { AppContext } from '../Context';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    emailId: '',
    password: ''
  });

  const { name, emailId, password } = formData;
  const [isLoading, setIsLoading] = useState(false);

  const { isSignedUp, setIsSignedUp } = useContext(AppContext);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation checks
    switch (name) {
      case 'name':
        if (!/^[a-zA-Z\s]{3,}$/.test(value)) {
          setErrors({ ...errors, name: 'Name must be at least 3 letters long' });
        } else {
          setErrors({ ...errors, name: '' });

          try {
            const response = await axios.get('https://s54-rajashree-capstone-expense-tracker.vercel.app/userdata');
            const usersData = response.data;
            const userExists = usersData.find(user => user.name === value);
            if (userExists) {
              setErrors({ ...errors, name: 'This username is already taken' });
            } else {
              setErrors({ ...errors, name: '' });
            }
          } catch (error) {
            console.error('Error checking username:', error.message);
            setErrors({ ...errors, name: 'Error checking username availability' });
          }
        }
        break;
      case 'emailId':
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          setErrors({ ...errors, emailId: 'Invalid email address. Email must contain "@" and "."' });
        } else {
          setErrors({ ...errors, emailId: '' });


          try {
            const response = await axios.get('https://s54-rajashree-capstone-expense-tracker.vercel.app/userdata');
            const usersData = response.data;
            const emailExists = usersData.find(user => user.emailId === value);
            if (emailExists) {
              setErrors({ ...errors, emailId: 'An account with this email already exists' });
            } else {
              setErrors({ ...errors, emailId: '' });
            }
          } catch (error) {
            console.error('Error checking email:', error.message);
            setErrors({ ...errors, emailId: 'Error checking email availability' });
          }
        }
        break;
      case 'password':
        if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value)) {
          setErrors({
            ...errors,
            password: 'Password must be at least 8 characters long and it should contain at least one uppercase letter, one number, and one special character'
          });
        } else {
          setErrors({ ...errors, password: '' });
        }
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (errors.name || errors.emailId || errors.password) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true); 

    try {

      const hashedPassword = await bcrypt.hash(password, 10);

      await axios.post('https://s54-rajashree-capstone-expense-tracker.vercel.app/userdata/post', {
        ...formData,
        password: hashedPassword
      });

      setIsSignedUp(true);
      localStorage.setItem('userEmail', formData.emailId);
      localStorage.setItem('username', formData.name);
      toast.success('You have successfully created your account.', {
        onClose: () => {
          setFormData({ name: '', emailId: '', password: '' });
          navigate('/personalDashboard');
        }
      });
    } catch (error) {
      console.error('Error creating account:', error.message);
      toast.error('An error occurred while creating your account.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className='flex justify-evenly' style={{ paddingTop: "120px" }}>
        <div style={{ paddingTop: "50px" }}>
          <h1 className="text-black text-3xl mt-5 font-[inter] font-bold text-center">Sign Up</h1>
          <p style={{ color: "grey" }} className='mb-6 mt-2 text-center font-[inter]'>Enter credential to create your account</p>

          <form className="flex flex-col w-full max-w-md" onSubmit={onSubmit}>

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
            {errors.name && <span className="text-red-500">{errors.name}</span>}

            {/* email  */}
            <label className="text-left mt-4">Email</label>
            <input
              type="email"
              name="emailId"
              value={emailId}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="mb-2 w-96 px-4 py-2 border rounded-md focus:outline-none focus:border-[#F35258] bg-white text-black"
            />
            {errors.emailId && <span className="text-red-500">{errors.emailId}</span>}

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
            {errors.password && <span className="text-red-500 w-96">{errors.password}</span>}

            {/* submit button with loading spinner */}
            <button type="submit" className="mt-2 w-2/4 bg-[#F35258] text-white py-2 px-4 rounded-md w-96 hover:bg-red-600 transition duration-300">
              {isLoading ? (
                <span className="loading loading-bars loading-md"></span>
              ) : (
                'Create your account'
              )}
            </button>
          </form>

        </div>
        <div>
          <img src={signupImg} className='h-full' style={{ width: "580px" }} alt="Signup" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
