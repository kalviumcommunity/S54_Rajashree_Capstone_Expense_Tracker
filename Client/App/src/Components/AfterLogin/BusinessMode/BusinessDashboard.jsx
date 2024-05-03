import React, { useContext, useEffect, useState } from 'react';
import BusinessNavbar from './BusinessNavbar';
import { AppContext } from '../../Context';
import { Pie } from 'react-chartjs-2'; // Import Pie component from react-chartjs-2
import { ArrowUpward, ArrowDownward, CalendarMonth, SearchOutlined, CallReceived, Edit, DeleteForever, ArrowOutward } from '@mui/icons-material';
import Footer from '../../BeforeLogin/Footer';

const BusinessDashboard = () => {
    const { username, setUsername } = useContext(AppContext);
    const { userEmail, setUserEmail } = useContext(AppContext);

    useEffect(() => {
        const userEmailFromLocalStorage = localStorage.getItem('userEmail');
        const userNameFromLocalStorage = localStorage.getItem('username');
        if (userEmailFromLocalStorage) {
            setUserEmail(userEmailFromLocalStorage);
        }
        if (userNameFromLocalStorage) {
            setUsername(userNameFromLocalStorage);
        }
    }, []);

    // Corrected pieData
    const pieData = {
        datasets: [
            {
                data: [150, 200],
                backgroundColor: ['#ff5861', '#00a96e'],
                hoverOffset: 4,
            },
        ],
    };

    const [sortDirection, setSortDirection] = useState({
        paid: 'downward',
        received: 'downward',
        balance: 'downward'
    });

    const toggleSortDirection = (column) => {
        setSortDirection(prevState => ({
            ...prevState,
            [column]: prevState[column] === 'downward' ? 'upward' : 'downward'
        }));
    };

    const sortData = (type) => {
        const sorted = [...data].sort((a, b) => {
            return sortDirection[type] === 'downward' ? a[type] - b[type] : b[type] - a[type];
        });

        setData(sorted);
        toggleSortDirection(type);
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
                <div className="flex justify-evenly items-center mt-4 mb-10 ">
                    {/* 1st Card */}
                    <div className="card w-1/3 h-64 text-black border border-2 border-success"  style={{ backgroundColor: 'rgba(99, 189, 137,0.2)'}} >
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
                    </div>
                    <div
                        className="card w-1/3 h-64 border border-2 border-success"
                        style={{ backgroundColor: 'rgba(99, 189, 137,0.2)' }}
                    >
                        <div className="flex flex-row  justify-between card-body text-black p-6 px-12">
                            <div className='space-y-4'>
                                <div className="space-y-4">
                                    <h2 className="font-bold text-md">Total Paid</h2>
                                    <h2 className="font-bold text-3xl text-error">
                                        Rs 3000
                                    </h2>
                                </div>
                                <div className='divider divider-neutral'></div>
                                <div className="space-y-4">
                                    <h2 className=" font-bold text-md ">Total Received</h2>
                                    <h2 className="mb-4 font-bold text-3xl text-success">
                                        Rs 5000
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
                                        <th onClick={() => sortData('name')}>Name</th>
                                        <th>Category</th>
                                        <th onClick={() => sortData('paid')}>
                                            Paid {getIcon('paid')}
                                        </th>
                                        <th onClick={() => sortData('received')}>
                                            Received {getIcon('received')}
                                        </th>
                                        <th onClick={() => sortData('balance')}>
                                            Balance {getIcon('balance')}
                                        </th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody className='w-full tableBody' >
                                    {/* row 1 */}
                                    <tr className='bg-white border-2 border-[#a3a3a3] ' >

                                        <td><h2 className='font-bold'>Rajashree</h2></td>
                                        <td>Dealer</td>
                                        <th>
                                            <div className="font-bold text-error">Rs 500</div>
                                        </th>
                                        <th>
                                            <div className="font-bold text-success">Rs 1000</div>
                                        </th>
                                        <th>
                                            <div className="font-bold text-error">Rs 500</div>
                                        </th>
                                        <td><div className='btn btn-outline border-2 btn-error '>Pay</div></td>

                                    </tr>
                                    {/* <tr className='bg-[#f7f9fc]'>
                                        <div className='h-4'></div>
                                    </tr> */}
                                    {/* row 2 */}
                                    <tr className='bg-white border-2 border-[#a3a3a3] ' >
                                        <td><h2 className='font-bold'>Rishav</h2></td>
                                        <td><h2 className='max-w-lg'>Customer</h2></td>
                                        <th>
                                            <div className="font-bold text-error">Rs 500</div>
                                        </th>
                                        <th>
                                            <div className="font-bold text-success">Rs 1400</div>
                                        </th>
                                        <th>
                                            <div className="font-bold text-error">Rs 900</div>
                                        </th>
                                        <td><div className='btn btn-outline border-2 btn-error'>Pay</div></td>


                                    </tr>
                                    {/* <tr className='bg-[#f7f9fc]'>
                                        <div className='h-4'></div>
                                    </tr> */}
                                    {/* row 3 */}
                                    <tr className='bg-white border-2 border-[#a3a3a3] ' >
                                        <td><h2 className='font-bold'>Diya</h2></td>
                                        <td>Customer</td>
                                        <th>
                                            <div className="font-bold text-error">Rs 1500</div>
                                        </th>
                                        <th>
                                            <div className="font-bold text-success">Rs 500</div>
                                        </th>
                                        <th>
                                            <div className="font-bold text-success">Rs 1000</div>
                                        </th>
                                        <td><div className='btn btn-outline border-2 btn-success '>Get</div></td>


                                    </tr>
                                    {/* <tr className='bg-[#f7f9fc]'>
                                        <div className='h-4'></div>
                                    </tr> */}
                                    {/* row 4 */}
                                    <tr className='bg-white border-2 border-[#a3a3a3] ' >
                                        <td><h2 className='font-bold'>Ritu</h2></td>
                                        <td>Customer</td>
                                        <th>
                                            <div className="font-bold text-error">Rs 500</div>
                                        </th>
                                        <th>
                                            <div className="font-bold text-success">Rs 500</div>
                                        </th>
                                        <th>
                                            <div className="font-bold text-success">Rs 0</div>
                                        </th>
                                        <td><div className='btn btn-outline border-2 btn-success '>Get</div></td>
                                    </tr>
                                    {/* <tr className='bg-[#f7f9fc]'>
                                        <div className='h-4'></div>
                                    </tr> */}
                                    {/* Row 5 */}
                                    <tr className='bg-white border-2 border-[#a3a3a3]' >
                                        <td><h2 className='font-bold'>Rajashree</h2></td>
                                        <td>Sold chocolates</td>
                                        <th>
                                            <div className="font-bold text-error">Rs 500</div>
                                        </th>
                                        <th>
                                            <div className="font-bold text-success">Rs 400</div>
                                        </th>
                                        <th>
                                            <div className="font-bold text-success">Rs 100</div>
                                        </th>
                                        <td><div className='btn btn-outline border-2 btn-success '>Get</div></td>

                                    </tr>
                                    {/* <tr className='bg-[#f7f9fc]'>
                                        <div className='h-4'></div>
                                    </tr> */}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default BusinessDashboard;
