import { React, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessNavbar from './BusinessNavbar';
import { SearchOutlined, AddCircleOutline, AccountCircleRounded, History, DeleteForeverOutlined } from '@mui/icons-material';

const BusinessExpense = () => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/transactionHistory');
    };

    const [showAddUserForm, setShowAddUserForm] = useState(false);

    const handleAddUserClick = () => {
        setShowAddUserForm(true);
    };

    const handleCloseForm = () => {
        setShowAddUserForm(false);
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        // You can send form data to backend or perform other actions
        // After submission, you may want to close the form
        setShowAddUserForm(false);
    };

    return (
        <div style={{ height: "100%" }}>
            <div>
                <BusinessNavbar />
            </div>
            <div>
                <div className='flex items-center justify-between mx-16 my-10'>
                    <div className='flex items-center space-x-2'>
                        <label className="input input-bordered border-2 border-black text-black flex items-center gap-2 bg-[#f1efef] text-black ">
                            <input type="text" className="grow" placeholder="Search by name" />
                        </label>
                        <label className="text-xl pb-2" htmlFor=""></label>
                        <select
                            className='input input-bordered flex items-center border-2 border-black bg-[#f1efef] text-black '
                            name="category"
                        >
                            <option value="" disabled selected>
                                Select a category ▼
                            </option>
                            <option value="Food">Customer</option>
                            <option value="Health">Dealer</option>
                            <option value="Groceries">Retailer</option>
                            <option value="Transport">Loan</option>
                        </select>

                        <button className='h-10 btn bg-success text-white border-none'>Search <SearchOutlined /></button>
                    </div>

                    <div>
                        <button className='btn bg-success text-white border-none' onClick={() => {
                            document.getElementById('my_modal_3').showModal();
                        }}><AddCircleOutline />Add User</button>
                    </div>
                </div>

                <div className='m-20 mt-16 flex flex-col space-y-20 justify-center items-center'>
                    <div className="card w-5/6  p-10 bg-white text-black border  space-y-4 " style={{ boxShadow: "2px 2px 10px 2px #00000050" }}>
                        <button className='text-left btn no-animation text-xl text-black w-44 mb-4 bg-white'>Customer (10) </button>
                        <div className="card-compact py-6 bg-white border-2  border-success flex flex-row justify-between items-center rounded pl-28 pr-28 " >
                            <div className='flex space-x-4 items-center'>
                                <AccountCircleRounded style={{ fontSize: "30px" }} />
                                <h2 className='text-xl'>Rishav</h2>
                            </div>
                            <div className='flex space-x-4 items-center'>
                                <h2 className='text-xl pr-20'> Balance: <span className='text-error font-bold'>- Rs 500</span></h2>
                                <History onClick={handleCardClick} style={{ fontSize: "30px" }} />
                                <DeleteForeverOutlined style={{ fontSize: "30px" }} />
                            </div>
                        </div>
                        <div className="card-compact py-6 bg-[#b2f0d6] flex flex-row justify-between items-center rounded pl-28 pr-28 " >
                            <div className='flex space-x-4 items-center'>
                                <AccountCircleRounded style={{ fontSize: "30px" }} />
                                <h2 className='text-xl'>Rajashree</h2>
                            </div>
                            <div className='flex space-x-4 items-center'>
                                <h2 className='text-xl pr-20'> Balance: <span className='text-error font-bold'>- Rs 500</span></h2>
                                <History onClick={handleCardClick} style={{ fontSize: "30px" }} />
                                <DeleteForeverOutlined style={{ fontSize: "30px" }} />
                            </div>
                        </div>
                        <div className="card-compact py-6 bg-white border-2  border-success flex flex-row justify-between items-center rounded pl-28 pr-28 " >
                            <div className='flex space-x-4 items-center'>
                                <AccountCircleRounded style={{ fontSize: "30px" }} />
                                <h2 className='text-xl'>Arjo</h2>
                            </div>
                            <div className='flex space-x-4 items-center'>
                                <h2 className='text-xl pr-20'> Balance: <span className='text-error font-bold'>- Rs 500</span></h2>
                                <History onClick={handleCardClick} style={{ fontSize: "30px" }} />
                                <DeleteForeverOutlined style={{ fontSize: "30px" }} />
                            </div>
                        </div>
                        <div className="card-compact py-6 bg-[#b2f0d6] flex flex-row justify-between items-center rounded pl-28 pr-28 " >
                            <div className='flex space-x-4 items-center'>
                                <AccountCircleRounded style={{ fontSize: "30px" }} />
                                <h2 className='text-xl'>Anwesha</h2>
                            </div>
                            <div className='flex space-x-4 items-center'>
                                <h2 className='text-xl pr-20'> Balance: <span className='text-error font-bold'>- Rs 500</span></h2>
                                <History onClick={handleCardClick} style={{ fontSize: "30px" }} />
                                <DeleteForeverOutlined style={{ fontSize: "30px" }} />
                            </div>
                        </div>
                    </div>

                    <div className="card w-5/6  p-10 bg-white text-black border space-y-4 " style={{ boxShadow: "2px 2px 10px 2px #00000050" }}>
                        <button className='text-left btn no-animation text-xl text-black w-44 mb-4 bg-white'>Dealer (20) </button>
                        <div className="card-compact py-6 bg-white border-2  border-success flex flex-row justify-between items-center rounded pl-28 pr-28 " >
                            <div className='flex space-x-4 items-center'>
                                <AccountCircleRounded  style={{ fontSize: "30px" }} />
                                <h2 className='text-xl'>Rishav</h2>
                            </div>
                            <div className='flex space-x-4 items-center'>
                                <h2 className='text-xl pr-20'> Balance: <span className='text-error font-bold'>- Rs 500</span></h2>
                                <History  onClick={handleCardClick} style={{ fontSize: "30px" }} />
                                <DeleteForeverOutlined style={{ fontSize: "30px" }} />
                            </div>
                        </div>
                        <div className="card-compact py-6 bg-[#b2f0d6] flex flex-row justify-between items-center rounded pl-28 pr-28 " >
                            <div className='flex space-x-4 items-center'>
                                <AccountCircleRounded  style={{ fontSize: "30px" }} />
                                <h2 className='text-xl'>Rishav</h2>
                            </div>
                            <div className='flex space-x-4 items-center'>
                                <h2 className='text-xl pr-20'> Balance: <span className='text-error font-bold'>- Rs 500</span></h2>
                                <History  onClick={handleCardClick} style={{ fontSize: "30px" }} />
                                <DeleteForeverOutlined style={{ fontSize: "30px" }} />
                            </div>
                        </div>
                        <div className="card-compact py-6 bg-white border-2  border-success flex flex-row justify-between items-center rounded pl-28 pr-28 " >
                            <div className='flex space-x-4 items-center'>
                                <AccountCircleRounded  style={{ fontSize: "30px" }} />
                                <h2 className='text-xl'>Rishav</h2>
                            </div>
                            <div className='flex space-x-4 items-center'>
                                <h2 className='text-xl pr-20'> Balance: <span className='text-error font-bold'>- Rs 500</span></h2>
                                <History  onClick={handleCardClick} style={{ fontSize: "30px" }} />
                                <DeleteForeverOutlined style={{ fontSize: "30px" }} />
                            </div>
                        </div>
                        <div className="card-compact py-6 bg-[#b2f0d6] flex flex-row justify-between items-center rounded pl-28 pr-28 " >
                            <div className='flex space-x-4 items-center'>
                                <AccountCircleRounded  style={{ fontSize: "30px" }} />
                                <h2 className='text-xl'>Rishav</h2>
                            </div>
                            <div className='flex space-x-4 items-center'>
                                <h2 className='text-xl pr-20'> Balance: <span className='text-error font-bold'>- Rs 500</span></h2>
                                <History  onClick={handleCardClick} style={{ fontSize: "30px" }} />
                                <DeleteForeverOutlined style={{ fontSize: "30px" }} />
                            </div>
                        </div>
                    </div>
                </div>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box bg-white">
                        {/* Form close button  */}
                        <form method="dialog">
                            <button className="btn text-xl btn-circle btn-ghost absolute right-8 top-10">✕</button>
                        </form>

                        {/* Form inputs  */}
                        <div className='flex justify-center'>
                            <form action="" className='flex w-3/4  flex-col' >
                                <h2 className='font-bold text-center text-success text-3xl py-10'>Add User</h2>
                                <label className="text-xl pb-2" htmlFor="">Enter User name </label>
                                <input type="text"
                                    name="name"

                                    className='bg-white border-success border-2 rounded text-black px-2 py-2 mb-10' />

                                <label className="text-xl pb-2" htmlFor="">Select Category</label>
                                <select
                                    className='bg-white border-success border-2 rounded text-black px-2 py-2 mb-10'
                                    name="category"

                                >
                                    <option value="" disabled selected>
                                        Select a category
                                    </option>
                                    <option value="Food">Customer</option>
                                    <option value="Health">Dealer</option>
                                    <option value="Groceries">Retailer</option>
                                    <option value="Transport">Loan</option>
                                </select>


                                <div className='flex items-center justify-center space-x-6 py-4'>
                                    <button className='btn btn-ghost bg-success text-white text-lg w-28'>Add</button>
                                    <form method="dialog">
                                        <button className='btn btn-ghost bg-success text-white text-lg w-28'>Cancel</button>
                                    </form>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default BusinessExpense;
