import React from 'react';
import PersonalNavbar from './PersonalNavbar';
import Footer from '../../BeforeLogin/Footer';
import 'chart.js/auto';
import { Pie, Bar } from 'react-chartjs-2';

const PersonalDashboard = () => {
  // Data for the Pie chart
  const pieData = {
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4
      }
    ]
  };
  
  // Data for the Bar chart
  const barLabels = ['Groceries', 'Shopping', 'Health', 'Transport', 'Food', 'Other'];
  const barData = {
    labels: barLabels,
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.3)',
        'rgba(255, 159, 64, 0.3)',
        'rgba(255, 205, 86, 0.3)',
        'rgba(75, 192, 192, 0.3)',
        'rgba(54, 162, 235, 0.3)',
        'rgba(153, 102, 255, 0.3)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <div>
      <PersonalNavbar />
      <hr className="border-2 border-gray-300" />
      <div>
        {/* 1st Section  */}
        <div className='flex justify-evenly items-center mt-16 mb-16 '>

          {/* 1st Card  */}
          <div className="card w-1/3 h-64 bg-[#E0E0E0] text-black">
            <div className="card-body p-6">
              <h2 className="mb-4 font-bold text-md">Insights</h2>
              <div className='flex items-center justify-center space-x-6'>
                <div style={{ width: '35%' }}>
                  <Pie data={pieData} />
                </div>
                <div className='text-center'>
                  <h3 className='text-xl '>Oh no!! You have spent 100% of your monthly budget</h3>
                </div>
              </div>
            </div>
          </div>

          {/* 2nd Card  */}
          <div className="card w-1/3 h-64" style={{ backgroundColor: 'rgba(251, 188, 5, 0.4)' }}>
            <div className="card-body text-black p-6 px-12">
              <div className='flex justify-between'>
                <h2 className="mb-4 font-bold text-md mb-2">Total Budget</h2>
                <button className='btn bg-[#FEB852] text-white font-light border-none'>March</button>
              </div>
              <h2 className="mb-4 font-bold text-3xl">Rs 3000</h2>
              <div className='flex justify-between ' >
                <div className='space-y-2'>
                  <h4 className='text-[#777777]'>Spent</h4>
                  <h4 className='text-success font-bold text-2xl'>Rs 3000</h4>
                </div>
                <div className="divider divider-horizontal divider-error"></div>
                <div className='space-y-2'>
                  <h4 className='text-[#777777]'>Spent Over Budget</h4>
                  <h4 className='text-error font-bold text-2xl'>Rs 250</h4>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 2nd Section  */}
        <div>
  
        </div>

        {/* 3rd Section - Bar Chart */}
        <div className="mt-20 mb-20 flex item-center justify-center">
          <div style={{width:"60%"}}>
            <Bar data={barData} />
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default PersonalDashboard;
