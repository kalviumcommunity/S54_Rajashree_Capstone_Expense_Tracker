import React, { useContext, useEffect, useState } from 'react';
import BusinessNavbar from './BusinessNavbar';
import { AppContext } from '../../Context';
import { Pie } from 'react-chartjs-2';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import axios from 'axios'; // Import Axios
import Footer from '../../BeforeLogin/Footer';

const BusinessDashboard = () => {
    const { username, setUsername } = useContext(AppContext);
    const { userEmail, setUserEmail } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalReceived, setTotalReceived] = useState(0);

    useEffect(() => {
        const userEmailFromLocalStorage = localStorage.getItem('userEmail');
        const userNameFromLocalStorage = localStorage.getItem('username');
        if (userEmailFromLocalStorage) {
            setUserEmail(userEmailFromLocalStorage);
        }
        if (userNameFromLocalStorage) {
            setUsername(userNameFromLocalStorage);
        }
    
        axios.get('http://localhost:3000/business')
            .then(response => {
                console.log('Fetched data:', response.data); 
                // Filter the data to find the business object with the matching email
                const business = response.data.find(business => business.email === userEmailFromLocalStorage);
                if (business) {
                    setData(business.customers);
                    let paid = 0;
                    let received = 0;
                    business.customers.forEach(customer => {
                        paid += customer.paid;
                        received += customer.received;
                    });
                    setTotalPaid(paid);
                    setTotalReceived(received);
                } else {
                    setData([]); 
                    setTotalPaid(0);
                    setTotalReceived(0);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    

    const pieData = {
        datasets: [
            {
                data: [totalPaid, totalReceived],
                backgroundColor: ['#ff5861', '#00a96e'],
                hoverOffset: 4,
            },
        ],
    };
    const getIcon = (column) => {
        return sortDirection[column] === 'downward' ? <ArrowDownward /> : <ArrowUpward />;
    };

    return (
        <div style={{ height: "100%" }}>
            <BusinessNavbar />
            <div className='bg-[#f7f9fc]'>
                <div>
                    <h2 className='text-3xl font-bold p-10 ml-32'>{`Welcome back, ${username}!!`}</h2>
                </div>
                <div className="flex justify-evenly items-center ">
                   
                    {totalReceived == 0 && totalPaid == 0 ? (
                        <div className="flex justify-evenly items-center ">
                            <div className="card w-5/6 h-64 text-black border border-2 border-success" style={{ backgroundColor: 'rgba(99, 189, 137,0.2)' }} >
                                <div className="card-body p-6">
                                    <h2 className="mb-4 font-bold text-md">Insights</h2>
                                    <div className="flex items-center justify-center space-x-6">
                                            <img src="https://png.pngtree.com/png-vector/20220615/ourmid/pngtree-budget-financial-analyst-to-managing-or-planning-spending-money-at-checklist-png-image_5087670.png" className="w-52" alt="" />
                                            <h2 className="text-xl font-[inter]">Add expense to see your insight</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card w-1/3 h-64 text-black border border-2 border-success" style={{ backgroundColor: 'rgba(99, 189, 137,0.2)' }} >
                            <div className="card-body p-6">
                                <h2 className="mb-4 font-bold text-md">Insights</h2>
                                <div className="flex items-center justify-center space-x-6">
                                    <div style={{ width: '35%' }}>
                                        <Pie data={pieData} />
                                    </div>
                                    <div className="text-center space-y-4">
                                        <div className='space-y-4 items-center space-x-4 '>
                                            <div className=' flex justify-between items-center pt-2 pl-4 space-x-2'>
                                                <div className='w-10 h-4 rounded-full bg-error'></div>
                                                <p className='font-[inter]'>Total Paid</p>
                                            </div>
                                            <div className='flex justify-between items-center  space-x-4'>
                                                <div className='w-10 h-4 rounded-full bg-success'></div>
                                                <p className='font-[inter]'>Total Received</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    <div
                        className="card w-1/3 h-64 border border-2 border-success"
                        style={{ backgroundColor: 'rgba(99, 189, 137,0.2)' }}
                    >
                        <div className="flex flex-row  justify-between card-body text-black p-6 px-12">
                            <div className='space-y-4'>
                                <div className="space-y-4">
                                    <h2 className="font-bold text-md">Total Paid</h2>
                                    <h2 className="font-bold text-3xl text-error">
                                        Rs {totalPaid}
                                    </h2>
                                </div>
                                <div className='divider divider-neutral'></div>
                                <div className="space-y-4">
                                    <h2 className=" font-bold text-md ">Total Received</h2>
                                    <h2 className="mb-4 font-bold text-3xl text-success">
                                        Rs {totalReceived}
                                    </h2>
                                </div>
                            </div>

                            <div>
                                <button className="btn w-32 bg-success text-white font-light border-none">
                                    April
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center py-16  space-x-10'>
                    <div className='flex flex-col'>
                        <label className="font-semibold  text-black" htmlFor="">Name</label>
                        <input type="text" name="" id="" placeholder="Enter name" className='bg-white  w-48 input input-bordered border-black px-10 text-black' />
                    </div>

                    <div className='flex flex-col'>
                        <label className="font-semibold  text-black" htmlFor=""> Select Category</label>
                        <select
                            className='bg-white input input-bordered border-black px-10'
                            name="status"

                        >
                            <option value="" disabled selected>
                                Select Category ▼
                            </option>
                            <option value="all">All</option>
                            <option value="received">Customer</option>
                            <option value="received">supplier</option>
                            <option value="paid">Dealer</option>
                            <option value="received">Loan</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className="font-semibold  text-black" htmlFor=""> Select Status</label>
                        <select
                            className='bg-white input input-bordered border-black px-10'
                            name="status"

                        >
                            <option value="" disabled selected>
                                Select status ▼
                            </option>
                            <option value="all">All</option>
                            <option value="paid">Pay</option>
                            <option value="received">Get</option>
                        </select>
                    </div>
                    <div>
                        <div className='btn bg-success text-white border-none mt-6'>Apply Changes</div>
                    </div>
                </div>
                <div className='flex justify-center items-center pb-20 rounded'>
                    <div className='w-3/4'>
                        <div className="overflow-x-auto rounded-box pb-4 ">

                            <table className="table flex items-center justify-center w-full">
                                <thead className='border border-2 border-[#a3a3a3] bg-success text-white h-20'>
                                    <tr style={{ fontSize: "15px" }}>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Paid</th>
                                        <th>Received</th>
                                        <th>Balance</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                {data.length === 0 ? (
                                    <tbody className='w-full tableBody'>
                                        <tr className="bg-white border-2 border-[#a3a3a3]">
                                            <td colSpan="6" className="py-10 text-center text-gray-500">
                                                No data available. Add user and add their transactions to see.
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody className='w-full tableBody'>
                                        {data.map(customer => (
                                            <tr key={customer._id} className='bg-white border-2 border-[#a3a3a3]'>
                                                <td><h2 className='font-bold'>{customer.name}</h2></td>
                                                <td>{customer.category}</td>
                                                <th>
                                                    <div className="font-bold text-error">Rs {customer.paid}</div>
                                                </th>
                                                <th>
                                                    <div className="font-bold text-success ">Rs {customer.received}</div>
                                                </th>
                                                <th>
                                                    <div className={`font-bold ${customer.balance < 0 ? 'text-error' : 'text-success'}`}>Rs {customer.balance}</div>
                                                </th>
                                                <td>
                                                    <div className={`btn btn-outline border-2 ${customer.balance < 0 ? 'btn-error' : 'btn-success'}`}>
                                                        {customer.balance < 0 ? 'Pay' : 'Get'}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                            </table>

                        </div>
                    </div>
                </div>
            </div>
                <Footer />
            </div>
            );
}

            export default BusinessDashboard;