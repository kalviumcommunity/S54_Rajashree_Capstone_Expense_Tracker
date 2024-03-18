import React from 'react';
import homeBg from '../../assets/home_page_expense.webp';

const Landingpage = () => {
  return (
    <div>
    <div className="flex flex-col md:flex-row items-center justify-evenly" >
      <div className="md:w-1/2 p-20 ">
        <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{color:"#FF7545"}}>Empower Your Finances, Simplify Your Life with CashTrackrr</h1>
        <br/>
        <p className="text-lg md:text-xl mb-8">Discover the power of CashTrackrr, your all-in-one solution for effortless financial management. Track expenses, set budgets, and achieve your financial goals with ease. Our intuitive platform puts you in control, making it simple to manage your money and streamline your life. Join CashTrackrr today and take the first step towards financial freedom.</p>
        <button className="btn btn-primary text-white border-none " style={{backgroundColor:"#FF7545" ,  fontFamily: "'Istok Web', sans-serif"}}>Create Your Account today </button>
      </div>
      <div>
        <img src={homeBg} alt="CashTrackrr" width="700px"/>
      </div>
    </div>
    </div>
  );
};

export default Landingpage;
