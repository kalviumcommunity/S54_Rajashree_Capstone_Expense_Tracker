import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessNavbar from './BusinessNavbar';
import { SearchOutlined, AddCircleOutline, AccountCircleRounded, History, DeleteForeverOutlined } from '@mui/icons-material';
import { AppContext } from '../../Context';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const BusinessExpense = () => {
    const navigate = useNavigate();
    const { userEmail, setUserEmail } = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: '',
        category: ''
    });
    const [businessData, setBusinessData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [filtered, setFiltered] = useState(false);

    useEffect(() => {
        const userEmailFromLocalStorage = localStorage.getItem('userEmail');
        if (userEmailFromLocalStorage) {
            setUserEmail(userEmailFromLocalStorage);
        }
        setLoading(true);
        axios.get('https://s54-rajashree-capstone-expense-tracker.vercel.app/business')
            .then(response => {
                setBusinessData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(true);
                toast.error("Oh no!! error occurred, please try again after sometime.")
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const dataToPost = {
            ...formData,
            email: userEmail,
            paid: 0,
            received: 0,
            balance: 0
        };

        axios.post('https://s54-rajashree-capstone-expense-tracker.vercel.app/business/post', dataToPost)
            .then(response => {
                toast.success("User added");
                setFormData({
                    name: '',
                    category: ''
                });
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("Failed to add user. Please try again.");
                console.log(dataToPost);
            });
    };

    const handleCardClick = (userId, customerName, category) => {
        console.log('Customer Name:', customerName);
        console.log('Category:', category);
        Cookies.set('customerName', customerName);
        Cookies.set('category', category);
        navigate("/transactionHistory")
    };

    const handleDelete = (userId, customerId) => {
        axios.delete(`https://s54-rajashree-capstone-expense-tracker.vercel.app/business/delete/${userId}/${customerId}`)
            .then(response => {
                toast.success("User deleted");
                axios.get('https://s54-rajashree-capstone-expense-tracker.vercel.app/business')
                    .then(response => {
                        setBusinessData(response.data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error:', error);
                console.error('userId:', userId);
                console.error('customerId:', customerId);
            });
    };

    const handleSearch = () => {
        setFiltered(true);
    };

    const handleReset = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setFiltered(false);
    };

    const filteredData = businessData.filter(item => item.email === userEmail && 
        (filtered && selectedCategory ? item.customers.some(customer => customer.category === selectedCategory) : true)
    );

    const customerCount = businessData.filter(item => item.email === userEmail)
        .reduce((total, item) => total + item.customers.length, 0);

    console.log(customerCount);

    return (
        <div style={{ height: customerCount < 2 ? "100vh" : "100%" }}>
            <div>
                <BusinessNavbar />
            </div>
            <div>
                <div className='flex items-center justify-between mx-16 my-10'>
                    <div className='flex items-center space-x-2'>
                        <label className="input input-bordered border-2 border-black text-black flex items-center gap-2 bg-[#f1efef] text-black">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Search by name"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </label>
                        <label className="text-xl pb-2" htmlFor=""></label>
                        <select
                            className='input input-bordered flex items-center border-2 border-black bg-[#f1efef] text-black'
                            name="category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="" disabled selected>
                                Select a category ▼
                            </option>
                            <option value="Customer">Customer</option>
                            <option value="Dealer">Dealer</option>
                            <option value="Retailer">Retailer</option>
                            <option value="Loan">Loan</option>
                        </select>

                        <button className='h-10 btn bg-success text-white border-none' onClick={handleSearch}>Search <SearchOutlined /></button>
                        <button className='h-10 btn border border-2 border-success text-success bg-white' onClick={handleReset}>Reset</button>
                    </div>

                    <div>
                        <button className='btn bg-success text-white border-none' onClick={() => {
                            document.getElementById('my_modal_3').showModal();
                        }}><AddCircleOutline />Add User</button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center" style={{ height: "60vh" }}>
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : filtered && filteredData.length === 0 ? (
                    <div className="flex justify-center items-center">
                        <h2 className="text-2xl text-gray-600">No users found matching the criteria.</h2>
                    </div>
                ) : (
                    <div className='m-20 mt-16 flex flex-col space-y-20 justify-center items-center'>
                        {(filtered ? filteredData : businessData.filter(item => item.email === userEmail)).map((userData) => (
                            <div className="w-5/6 space-y-10" key={userData._id}>
                                {Object.entries(userData.customers.reduce((acc, customer) => {
                                    if (!filtered || 
                                        (selectedCategory && customer.category === selectedCategory) || 
                                        (searchTerm && customer.name.toLowerCase().includes(searchTerm.toLowerCase()))) {
                                        acc[customer.category] = acc[customer.category] || [];
                                        acc[customer.category].push(customer);
                                    }
                                    return acc;
                                }, {})).map(([category, customers]) => (
                                    <div key={category} className="card w-full p-10 bg-white text-black border space-y-4" style={{ boxShadow: "2px 2px 10px 2px #00000050" }}>
                                        <button className='text-left btn no-animation text-xl text-black w-44 mb-4 bg-white'>{category} ({customers.length})</button>
                                        {customers.map((customer) => (
                                            <div key={customer._id} className="card-compact py-6 bg-white border-2 border-success flex flex-row justify-between items-center rounded pl-28 pr-28">
                                                <div className='flex space-x-4 items-center'>
                                                    <AccountCircleRounded style={{ fontSize: "30px" }} />
                                                    <h2 className='text-xl'>{customer.name}</h2>
                                                </div>
                                                <div className='flex space-x-4 items-center'>
                                                    <h2 className='text-xl pr-20'>Balance: <span className={customer.balance < 0 ? 'text-error font-bold' : 'text-success font-bold'}>Rs {customer.balance}</span></h2>

                                                    <History onClick={() => handleCardClick(userData._id, customer.name, customer.category)} style={{ fontSize: "30px" }} />
                                                    <DeleteForeverOutlined onClick={() => handleDelete(userData._id, customer._id)} style={{ fontSize: "30px" }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}

                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box bg-white">
                        {/* Form close button */}
                        <form method="dialog">
                            <button className="btn text-xl btn-circle btn-ghost absolute right-8 top-10">✕</button>
                        </form>

                        {/* Form inputs */}
                        <div className='flex justify-center'>
                            <form onSubmit={handleFormSubmit} className='flex w-3/4  flex-col'>
                                <h2 className='font-bold text-center text-success text-3xl py-10'>Add User</h2>
                                <label className="text-xl pb-2" htmlFor="">Enter User name </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className='bg-white border-success border-2 rounded text-black px-2 py-2 mb-10'
                                />

                                <label className="text-xl pb-2" htmlFor="">Select Category</label>
                                <select
                                    className='bg-white border-success border-2 rounded text-black px-2 py-2 mb-10'
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="" disabled>Select a category</option>
                                    <option value="Customer">Customer</option>
                                    <option value="Dealer">Dealer</option>
                                    <option value="Retailer">Retailer</option>
                                    <option value="Loan">Loan</option>
                                </select>

                                <div className='flex items-center justify-center space-x-6 py-4'>
                                    <button className='btn btn-ghost bg-success text-white text-lg w-28'>Add</button>
                                    <button type="button" onClick={() => document.getElementById('my_modal_3').close()} className='btn btn-ghost bg-success text-white text-lg w-28'>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
            <ToastContainer />
        </div>
    );
};

export default BusinessExpense;
