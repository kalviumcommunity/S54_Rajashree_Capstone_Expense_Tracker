import { React, useState } from 'react'
import TransactionNavbar from './TransactionNavbar'
import { ArrowOutward, AddCircle, CalendarMonth, CallReceived, Edit, DeleteForever } from '@mui/icons-material'


const TransactionHistory = () => {

    const [showAddUserForm, setShowAddUserForm] = useState(false);

    const handleAddUserClick = () => {
        setShowAddUserForm(true);
    };

    const handleCloseForm = () => {
        setShowAddUserForm(false);
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        setShowAddUserForm(false);
    };


    return (
        <div style={{ height: "100%", backgroundColor: "#f7f9fc" }}>
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
                                    <input type="date" className='bg-white border-black ' />
                                    <div className='divider divider-horizontal divider-neutral'></div>
                                    <input type="date" className='bg-white border-black' />
                                </label>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label className="font-semibold  text-black" htmlFor="">Status</label>
                            <select
                                className='bg-white input input-bordered border-black px-10'
                                name="status"

                            >
                                <option value="" disabled selected>
                                    Select status ▼
                                </option>
                                <option value="all">All</option>
                                <option value="paid">Paid</option>
                                <option value="received">Received</option>
                            </select>
                        </div>
                        <div>
                            <div className='btn bg-success text-white border-none mt-6'>Apply Changes</div>
                        </div>
                    </div>
                    <div className='flex justify-between px-24 py-10'>
                        <h2 className='text-2xl font-semibold '> Transactions</h2>
                        <h2 className='text-xl'> See all</h2>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='w-5/6'>
                            <div className="overflow-x-auto w-full">

                                <table className="table flex items-center justify-center w-full ">
                                    {/* head */}
                                    <thead>
                                        <tr className='text-[#454545]' style={{ fontSize: "15px" }}>
                                            <th></th>
                                            <th>Date and Time</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Amount</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='w-full tableBody' >
                                        {/* row 1 */}
                                        <tr className='bg-white border-2 border-[#a3a3a3]' >
                                            <td>
                                                <div className="avatar rounded-xl border border-4 border-success">
                                                    <div className="mask mask-squircle w-8 h-8">
                                                        <CallReceived className="text-success " style={{ fontSize: "32px" }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='space-y-2'>
                                                <div className="font-bold">30-04-2024</div>
                                                <div className="text-[#979595]">08:15pm</div>
                                            </td>
                                            <td>Sold chocolates</td>
                                            <td><div className='btn btn-outline border-2 btn-success '>Received</div></td>
                                            <th>
                                                <div className="font-bold text-success">Rs 500</div>
                                            </th>
                                            <td>
                                                <div className='flex space-x-4 items-center'>
                                                    <div><Edit /></div>
                                                    <div><DeleteForever /></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className='bg-[#f7f9fc]'>
                                            <div className='h-4'></div>
                                        </tr>
                                        {/* row 2 */}
                                        <tr className='bg-white border-2 border-[#a3a3a3] ' >
                                            <td>
                                                <div className="avatar rounded-xl border border-4 border-error">
                                                    <div className="mask mask-squircle w-8 h-8">
                                                        <ArrowOutward className="text-error" style={{ fontSize: "32px" }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='space-y-2'>
                                                <div className="font-bold">30-04-2024</div>
                                                <div className="text-[#979595]">08:15pm</div>
                                            </td>
                                            <td><h2 className='max-w-lg'>Bought Chocolates</h2></td>
                                            <td><div className='btn btn-outline border-2 btn-error '>Paid</div></td>
                                            <th>
                                                <div className="font-bold text-error">Rs 500</div>
                                            </th>
                                            <td>
                                                <div className='flex space-x-4 items-center'>
                                                    <div><Edit /></div>
                                                    <div><DeleteForever /></div>
                                                </div>
                                            </td>

                                        </tr>
                                        <tr className='bg-[#f7f9fc]'>
                                            <div className='h-4'></div>
                                        </tr>
                                        {/* row 3 */}
                                        <tr className='bg-white border-2 border-[#a3a3a3] ' >
                                            <td>
                                                <div className="avatar rounded-xl border border-4 border-error">
                                                    <div className="mask mask-squircle w-8 h-8">
                                                        <ArrowOutward className="text-error" style={{ fontSize: "32px" }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='space-y-2'>
                                                <div className="font-bold">30-04-2024</div>
                                                <div className="text-[#979595]">08:15pm</div>
                                            </td>
                                            <td>Bought chocolates</td>
                                            <td><div className='btn btn-outline border-2 btn-error '>Paid</div></td>
                                            <th>
                                                <div className="font-bold text-error">Rs 500</div>
                                            </th>
                                            <td>
                                                <div className='flex space-x-4 items-center'>
                                                    <div><Edit /></div>
                                                    <div><DeleteForever /></div>
                                                </div>
                                            </td>

                                        </tr>
                                        <tr className='bg-[#f7f9fc]'>
                                            <div className='h-4'></div>
                                        </tr>
                                        {/* row 4 */}
                                        <tr className='bg-white border-2 border-[#a3a3a3] ' >
                                            <td>
                                                <div className="avatar rounded-xl border border-4 border-error">
                                                    <div className="mask mask-squircle w-8 h-8">
                                                        <ArrowOutward className="text-error" style={{ fontSize: "32px" }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='space-y-2'>
                                                <div className="font-bold">30-04-2024</div>
                                                <div className="text-[#979595]">08:15pm</div>
                                            </td>
                                            <td>Bought chocolates</td>
                                            <td><div className='btn btn-outline border-2 btn-error '>Paid</div></td>
                                            <th>
                                                <div className="font-bold text-error">Rs 500</div>
                                            </th>
                                            <td>
                                                <div className='flex space-x-4 items-center'>
                                                    <div><Edit /></div>
                                                    <div><DeleteForever /></div>
                                                </div>
                                            </td>


                                        </tr>
                                        <tr className='bg-[#f7f9fc]'>
                                            <div className='h-4'></div>
                                        </tr>
                                        {/* Row 5 */}
                                        <tr className='bg-white border-2 border-[#a3a3a3]' >
                                            <td>
                                                <div className="avatar rounded-xl border border-4 border-success">
                                                    <div className="mask mask-squircle w-8 h-8">
                                                        <CallReceived className="text-success " style={{ fontSize: "32px" }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='space-y-2'>
                                                <div className="font-bold">30-04-2024</div>
                                                <div className="text-[#979595]">08:15pm</div>
                                            </td>
                                            <td>Sold chocolates</td>
                                            <td><div className='btn btn-outline border-2 btn-success '>Received</div></td>
                                            <th>
                                                <div className="font-bold text-success">Rs 500</div>
                                            </th>
                                            <td>
                                                <div className='flex space-x-4 items-center'>
                                                    <div><Edit /></div>
                                                    <div><DeleteForever /></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className='bg-[#f7f9fc]'>
                                            <div className='h-4'></div>
                                        </tr>
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
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box bg-white">
                            {/* Form close button  */}
                            <form method="dialog">
                                <button className="btn text-xl btn-circle btn-ghost absolute right-8 top-8">✕</button>
                            </form>

                            {/* Form inputs  */}
                            <div className='flex justify-center'>
                                <form action="" className='flex w-3/4 h-5/6  flex-col' >
                                    <h2 className='font-bold text-center text-success text-3xl pt-4 pb-8 '>Add Transaction</h2>

                                    <label className="text-xl pb-2" htmlFor="">Enter Date </label>
                                    <input type="date"
                                        name="date"

                                        className='bg-white border-success border-2 rounded text-black px-2 py-2 mb-6' />

                                    <label className="text-xl pb-2" htmlFor="">Enter Amount </label>
                                    <input type="number"
                                        name="amount"

                                        className='bg-white border-success border-2 rounded text-black px-2 py-2 mb-6' />

                                    <label className="text-xl pb-2" htmlFor="">Select Status</label>
                                    <select
                                        className='bg-white border-success border-2 rounded text-black px-2 py-2 mb-6'
                                        name="status"
                                    >
                                        <option value="" disabled selected>
                                            Select status
                                        </option>
                                        <option value="Food">Paid</option>
                                        <option value="Health">Received</option>
                                    </select>

                                    <label className="text-xl pb-2" htmlFor="">Enter Description </label>
                                    <input type="text"
                                        name="description"

                                        className='bg-white border-success border-2 rounded text-black px-2 py-2 ' />

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
                <div className='pt-10'>

                    <div className="card flex items-center space-y-4 w-64 m-10 bg-success border border-2 border-success">
                        <div className="avatar space-y-4 mt-10 flex flex-col justify-center items-center">
                            <div className="w-24 rounded-full bg-white">
                                <img src="https://static.thenounproject.com/png/2416926-200.png" />
                            </div>
                            <h2 className='text-xl text-white font-bold'>Rishav</h2>
                        </div>
                        <div className="card-body space-y-2">
                            <h2 className="card-title text-[#d9dbde] text-lg">Category:<span className='text-white text-xl'> Customer</span></h2>
                            <h2 className="card-title text-[#d9dbde] text-lg">Paid:<span className='text-white text-xl'> Rs 500</span></h2>
                            <h2 className="card-title text-[#d9dbde] text-lg ">Received: <span className='text-white text-xl'> Rs 1000</span></h2>
                            <h2 className="card-title text-[#d9dbde] text-lg">Balance:<span className='text-white text-xl'> Rs 500</span></h2>
                        </div>
                    </div>
                    {/* <div className="card flex items-center w-96 bg-white border border-2 border-error">
                        <div className="card-body">
                        </div>
                    </div>
                    <div className="card flex items-center  w-96 bg-white border border-2 border-warning">
                        <div className="card-body">
                        </div>
                    </div> */}

                </div>
            </div>

        </div>

    )
}

export default TransactionHistory