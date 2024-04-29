import React, { useContext, useEffect, useState } from 'react';
import BusinessNavbar from './BusinessNavbar';
import { AppContext } from '../../Context';
import { Pie } from 'react-chartjs-2'; // Import Pie component from react-chartjs-2
import { ArrowUpward, ArrowDownward, SearchOutlined } from '@mui/icons-material';
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
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                hoverOffset: 4,
            },
        ],
    };

    const [sortDirection, setSortDirection] = useState({
        borrowed: 'downward',
        lended: 'downward',
        balance: 'downward'
    });
    const [data, setData] = useState([
        { name: 'John', pay: 100, lended: 50, balance: 50 },
        { name: 'Alice', pay: 150, lended: 100, balance: 50 },
        { name: 'Bob', pay: 200, lended: 50, balance: 150 },
    ]);

    const toggleSortDirection = (column) => {
        setSortDirection(prevState => ({
            ...prevState,
            [column]: prevState[column] === 'downward' ? 'upward' : 'downward'
        }));
    };

    const sortData = (type) => {
        const sorted = [...data].sort((a, b) => {
            if (type === 'name') {
                return a.name.localeCompare(b.name);
            } else {
                return a[type] - b[type];
            }
        });

        const direction = sortDirection[type];
        if (direction === 'downward') {
            sorted.reverse();
            setSortDirection(prevState => ({
                ...prevState,
                [type]: 'upward'
            }));
        } else {
            setSortDirection(prevState => ({
                ...prevState,
                [type]: 'downward'
            }));
        }

        setData(sorted);
    };

    const getIcon = (column) => {
        if (column === 'pay') {
            return sortDirection.pay === 'downward' ? <ArrowDownward /> : <ArrowUpward />;
        } else if (column === 'lended') {
            return sortDirection.lended === 'downward' ? <ArrowDownward /> : <ArrowUpward />;
        } else if (column === 'balance') {
            return sortDirection.balance === 'downward' ? <ArrowDownward /> : <ArrowUpward />;
        }
        return null;
    };

    return (
        <div style={{ height: "100%" }}>
            <BusinessNavbar />
            <div>
            <div>
                <h2 className='text-3xl font-bold m-10 ml-44'>{`Welcome back, ${username}!!`}</h2>
            </div>
            <div className="flex justify-evenly items-center mt-4 mb-10 ">
                {/* 1st Card */}
                <div className="card w-1/3 h-64 bg-[#E0E0E0] text-black">
                    <div className="card-body p-6">
                        <h2 className="mb-4 font-bold text-md">Insights</h2>
                        <div className="flex items-center justify-center space-x-6">
                            <div style={{ width: '35%' }}>
                                <Pie data={pieData} />
                            </div>
                            <div className="text-center space-y-4">
                                <div className='space-y-4 items-center space-x-4 '>
                                    <div className=' flex justify-between items-center pt-2 pl-4 space-x-2'>
                                        <div className='w-10 h-4 rounded-full' style={{ backgroundColor: "rgb(255, 99, 132)" }}></div>
                                        <p className='font-[inter]'>Total Credit</p>
                                    </div>
                                    <div className='flex justify-between items-center  space-x-2'>
                                        <div className='w-10 h-4 rounded-full' style={{ backgroundColor: "rgb(54, 162, 235)" }}></div>
                                        <p className='font-[inter]'>Total Debit</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="card w-1/3 h-64"
                    style={{ backgroundColor: 'rgba(251, 188, 5, 0.3)' }}
                >
                    <div className="flex flex-row  justify-between card-body text-black p-6 px-12">
                        <div className='space-y-4'>
                            <div className="space-y-4">
                                <h2 className="font-bold text-md">Total Credit</h2>
                                <h2 className="font-bold text-3xl text-error">
                                    Rs 3000
                                </h2>
                            </div>
                            <div className='divider divider-neutral'></div>
                            <div className="space-y-4">
                                <h2 className=" font-bold text-md ">Total Debit</h2>
                                <h2 className="mb-4 font-bold text-3xl text-success">
                                    Rs 5000
                                </h2>
                            </div>
                        </div>

                        <div>
                            <button className="btn w-32 bg-[#FEB852] text-white font-light border-none">
                                April    
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center mt-12 mb-10'>
                <label className="input input-bordered w-72 p-4 flex items-center border border-2 border-blue-400 gap-2 bg-white text-black mt-5">
                    <SearchOutlined />
                    <input type="text" className="grow" placeholder="Search for user" />
                </label>
            </div>
            <div className='flex justify-center items-center text-center'>
                <div>
                    <table className='mb-10'>
                        {/* head */}
                        <thead >
                            <tr className='h-20'>
                                <th></th>
                                <th>Name</th>
                                <th onClick={() => sortData('pay')}>Borrowed {getIcon('pay')} </th>
                                <th onClick={() => sortData('lended')}>Lended {getIcon('lended')} </th>
                                <th onClick={() => sortData('balance')}>Balance {getIcon('balance')} </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map table rows */}
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td className='serialNo'>{index + 1}</td>
                                    <td className='nameTable'>{item.name}</td>
                                    <td className='green'>Rs {item.pay}</td>
                                    <td className='red'>Rs {item.lended}</td>
                                    <td>+ Rs {item.balance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    );
}

export default BusinessDashboard;
