import React, { useState, useEffect } from 'react';
import homeBg from '../../assets/home_page_expense.webp';
import img1 from '../../assets/Ellipse 1.png';
import img2 from '../../assets/Ellipse 2.png';
import img3 from '../../assets/Ellipse 3.png';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayText(text.substring(0, currentIndex));
      currentIndex++;
      if (currentIndex > text.length) {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <h1 className="typewriter text-3xl md:text-4xl font-bold font-[inter] mb-4" style={{ color: '#FF7545' }}>
      {displayText}
    </h1>
  );
};

const Landingpage = () => {
  return (
    <div>
      <Navbar />
      {/* FIRST PAGE */}
      <div className="flex flex-col md:flex-row items-center justify-evenly text-black" style={{ paddingTop: '120px' }}>
        <div className="md:w-1/2 p-10 md:p-20">
          <TypewriterText text="Empower Your Finances, Simplify Your Life with CashTrackrr" />
          <br />
          <p className="text-lg md:text-xl mb-8">
            Discover the power of CashTrackrr, your all-in-one solution for effortless financial management. Track
            expenses, set budgets, and achieve your financial goals with ease. Our intuitive platform puts you in
            control, making it simple to manage your money and streamline your life. Join CashTrackrr today and take the
            first step towards financial freedom.
          </p>
          <button className="btn btn-primary text-white border-none px-6" style={{ backgroundColor: '#FF7545', fontFamily: "'Istok Web', sans-serif" }}>Explore </button>
        </div>
        <div>
          <img src={homeBg} alt="CashTrackrr" className="w-full max-w-md md:max-w-none" />
        </div>
      </div>
      {/* SECOND PAGE */}
      <div className="px-4 md:px-0">
        <h1 className="md:text-3xl font-bold text-center" style={{ color: '#6193F6', fontFamily: 'Istok Web' }}>Why CashTrackrr?</h1>
        {/* first */}
        <div className="flex flex-col md:flex-row justify-evenly items-center align-center">
          <div className="flex flex-col justify-evenly py-8 md:py-20">
            <h2 className="md:text-2xl font-bold mb-4">Budget Setting:</h2>
            <p className="w-full md:w-96 text-lg">CashTrackrr allows users to set and track financial goals, providing motivation and direction towards achieving financial success.</p>
          </div>
          <div>
            <img src={img1} alt="Budget Setting" className="w-full max-w-xs md:max-w-none" />
          </div>
        </div>
        {/* second */}
        <div className="flex flex-col md:flex-row justify-evenly items-center align-center">
          <div>
            <img src={img2} alt="All-in-One Solution" className="w-full max-w-xs md:max-w-none" />
          </div>
          <div className="flex flex-col justify-evenly py-8 md:py-20">
            <h2 className="md:text-2xl font-bold mb-4">All-in-One Solution:</h2>
            <p className="w-full md:w-96 text-lg">CashTrackrr caters to both personal and business financial management needs, providing a comprehensive platform for all your financial tasks.</p>
          </div>
        </div>
        {/* third */}
        <div className="flex flex-col md:flex-row justify-evenly items-center align-center">
          <div className="flex flex-col justify-evenly py-8 md:py-20">
            <h2 className="md:text-2xl font-bold mb-4">Business Integration:</h2>
            <p className="w-full md:w-96 text-lg">For business users, CashTrackrr offers features such as transaction history, facilitating organized financial tracking for professional needs.</p>
          </div>
          <div>
            <img src={img3} alt="Business Integration" className="w-full max-w-xs md:max-w-none" />
          </div>
        </div>
      </div>
      {/* Third Page */}
      <div className="mt-24 mb-24">
        <h1 className="md:text-3xl font-bold text-center" style={{ color: '#FF7545', fontFamily: 'Istok Web' }}>How to Use?</h1>
        <div className="flex justify-center mt-8">
          <ul className="steps steps-vertical text-lg font-medium">
            <li className="step step-primary" style={{ marginBottom: '15px' }}>Create an account or log in to your existing account</li>
            <li className="step step-primary" style={{ marginBottom: '15px' }}>Customize your spending categories to match your financial needs, whether personal or business.</li>
            <li className="step step-primary" style={{ marginBottom: '15px' }}>Add and Track Expenses</li>
            <li className="step step-primary" style={{ marginBottom: '15px' }}>Track your spending patterns and budget progress on the dashboard</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landingpage;
