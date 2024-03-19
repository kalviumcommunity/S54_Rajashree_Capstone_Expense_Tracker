import React from 'react';
import homeBg from '../../assets/home_page_expense.webp';
import img1 from '../../assets/Ellipse 1.png'
import img2 from '../../assets/Ellipse 2.png'
import img3 from '../../assets/Ellipse 3.png'
const Landingpage = () => {
  return (
    <div>
      {/* FIRST PAGE  */}
    <div className="flex flex-col md:flex-row items-center justify-evenly text-black" >
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
      {/* SECOND PAGE  */}
      <div style={{margin:"0 250px" , textAlign:"center"}}>
      <h1 className="md:text-3xl font-bold text-center" style={{color:"#6193F6", fontFamily:"Istok Web"}}>Why CashTrackrr?</h1>
      {/* first  */}
      <div className='flex justify-evenly item-center align-center'>
          <div className='flex flex-col justify-evenly py-20' >
              <h2 className='md:text-2xl font-bold '>Budget Setting:</h2>
              <p className='w-96 text-lg'>CashTrackrr allows users to set and track financial goals, providing motivation and direction towards achieving financial success.</p>
          </div>
          <div>
            <img src={img1}></img>
          </div>
      </div>
      {/* second  */}
      <div className='flex justify-evenly item-center align-center'>
          <div>
            <img src={img2}></img>
          </div>
          <div className='flex flex-col justify-evenly py-8' >
              <h2 className='md:text-2xl font-bold '>All-in-One Solution:</h2>
              <p className='w-96 text-lg'>CashTrackrr caters to both personal and business financial management needs, providing a comprehensive platform for all your financial tasks.</p>
          </div>
      </div>
      {/* third  */}
      <div className='flex justify-evenly item-center align-center'>
          <div className='flex flex-col justify-evenly py-20' >
              <h2 className='md:text-2xl font-bold '>Business Integration:</h2>
              <p className='w-96 text-lg'>For business users, CashTrackrr offers features such as transaction history, facilitating organized financial tracking for professional needs.</p>
          </div>
          <div>
            <img src={img3}></img>
          </div>
      </div>
      </div>
      {/* Third Page  */}
      <div className='mt-24 mb-24'>
      <h1 className="md:text-3xl font-bold text-center" style={{color:"#FF7545", fontFamily:"Istok Web"}}>How to Use?</h1>
      <div className='flex justify-center mt-8'>
      <ul className="steps steps-vertical text-lg font-medium">
        <li className="step step-primary" style={{ marginBottom: '15px' }}>Create an account or log in to your existing account</li>
        <li className="step step-primary" style={{ marginBottom: '15px' }}>Customize your spending categories to match your financial needs, whether personal or business.</li>
        <li className="step step-primary" style={{ marginBottom: '15px' }}>Add and Track Expenses</li>
        <li className="step step-primary" style={{ marginBottom: '15px' }}>Track your spending patterns and budget progress on the dashboard</li>
      </ul>
      </div>
      </div>
    </div>
  );
};

export default Landingpage;
