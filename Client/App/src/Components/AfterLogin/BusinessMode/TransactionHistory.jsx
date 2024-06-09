import React, { useState, useEffect, useContext } from 'react';
import TransactionNavbar from './TransactionNavbar';
import { ArrowOutward, AddCircle, CalendarMonth, CallReceived, Edit, DeleteForever } from '@mui/icons-material';
import { AppContext } from '../../Context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const TransactionHistory = () => {
    const { userEmail, setUserEmail } = useContext(AppContext);
    const [customerName, setCustomerName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [userId, setUserId] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [formData, setFormData] = useState({
        date: "",
        amount: "",
        status: "",
        description: ""
    });
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paidTotal, setPaidTotal] = useState(0);
    const [receivedTotal, setReceivedTotal] = useState(0);

    const [showAllTransactions, setShowAllTransactions] = useState(false);
    const handleSeeAllClick = () => {
        setShowAllTransactions(true);
    };

    const [user, setUser] = useState("");
    const [customer, setCustomer] = useState("");
    const [originalTransactions, setOriginalTransactions] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [filterStatus, setFilterStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        axios.get(`https://s54-rajashree-capstone-expense-tracker.vercel.app/business`)
            .then(response => {

                const userData = response.data.find(user => user.email === userEmail);
                setUser(userData._id);


                const customerData = userData.customers.find(customer => customer.name === customerName && customer.category === categoryName);
                setCustomer(customerData._id);
            })
            .catch(error => {
                console.error('Error fetching business data:', error);
            });
    }, [userEmail, customerName, categoryName]);

    const updateBusinessData = () => {
        axios.put(`https://s54-rajashree-capstone-expense-tracker.vercel.app/business/put/${user}/${customer}`, {
            paid: paidTotal,
            received: receivedTotal
        })
            .then(response => {
                console.log("Business data updated successfully");
            })
            .catch(error => {
                console.error('Error updating business data:', error);
            });
    };

    useEffect(() => {
        if (user && customer) {
            updateBusinessData();
        }
    }, [user, customer, paidTotal, receivedTotal]);

    useEffect(() => {
        const userEmailFromLocalStorage = localStorage.getItem('userEmail');
        if (userEmailFromLocalStorage) {
            setUserEmail(userEmailFromLocalStorage);
        }

        const customer = Cookies.get('customerName');
        if (customer) {
            setCustomerName(customer);
            axios.get(`https://s54-rajashree-capstone-expense-tracker.vercel.app/transaction`)
                .then(response => {
                    const userTransactions = response.data.find(user => user.email === userEmailFromLocalStorage);
                    setUserId(userTransactions._id);

                    const customerTransactions = userTransactions.customers;
                    if (customerTransactions.length > 0) {
                        const matchedCustomer = customerTransactions.find(customer => customer.name === customerName && customer.category === categoryName);
                        if (matchedCustomer) {
                            setCustomerId(matchedCustomer._id);
                        }

                        const sortedTransactions = matchedCustomer ? matchedCustomer.transactions.sort((a, b) => new Date(b.date) - new Date(a.date)) : [];
                        setTransactions(sortedTransactions);
                        setOriginalTransactions(sortedTransactions);


                        let paidSum = 0;
                        let receivedSum = 0;
                        sortedTransactions.forEach(transaction => {
                            if (transaction.status === 'Paid') {
                                paidSum += parseFloat(transaction.amount);
                            } else if (transaction.status === 'Received') {
                                receivedSum += parseFloat(transaction.amount);
                            }
                        });
                        setPaidTotal(paidSum);
                        setReceivedTotal(receivedSum);
                    }

                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching transactions:', error);
                    setLoading(false);
                });
        }

        const category = Cookies.get('category');
        if (category) {
            setCategoryName(category);
        }
    }, [userEmail, customerName, categoryName]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmitForm = (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
            name: customerName,
            category: categoryName,
            email: userEmail
        };

        let requestPromise;
        if (selectedTransaction) {
            requestPromise = axios.put(`https://s54-rajashree-capstone-expense-tracker.vercel.app/transaction/put/${userId}/${customerId}/${selectedTransaction._id}`, formData);
        } else {
            requestPromise = axios.post('https://s54-rajashree-capstone-expense-tracker.vercel.app/transaction/post', dataToSend);
        }

        requestPromise
            .then(response => {
                setFormData({
                    date: "",
                    amount: "",
                    status: "",
                    description: ""
                });
                toast.success("Transaction updated successfully");
                updateTotals(user, customer);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                console.log(dataToSend);
                toast.error("Error occurred while updating");
            });
    };
    const handleEditClick = (transaction) => {
        setSelectedTransaction(transaction);
        setFormData({
            date: transaction.date,
            amount: transaction.amount,
            status: transaction.status,
            description: transaction.description
        });
        document.getElementById('my_modal_3').showModal(); // Open the modal
    };
    const handleDeleteClick = (transactionId) => {
        axios.delete(`https://s54-rajashree-capstone-expense-tracker.vercel.app/transaction/delete/${userId}/${customerId}/${transactionId}`)
            .then(response => {
                toast.success("Transaction deleted successfully");
                updateTotals(userId, customerId);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("Error occurred while deleting transaction");
            });
    };

    const updateTotals = (userId, customerId) => {
        axios.get(`https://s54-rajashree-capstone-expense-tracker.vercel.app/business/${userId}/${customerId}`)
            .then(response => {
                const { paid, received } = response.data;
                setPaidTotal(paid);
                setReceivedTotal(received);
                setBalance(received - paid);
            })
            .catch(error => {
                console.error('Error fetching business data:', error);
            });
    };

    const handleResetFilters = () => {
        setFilterStatus('');
        setStartDate('');
        setEndDate('');
        setTransactions(originalTransactions);
    };

    const handleCloseModal = () => {
        setFormData({
            date: "",
            amount: "",
            status: "",
            description: ""
        });
        setSelectedTransaction(null);
        document.getElementById('my_modal_3').close();
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === 'status') {
            setFilterStatus(value);
        } else if (name === 'startDate') {
            setStartDate(value);
        } else if (name === 'endDate') {
            setEndDate(value);
        }
    };

    const handleApplyFilters = () => {
        setIsFiltered(true);
        const filteredData = originalTransactions.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            const startDateFilter = startDate ? new Date(startDate) : null;
            const endDateFilter = endDate ? new Date(endDate) : null;
    
            if (filterStatus === 'all') {
                return (
                    (!startDateFilter || transactionDate >= startDateFilter) &&
                    (!endDateFilter || transactionDate <= endDateFilter)
                );
            } else {
                return (
                    transaction.status.toLowerCase() === filterStatus &&
                    (!startDateFilter || transactionDate >= startDateFilter) &&
                    (!endDateFilter || transactionDate <= endDateFilter)
                );
            }
        });
        setTransactions(filteredData);
    };

    const filteredTransactions = transactions;

    return (
        <div style={{ height: transactions.length <= 2 ? "100vh" : "100%", backgroundColor: "#f7f9fc" }}>
            <ToastContainer />
            <TransactionNavbar />
            <div className='flex justify-between'>
                <div className='w-5/6'>
                    <div className='flex justify-center items-center pt-10 space-x-10'>
                        <div className='flex'>
                            <div className='flex flex-col'>
                                <div className='flex justify-center w-5/6 pl-6'>
                                    <label htmlFor="" className='pr-48 font-semibold'>From</label>
                                    <label htmlFor="" className='font-semibold'>To</label>
                                </div>
                                <label className="input input-bordered m-2 flex items-center border border-1 border-black gap-4 bg-white text-black">
                                    <CalendarMonth />
                                    <div className='divider divider-horizontal divider-neutral'></div>
                                    <input
                                        type="date"
                                        className='bg-white border-black'
                                        name="startDate"
                                        value={startDate}
                                        onChange={handleFilterChange}
                                    />
                                    <div className='divider divider-horizontal divider-neutral'></div>
                                    <input
                                        type="date"
                                        className='bg-white border-black'
                                        name="endDate"
                                        value={endDate}
                                        onChange={handleFilterChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label className="font-semibold  text-black" htmlFor="">Status</label>
                            <select
                                className='bg-white input input-bordered border-black px-10'
                                name="status"
                                value={filterStatus}
                                onChange={handleFilterChange}
                            >
                                <option value="" disabled>
                                    Select status ▼
                                </option>
                                <option value="all">All</option>
                                <option value="paid">Paid</option>
                                <option value="received">Received</option>
                            </select>
                        </div>
                        <div className=' space-x-4'>
                            <div className='btn bg-success text-white border-none mt-6' onClick={handleApplyFilters}>Apply Changes</div>
                            <div className='btn bg-white text-success border-success border-2 mt-6' onClick={handleResetFilters}>Reset</div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center px-24 py-10'>
                        <h2 className='text-2xl font-semibold '> Transactions</h2>
                        {filteredTransactions.length >= 4 && !showAllTransactions && (
                            <h2 className='btn btn-success text-white ' onClick={handleSeeAllClick}> See all</h2>
                        )}
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='w-5/6'>
                            <div className="overflow-x-auto w-full">
                                <table className="table flex items-center justify-center w-full ">
                                    <thead>
                                        <tr className='text-[#454545]' style={{ fontSize: "15px" }}>
                                            <th></th>
                                            <th>Date</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Amount</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='w-full tableBody'>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4">Loading...</td>
                                            </tr>
                                        ) : filteredTransactions.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4">No transactions available. Add a transaction to see the history.</td>
                                            </tr>
                                        ) : filteredTransactions.slice(0, showAllTransactions ? filteredTransactions.length : 3).map((transaction, index) => (
                                            <React.Fragment key={index}>
                                                <tr className={`bg-white border-2 border-[#a3a3a3] ${transaction.status === 'Paid' ? 'text-error' : 'text-success'}`}>
                                                    <td>
                                                        <div className={`avatar rounded-xl border border-4 ${transaction.status === 'Paid' ? 'border-error' : 'border-success'}`}>
                                                            <div className="mask mask-squircle w-8 h-8">
                                                                {transaction.status === 'Paid' ? <ArrowOutward className="text-error" style={{ fontSize: "32px" }} /> : <CallReceived className="text-success" style={{ fontSize: "32px" }} />}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='space-y-2'>
                                                        <div className="font-bold text-black">{transaction.date}</div>
                                                    </td>
                                                    <td className='text-black'>{transaction.description}</td>
                                                    <td>
                                                        <div className={`btn btn-outline border-2 ${transaction.status === 'Paid' ? 'btn-error' : 'btn-success'}`}>
                                                            {transaction.status}
                                                        </div>
                                                    </td>
                                                    <th>
                                                        <div className="font-bold">{transaction.amount}</div>
                                                    </th>
                                                    <td>
                                                        <div className='flex space-x-4 items-center text-black'>
                                                            <div onClick={() => handleEditClick(transaction)}><Edit /></div>
                                                            <div onClick={() => handleDeleteClick(transaction._id)}><DeleteForever /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className='bg-[#f7f9fc]'>
                                                    <td colSpan="6" className='h-4'></td>
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <button
                        className="btn border-none text-white fixed bottom-4 rounded-full right-10 bg-success"
                        onClick={() => {
                            document.getElementById('my_modal_3').showModal();
                        }}
                    ><AddCircle /></button>
                </div>
                <div style={{ position: 'fixed', top: 30, right: 20 }}>
                    <div className='pt-10'>
                        <div className="card flex items-center space-y-4 w-64 m-10 bg-success border border-2 border-success">
                            <div className="avatar space-y-4 mt-10 flex flex-col justify-center items-center">
                                <div className="w-24 rounded-full bg-white">
                                    <img src="https://kalvium.community/assets/launcher-hero-avatar.f66604dd.svg" alt="avatar" />
                                </div>
                                <h2 className='text-xl text-white font-bold'>{customerName}</h2>
                            </div>
                            <div className="card-body space-y-2">
                                <h2 className="card-title text-[#d9dbde] text-lg">Category:<span className='text-white text-xl'> {categoryName}</span></h2>
                                <h2 className="card-title text-[#d9dbde] text-lg">Paid:<span className='text-white text-xl'> Rs {paidTotal}</span></h2>
                                <h2 className="card-title text-[#d9dbde] text-lg">Received: <span className='text-white text-xl'> Rs {receivedTotal}</span></h2>
                                <h2 className="card-title text-[#d9dbde] text-lg">Balance:<span className='text-white text-xl'> Rs {receivedTotal - paidTotal}</span></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-white">
                    <form method="dialog">
                        <button className="btn text-xl btn-circle btn-ghost absolute right-8 top-8" onClick={handleCloseModal}>✕</button>
                    </form>
                    <div className='flex justify-center'>
                        <form action="" className='flex w-3/4 h-5/6  flex-col' onSubmit={handleSubmitForm}>
                            <h2 className='font-bold text-center text-success text-3xl pt-4 pb-8 '>Add Transaction</h2>
                            <label className="text-xl pb-2" htmlFor="">Enter Date </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleFormChange}
                                className='bg-white border-success border-2 rounded text-black px-2 py-2 mb-6'
                            />
                            <label className="text-xl pb-2" htmlFor="">Enter Amount </label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleFormChange}
                                className='bg-white border-success border-2 rounded text-black px-2 py-2 mb-6'
                            />
                            <label className="text-xl pb-2" htmlFor="">Select Status</label>
                            <select
                                className='bg-white border-success border-2 rounded text-black px-2 py-2 mb-6'
                                name="status"
                                value={formData.status}
                                onChange={handleFormChange}
                            >
                                <option value="" disabled>
                                    Select status
                                </option>
                                <option value="Paid">Paid</option>
                                <option value="Received">Received</option>
                            </select>
                            <label className="text-xl pb-2" htmlFor="">Enter Description </label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleFormChange}
                                className='bg-white border-success border-2 rounded text-black px-2 py-2 '
                            />
                            <div className='flex items-center justify-center space-x-6 py-4'>
                                <button className='btn btn-ghost bg-success text-white text-lg w-28' type="submit">Add</button>
                                <button className='btn btn-ghost bg-success text-white text-lg w-28' type="button" onClick={handleCloseModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default TransactionHistory;