import React, { useState } from 'react';
import PersonalNavbar from './PersonalNavbar';
import Footer from '../../BeforeLogin/Footer';
import 'chart.js/auto';
import { Pie, Bar } from 'react-chartjs-2';
import Food from '../../../assets/Food.png';
import Groceries from '../../../assets/Groceries.png';
import Transport from '../../../assets/Transport.png';
import Health from '../../../assets/Health.png';
import Others from '../../../assets/Others.png';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; 
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const PersonalDashboard = () => {
  const [currentItem, setCurrentItem] = useState(0);

  // Data for the Pie chart
  const pieData = {
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  };

  // Data for the Bar chart
  const barLabels = ['Groceries', 'Shopping', 'Health', 'Transport', 'Food', 'Other'];
  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Carousel items
  const carouselItems = [
    {
      image: Food,
      label: 'Food',
      amount: 'Rs 1000',
      bgColor: 'rgba(230, 157, 254, 0.5)',
    },
    {
      image: Transport,
      label: 'Transport',
      amount: 'Rs 1000',
      bgColor: 'rgba(254, 184, 82, 0.4)',
    },
    {
      image: Groceries,
      label: 'Groceries',
      amount: 'Rs 1000',
      bgColor: 'rgba(97, 147, 246, 0.5)',
    },
    {
      image: Health,
      label: 'Health',
      amount: 'Rs 1000',
      bgColor: 'rgba(217, 254, 169, 0.5)',
    },
    {
      image: Others,
      label: 'Others',
      amount: 'Rs 1000',
      bgColor: 'rgba(255, 177, 69, 0.5)',
    },
  ];

  const handlePrevClick = () => {
    setCurrentItem((prevItem) => (prevItem === 0 ? carouselItems.length - 3 : prevItem - 1));
  };

  const handleNextClick = () => {
    setCurrentItem((prevItem) => (prevItem === carouselItems.length - 3 ? 0 : prevItem + 1));
  };

  return (
    <div>
      <PersonalNavbar />
      {/* <hr className="border-2 border-gray-300" /> */}
      <div>
        {/* 1st Section  */}
        <div className="flex justify-evenly items-center mt-16 mb-16 ">
          {/* 1st Card  */}
          <div className="card w-1/3 h-64 bg-[#E0E0E0] text-black">
            <div className="card-body p-6">
              <h2 className="mb-4 font-bold text-md">Insights</h2>
              <div className="flex items-center justify-center space-x-6">
                <div style={{ width: '35%' }}>
                  <Pie data={pieData} />
                </div>
                <div className="text-center">
                  <h3 className="text-xl ">Oh no!! You have spent 100% of your monthly budget</h3>
                </div>
              </div>
            </div>
          </div>

          {/* 2nd Card  */}
          <div
            className="card w-1/3 h-64"
            style={{ backgroundColor: 'rgba(251, 188, 5, 0.3)' }}
          >
            <div className="card-body text-black p-6 px-12">
              <div className="flex justify-between">
                <h2 className="mb-4 font-bold text-md mb-2">Total Budget</h2>
                <button className="btn bg-[#FEB852] text-white font-light border-none">
                  March
                </button>
              </div>
              <h2 className="mb-4 font-bold text-3xl">Rs 3000</h2>
              <div className="flex justify-between ">
                <div className="space-y-2">
                  <h4 className="text-[#777777]">Spent</h4>
                  <h4 className="text-success font-bold text-2xl">Rs 3000</h4>
                </div>
                <div className="divider divider-horizontal divider-error"></div>
                <div className="space-y-2">
                  <h4 className="text-[#777777]">Spent Over Budget</h4>
                  <h4 className="text-error font-bold text-2xl">Rs 250</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2nd Section  */}
        <div>
          <div className="flex flex-col relative">
            <h2 className="text-black tracking-wider font-medium text-3xl mb-4 font-[itim] text-center">
              Categories
            </h2>
            <div className="carousel carousel-center w-100 p-4 space-x-32  rounded-box relative">
            <button className="prev-button absolute top-1/2 transform -translate-y-1/2 left-20 rounded-full" onClick={handlePrevClick} style={{ backgroundColor: 'black', color:"white" }}><ChevronLeftIcon fontSize="large" /></button>

              {carouselItems.slice(currentItem, currentItem + 3).map((item, index) => (
                <div key={index} className="carousel-item card w-80 text-black" style={{backgroundColor: item.bgColor}}>
                  <div className="card-body">
                    <img src={item.image} alt="" className="w-10" />
                    <h2 className="text-2xl font-bold pt-4">{item.amount}</h2>
                    <h4 style={{ color: 'grey' }} className="font-semibold text-lg">
                      {item.label}
                    </h4>
                  </div>
                </div>
              ))}
       <button className="next-button absolute top-1/2 transform -translate-y-1/2 right-24 rounded-full" onClick={handleNextClick} style={{ backgroundColor: 'black' , color:"white" }}><ChevronRightIcon fontSize="large" /></button>


            </div>
          </div>
        </div>

        {/* 3rd Section - Bar Chart */}
        <div className="mt-20 mb-20 flex item-center justify-center">
          <div style={{ width: '60%' }}>
            <Bar data={barData} />
          </div>
        </div>
      </div>
     

      <Footer />
    </div>
  );
};

export default PersonalDashboard;
