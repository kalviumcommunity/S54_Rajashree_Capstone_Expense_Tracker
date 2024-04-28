import React, { useState, useEffect, useContext } from 'react';
import PersonalNavbar from './PersonalNavbar';
import Footer from '../../BeforeLogin/Footer';
import 'chart.js/auto';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { AppContext } from '../../Context';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  RamenDining as RamenDiningIcon,
  LocalGroceryStore as LocalGroceryStoreIcon,
  MiscellaneousServices as MiscellaneousServicesIcon,
  Commute as CommuteIcon,
  HealthAndSafety as HealthAndSafetyIcon,
} from '@mui/icons-material';

const PersonalDashboard = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const [budgetData, setBudgetData] = useState(null);
  const [personalCategoryData, setPersonalCategoryData] = useState([]);
  const { totalSpent, setTotalSpent } = useContext(AppContext);
  const { userEmail, setUserEmail } = useContext(AppContext);

  useEffect(() => {
    fetchBudgetData();
    fetchPersonalCategoryData();
  }, [userEmail]);

  useEffect(() => {
    const userEmailFromLocalStorage = localStorage.getItem('userEmail');
    if (userEmailFromLocalStorage) {
      setUserEmail(userEmailFromLocalStorage);
    }
  }, []);

  const fetchBudgetData = async () => {
    try {
      const response = await axios.get('https://s54-rajashree-capstone-expense-tracker.vercel.app/budget');
      const currentMonthBudget = response.data.find(item => item.email === userEmail && item.month === getCurrentMonth());
      if (currentMonthBudget) {
        setBudgetData(currentMonthBudget);
      } else {
        setBudgetData({ budget: 0 });
      }
    } catch (error) {
      console.error('Error fetching budget data:', error);
    }
  };

  const fetchPersonalCategoryData = async () => {
    try {
      const response = await axios.get('https://s54-rajashree-capstone-expense-tracker.vercel.app/personal');
      const currentMonth = getCurrentMonth();
      const filteredData = response.data.filter(item => item.email === userEmail && item.month === currentMonth);

      // Calculate total spent across all categories
      let total = 0;
      filteredData.forEach(item => {
        total += item.spent;
      });
      setTotalSpent(total);

      // Extract unique categories
      const uniqueCategories = Array.from(new Set(filteredData.map(item => item.category)));

      // Create an object to hold total spending for each category
      const categoryTotals = {};
      uniqueCategories.forEach(category => {
        categoryTotals[category] = 0;
      });

      // Calculate total spending for each category
      filteredData.forEach(item => {
        categoryTotals[item.category] += item.spent;
      });

      // Prepare data for rendering
      const categoryData = Object.keys(categoryTotals).map(category => ({
        category: category,
        spent: categoryTotals[category]
      }));

      setPersonalCategoryData(categoryData);
    } catch (error) {
      console.error('Error fetching personal category data:', error);
    }
  };

  const getCurrentMonth = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[new Date().getMonth()];
  };

  const fetchPreviousMonthData = async () => {
    try {
      const response = await axios.get('https://s54-rajashree-capstone-expense-tracker.vercel.app/personal');
      const previousMonth = getPreviousMonth();
      const filteredData = response.data.filter(item => item.email === userEmail && item.month === previousMonth);

      // Calculate total spent for the previous month
      let totalPreviousMonth = 0;
      filteredData.forEach(item => {
        totalPreviousMonth += item.spent;
      });
      return totalPreviousMonth;
    } catch (error) {
      console.error('Error fetching previous month data:', error);
      return 0;
    }
  };

  const getPreviousMonth = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthIndex = new Date().getMonth();
    const previousMonthIndex = (currentMonthIndex === 0) ? 11 : currentMonthIndex - 1;
    return monthNames[previousMonthIndex];
  };


  useEffect(() => {
    fetchPreviousMonthData().then(totalPreviousMonth => {
      const totalCurrentMonth = totalSpent;
      const percentageSpentCurrentMonth = totalCurrentMonth / (budgetData ? budgetData.budget : 1) * 100;
      const percentageSpentPreviousMonth = totalPreviousMonth / (budgetData ? budgetData.budget : 1) * 100;
      const differencePercentage = percentageSpentCurrentMonth - percentageSpentPreviousMonth;

      let comparisonMessage = '';
      if (differencePercentage < 0) {
        comparisonMessage = `You have spent ${Math.abs(differencePercentage).toFixed(0)}% less compared to last month.`;
      } else if (differencePercentage > 0) {
        comparisonMessage = `You have spent ${differencePercentage.toFixed(0)}% more compared to last month.`;
      } else {
        comparisonMessage = `You have spent the same percentage compared to last month.`;
      }

      setMessage(comparisonMessage);

      const pieChartData = [totalPreviousMonth, totalCurrentMonth];
      setPieData({
        datasets: [
          {
            data: pieChartData,
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
            hoverOffset: 4,
          },
        ],
      });
    });
  }, [userEmail, totalSpent, budgetData]);

  const [message, setMessage] = useState('');


  // Data for the Pie chart
  const [pieData, setPieData] = useState({
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
        hoverOffset: 4,
      },
    ],
  });

  const percentageSpent = totalSpent / (budgetData ? budgetData.budget : 1) * 100;

  // Data for the Bar chart
  const barLabels = personalCategoryData.map(item => item.category);
  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: 'Spent',
        data: personalCategoryData.map(item => item.spent),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
        ],
        borderWidth: 1,
      },
    ],
  };


  // Render category icon based on category name
  const getCategoryIcon = category => {
    switch (category) {
      case 'Food':
        return <RamenDiningIcon style={{ fontSize: '40px', borderRadius: "50px", backgroundColor: "white", padding: "5px", color: 'rgba(153, 102, 255)' }} />;
      case 'Groceries':
        return <LocalGroceryStoreIcon style={{ fontSize: '40px', borderRadius: "50px", backgroundColor: "white", padding: "5px", color: 'rgba(54, 162, 235)' }} />;
      case 'Transport':
        return <CommuteIcon style={{ fontSize: '40px', borderRadius: "50px", backgroundColor: "white", padding: "5px", color: 'rgb(255, 205, 86)' }} />;
      case 'Health':
        return <HealthAndSafetyIcon style={{ fontSize: '40px', borderRadius: "50px", backgroundColor: "white", padding: "5px", color: 'rgba(255, 99, 132)' }} />;
      case 'Others':
        return <MiscellaneousServicesIcon style={{ fontSize: '40px', borderRadius: "50px", backgroundColor: "white", padding: "5px", color: 'rgba(75, 192, 192)' }} />;
      default:
        return null;
    }
  };

  // Carousel items
  const carouselItems = personalCategoryData.map(item => ({
    category: item.category,
    spent: item.spent,
    icon: getCategoryIcon(item.category),
    bgColor: barData.datasets[0].backgroundColor[barLabels.indexOf(item.category)],
  }));

  const handlePrevClick = () => {
    setCurrentItem(prevItem => (prevItem === 0 ? carouselItems.length - 3 : prevItem - 1));
  };

  const handleNextClick = () => {
    setCurrentItem(prevItem => (prevItem === carouselItems.length - 3 ? 0 : prevItem + 1));
  };

  return (
    <div>
      <PersonalNavbar />
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
                <div className="text-center space-y-4">
                  <div className='space-y-2 flex items-center space-x-4 '>
                    <div className='flex justify-between items-center pt-2 space-x-2'>
                      <div className='w-10 h-4' style={{ backgroundColor: "rgb(255, 99, 132)" }}></div>
                      <p className='font-[inter]'>This month</p>
                    </div>
                    <div className='flex justify-between items-center  space-x-2'>
                      <div className='w-10 h-4' style={{ backgroundColor: "rgb(54, 162, 235)" }}></div>
                      <p className='font-[inter]'>Prev month</p>
                    </div>   
                  </div>

                  <h3 className="text-xl">{message}</h3>
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
                  {budgetData ? budgetData.month : 'Loading...'}
                </button>
              </div>
              <h2 className="mb-4 font-bold text-3xl">
                {budgetData ? `Rs ${budgetData.budget}` : 'Loading...'}
              </h2>
              <div className="flex justify-between ">
                <div className="space-y-2">
                  <h4 className="text-[#777777]">Spent</h4>
                  <h4 className="text-success font-bold text-2xl">
                    {totalSpent ? `Rs ${totalSpent}` : 'Loading...'}
                  </h4>
                </div>
                <div className="divider divider-horizontal divider-error"></div>
                <div className="space-y-2">
                  <h4 className="text-[#777777]">Spent Over Budget</h4>
                  <h4 className="text-error font-bold text-2xl">Rs {totalSpent - (budgetData ? budgetData.budget : 0)}</h4>
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
            <div className="carousel carousel-center w-100 p-4 space-x-32 rounded-box relative">
              <button
                className="prev-button absolute top-1/2 transform -translate-y-1/2 left-20 rounded-full"
                onClick={handlePrevClick}
                style={{ backgroundColor: 'black', color: 'white' }}
              >
                <ChevronLeftIcon fontSize="large" />
              </button>

              {carouselItems.slice(currentItem, currentItem + 3).map((item, index) => (
                <div
                  key={index}
                  className="carousel-item card w-80 text-black"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <div className="card-body">
                    {item.icon}
                    <h2 className="text-2xl font-bold pt-4">{`Rs ${item.spent}`}</h2>
                    <h4 style={{ color: 'grey' }} className="font-semibold text-lg">
                      {item.category}
                    </h4>
                  </div>
                </div>
              ))}

              <button
                className="next-button absolute top-1/2 transform -translate-y-1/2 right-24 rounded-full"
                onClick={handleNextClick}
                style={{ backgroundColor: 'black', color: 'white' }}
              >
                <ChevronRightIcon fontSize="large" />
              </button>
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
