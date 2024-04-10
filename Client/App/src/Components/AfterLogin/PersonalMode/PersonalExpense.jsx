import React, { useState } from 'react';
import PersonalNavbar from './PersonalNavbar';
import Footer from '../../BeforeLogin/Footer';
import { Delete } from '@mui/icons-material';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import CommuteIcon from '@mui/icons-material/Commute';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import SavingsIcon from '@mui/icons-material/Savings';

const PersonalExpense = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null); // State to track hovered card index

    const expenseData = [
        {
            category: 'Food',
            image: 'https://clicklovegrow.com/wp-content/uploads/2020/03/Naomi-Sherman-Advanced-Graduate4.jpg',
            icon: <RamenDiningIcon style={{ fontSize: "100px", color: "white" }} />,
            amount: 100
        },
        {
            category: 'Groceries',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvxFbd7yJqcvVLdhu0Z3MUdwhJOl_erAmd5Y0gt7KoA&s',
            icon: <LocalGroceryStoreIcon style={{ fontSize: "100px", color: "white" }} />,
            amount: 100
        },
        {
            category: 'Transport',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfT97PUyOW2CEJ-OzozmTK14ZGeXjc9V4Ao7wdEx1dnw&s',
            icon: <CommuteIcon style={{ fontSize: "100px", color: "white" }} />,
            amount: 100
        },
        {
            category: 'Health',
            image: 'https://img.freepik.com/premium-photo/heart-stethoscope-generate-ai_98402-13285.jpg',
            icon: <HealthAndSafetyIcon style={{ fontSize: "100px", color: "white" }} />,
            amount: 100
        },
        {
            category: 'Others',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoFVUazypGswhWPcBAY65cbP8rg89oAqm1lg&s',
            icon: <MiscellaneousServicesIcon style={{ fontSize: "100px", color: "white" }} />,
            amount: 100
        }
    ];

    return (
        <div>
            <PersonalNavbar />

            <div>
                {/* 1st section  */}
                <div className='flex items-center justify-evenly bg-[#5E60CE] py-10'>
                    <div className="card flex flex-row rounded-box w-96 bg-white shadow-xl w-1/2">
                        <div className="flex flex-row items-center justify-center card-body">
                            <SavingsIcon style={{ fontSize: "50px", color: "#6930C3" }} />
                            <h2 className="text-2xl card-title ">BUDGET : <span className='text-[#6930C3] font-bold'>  Rs 1000</span></h2>
                        </div>
                    </div>
                    <div className='divider divider-horizontal divider-neutral'></div>
                    <div className='space-x-6'>
                        <input className="bg-white py-4 w-64 px-4" placeholder="Enter your budget" type="number" />
                        <button className='btn bg-white text-[#6930C3]'>Set Budget</button>
                    </div>
                </div>

                {/* 2nd section  */}
                <div>

                    {/* expense heading  */}
                    <h2 className='text-3xl font-semibold text-center py-10'>Expenses</h2>


                    {/* filter by date  */}
                    <div className='flex justify-center space-x-20 items-center  px-28 pb-10'>
                        <div>
                            <h2 className='text-[#6930C3] font-bold text-2xl'>Filter by date:</h2>
                        </div>
                        <div>
                            <select className="bg-white border-2 border-[#6930C3] py-4 w-72 px-2">
                                <option value="all">All</option>
                                <option value="09-04-2024">09-04-2024</option>
                                <option value="08-04-2024">08-04-2024</option>
                                <option value="07-04-2024">07-04-2024</option>
                                <option value="06-04-2024">06-04-2024</option>
                            </select>
                        </div>
                    </div>

                    {/* Expense div  */}
                    <div className='flex flex-col items-center justify-center mx-auto'>

                        {/* Today  */}
                        <details className="collapse bg-white" open={true}>

                            <summary className="collapse-title  ml-24 text-2xl font-medium "><ArrowRightIcon style={{ fontSize: "40px" }} />09-04-2024</summary>
                            {/* <ArrowDropDownIcon style={{ fontSize: "40px" }} /> */}

                            <div className="flex flex-wrap items-center justify-evenly collapse-content space-y-6 max-height-400">
                                {expenseData.map((expense, index) => (
                                    <div key={index} className="card bg-base-100 shadow-xl image-full mt-6 hover:bg-black ">
                                        <figure><img src={expense.image} alt={expense.category} className='w-96' /></figure>
                                        <div className="card-body flex justify-center items-center space-y-10">
                                            {expense.icon}
                                            <h2 className="text-2xl card-title text-white">Money Spent: Rs {expense.amount}</h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </details>

                        {/* Yesterday  */}
                        <details className="collapse bg-white">
                            <summary className="collapse-title w-96 ml-24 text-2xl font-medium"><ArrowRightIcon style={{ fontSize: "40px" }} />08-04-2024</summary>
                            <div className="flex flex-wrap items-center justify-evenly collapse-content space-y-6 max-height-400">
                                {expenseData.map((expense, index) => (
                                    <div key={index} className="card w-96 bg-base-100 shadow-xl image-full mt-6 hover:bg-black">
                                        <figure><img src={expense.image} alt={expense.category} className='w-96' /></figure>
                                        <div className="card-body flex justify-center items-center space-y-10">
                                            {expense.icon}
                                            <h2 className="text-2xl card-title text-white">Money Spent: Rs {expense.amount}</h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </details>

                        {/* 07-04-2024   */}
                        <details className="collapse bg-white">
                            <summary className="collapse-title w-96 ml-24 text-2xl font-medium"><ArrowRightIcon style={{ fontSize: "40px" }} />07-04-2024</summary>
                            <div className="flex flex-wrap items-center justify-evenly collapse-content space-y-6 max-height-400">
                                {expenseData.map((expense, index) => (
                                    <div key={index} className="card w-96 bg-base-100 shadow-xl image-full mt-6 hover:bg-black">
                                        <figure><img src={expense.image} alt={expense.category} className='w-96' /></figure>
                                        <div className="card-body flex justify-center items-center space-y-10">
                                            {expense.icon}
                                            <h2 className="text-2xl card-title text-white">Money Spent: Rs {expense.amount}</h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </details>

                        {/* 06-04-2024  */}
                        <details className="collapse bg-white">
                            <summary className="collapse-title w-96 ml-24 text-2xl font-medium"><ArrowRightIcon style={{ fontSize: "40px" }} />06-04-2024</summary>
                            <div className="flex flex-wrap items-center justify-evenly collapse-content space-y-6 max-height-400">
                                {expenseData.map((expense, index) => (
                                    <div key={index} className="card w-96 bg-base-100 shadow-xl image-full mt-6 hover:bg-black">
                                        <figure><img src={expense.image} alt={expense.category} className='w-96' /></figure>
                                        <div className="card-body flex justify-center items-center space-y-10">
                                            {expense.icon}
                                            <h2 className="text-2xl card-title text-white">Money Spent: Rs {expense.amount}</h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </details>
                    </div>

                    {/* Modal button and form   */}
                    <button className="btn border-none fixed bottom-4 rounded-full right-10 bg-[#5E60CE]" onClick={() => document.getElementById('my_modal_3').showModal()}>
                        <span className='text-white text-3xl'>+</span>
                    </button>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box bg-white">
                            {/* Form close button  */}
                            <form method="dialog">
                                <button className="btn text-xl btn-circle btn-ghost absolute right-8 top-10">✕</button>
                            </form>

                            {/* Form inputs  */}
                            <div className='flex justify-center'>
                                <form action="" className='flex w-3/4 flex-col'>
                                    <h2 className='font-bold text-center text-[#5e60ce] text-3xl py-10'>Add your Expense</h2>
                                    <label className="text-xl pb-2" htmlFor="">Select Category</label>
                                    <select className='bg-white border-[#5E60CE] border-2 rounded text-black px-2 py-2 mb-10'>
                                        <option value="Food">Food</option>
                                        <option value="Health">Health</option>
                                        <option value="Groceries">Groceries</option>
                                        <option value="Transport">Transport</option>
                                        <option value="Others">Others</option>
                                    </select>

                                    <label className="text-xl pb-2" htmlFor="">Enter Amount Spent (Rs)</label>
                                    <input type="number" className='bg-white border-[#5E60CE] border-2 rounded text-black px-2 py-2 mb-10' />

                                    <label className="text-xl pb-2" htmlFor="">Enter date</label>
                                    <input type="date" className='bg-white border-[#5E60CE] border-2 rounded text-black px-2 py-2 mb-10' />
                                    <div className='flex items-center justify-center space-x-6'>
                                        <button className='btn btn-ghost bg-[#5e60ce] text-white text-lg w-28'>Add</button>
                                        <form method="dialog">
                                            <button className='btn btn-ghost bg-[#5e60ce] text-white text-lg w-28'>Cancel</button>
                                        </form>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PersonalExpense;
