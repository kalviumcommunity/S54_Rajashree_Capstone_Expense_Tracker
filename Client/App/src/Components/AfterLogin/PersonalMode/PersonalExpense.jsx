import { useState, useContext, useEffect } from 'react';
import PersonalNavbar from './PersonalNavbar';
import Footer from '../../BeforeLogin/Footer';
import {
    RamenDining as RamenDiningIcon,
    LocalGroceryStore as LocalGroceryStoreIcon,
    MiscellaneousServices as MiscellaneousServicesIcon,
    Commute as CommuteIcon,
    HealthAndSafety as HealthAndSafetyIcon,
    ArrowRight as ArrowRightIcon,
    Savings,
} from '@mui/icons-material';
import { AppContext } from '../../Context';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import zIndex from '@mui/material/styles/zIndex';

const PersonalExpense = () => {
    const { userEmail, setUserEmail } = useContext(AppContext);
    const [expenseData, setExpenseData] = useState([]);
    const [formData, setFormData] = useState({
        category: '',
        spent: '',
        date: '',
    });
    const [budget, setBudget] = useState(0);
    const [loading, setLoading] = useState(false);

    const [selectedDate, setSelectedDate] = useState(() => {
        // Initialize selectedDate from localStorage if available
        const savedDate = localStorage.getItem('selectedDate');
        return savedDate ? new Date(savedDate) : null;
    });

    useEffect(() => {
        fetchData();
        fetchBudget();
    }, [selectedDate, userEmail]);

    useEffect(() => {
        fetchData();
        setSelectedDate(null); // Set selectedDate as null
        const userEmailFromLocalStorage = localStorage.getItem('userEmail');
        if (userEmailFromLocalStorage) {
            setUserEmail(userEmailFromLocalStorage);
        }
    }, [userEmail]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://s54-rajashree-capstone-expense-tracker.vercel.app/personal');
            const filteredData = response.data.filter(item => item.email === userEmail);
            const filteredByDate = selectedDate
                ? filteredData.filter(item => {
                    const selectedDateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
                    const itemDate = new Date(item.date);
                    const itemDateString = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, '0')}-${String(itemDate.getDate()).padStart(2, '0')}`;
                    return itemDateString === selectedDateString;
                })
                : filteredData;
            setExpenseData(filteredByDate);
            console.log('Data fetched for date:', selectedDate ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}` : 'All dates');
            setLoading(false);
        } catch (error) {
            console.error('Error fetching personal data:', error);
            toast.error('Failed to fetch personal data. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        // Save selectedDate to localStorage
        if (selectedDate) {
            localStorage.setItem('selectedDate', selectedDate.toISOString());
        } else {
            localStorage.removeItem('selectedDate');
        }
    }, [selectedDate]);

    const fetchBudget = async () => {
        try {
            const response = await axios.get(`https://s54-rajashree-capstone-expense-tracker.vercel.app/budget`);
            const currentMonthBudget = response.data.find(item => item.email === userEmail && item.month === getCurrentMonth());
            if (currentMonthBudget) {
                setBudget(currentMonthBudget.budget);
            } else {
                setBudget(0);
            }
        } catch (error) {
            console.error('Error fetching budget:', error);
            toast.error('Failed to fetch budget data. Please try again later.');
        }
    };

    const getCurrentMonth = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[new Date().getMonth()];
    };

    const handleSetBudget = async () => {
        try {
            if (budget < 0) {
                toast.error('Budget cannot be negative.');
                return;
            }
            // Fetch all budget data
            const allBudgetData = await axios.get(`https://s54-rajashree-capstone-expense-tracker.vercel.app/budget`);
    
            // Check if there is an entry for the current month
            const currentMonthEntry = allBudgetData.data.find(item => item.email === userEmail && item.month === getCurrentMonth());
    
            if (currentMonthEntry) {
                // If an entry exists for the current month, update the budget
                await axios.put(`https://s54-rajashree-capstone-expense-tracker.vercel.app/budget/put/${currentMonthEntry._id}`, { budget });
                toast.success('Budget updated successfully!');
            } else {
                // If no entry exists for the current month, create a new budget entry
                await axios.post(`https://s54-rajashree-capstone-expense-tracker.vercel.app/budget/post`, { email: userEmail, budget, month: getCurrentMonth() });
                toast.success('Budget posted successfully!');
            }
    
        } catch (error) {
            console.error('Error updating budget:', error);
            toast.error('Failed to update budget. Please try again later.');
        }
    };
    
    


    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataWithEmail = {
                ...formData,
                email: userEmail,
            };

            const response = await axios.post('https://s54-rajashree-capstone-expense-tracker.vercel.app/personal/post', formDataWithEmail);
            console.log('Expense added:', response.data);

            toast.success('Expense added successfully!', {
                onClose: () => {
                    setFormData({
                        category: '',
                        spent: '',
                        date: '',
                    });
                    window.location.reload(); 
                },
            });
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };


    // Group expenses by date
    const groupedExpenses = {};
    expenseData.forEach(expense => {
        const date = expense.date.split('T')[0]; // Extract date part from ISO string
        if (!groupedExpenses[date]) {
            groupedExpenses[date] = [];
        }
        groupedExpenses[date].push(expense);
    });

    // Sort the keys (dates) in descending order
    const sortedDates = Object.keys(groupedExpenses).sort((a, b) => new Date(b) - new Date(a));

    return (
        <div>
            <PersonalNavbar />
            <div>
                <div className='flex items-center justify-evenly bg-[#5E60CE] py-10'>
                    <div className="card flex flex-row rounded-box w-96 bg-white shadow-xl w-1/2">
                        <div className="flex flex-row items-center justify-center card-body">
                            <Savings style={{ fontSize: "50px", color: "#6930C3" }} />
                            <h2 className="text-2xl card-title ">BUDGET : <span className='text-[#6930C3] font-bold'> Rs {budget}</span></h2>
                        </div>
                    </div>
                    <div className='divider divider-horizontal divider-neutral'></div>
                    <div className='space-x-6'>
                        <input
                            className="bg-white py-4 w-64 px-4"
                            placeholder="Enter your budget"
                            type="number"
                            value={budget}
                            min="0"
                            onChange={e => setBudget(e.target.value)}
                        />
                        <button
                            className='btn bg-white text-[#6930C3]'
                            onClick={handleSetBudget}
                        >
                            Set Budget
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className='text-3xl font-semibold text-center py-10'>Expenses</h2>

                    <div className='flex justify-center space-x-20 items-center py-2 px-28'>
                        <div>
                            <h2 className='text-[#6930C3] font-bold text-2xl'>Filter by date   :</h2>
                        </div>
                        <div>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                popperPlacement="top"
                                dateFormat="yyyy-MM-dd"
                                className="bg-white border-2 border-[#6930C3] py-4 w-72 px-2"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center" style={{height:"50vh"}}>
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-center mx-auto'>
                            {selectedDate ? (
                                expenseData.length > 0 ? (
                                    sortedDates.map(date => (
                                        <details key={date} className="collapse bg-white" open={true}>
                                            <summary className="collapse-title  ml-16 text-2xl font-medium ">
                                                <ArrowRightIcon style={{ fontSize: "40px" }} />
                                                {date}
                                            </summary>
                                            <div className="flex flex-wrap items-center space-x-4 px-20 justify-flex-start collapse-content space-y-6 max-height-400">
                                                {Object.entries(groupedExpenses[date].reduce((acc, expense) => {
                                                    if (!acc[expense.category]) {
                                                        acc[expense.category] = {
                                                            category: expense.category,
                                                            totalSpent: 0
                                                        };
                                                    }
                                                    acc[expense.category].totalSpent += parseFloat(expense.spent || 0);
                                                    return acc;
                                                }, {})).map(([category, { totalSpent }]) => (
                                                    <div key={category} className="card bg-white-100 shadow-lg w-64 image-full mt-6 hover:bg-black">
                                                        {category === 'Food' && <figure><img src="https://clicklovegrow.com/wp-content/uploads/2020/03/Naomi-Sherman-Advanced-Graduate4.jpg" alt="Food" /></figure>}
                                                        {category === 'Groceries' && <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvxFbd7yJqcvVLdhu0Z3MUdwhJOl_erAmd5Y0gt7KoA&s" alt="Groceries" /></figure>}
                                                        {category === 'Transport' && <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfT97PUyOW2CEJ-OzozmTK14ZGeXjc9V4Ao7wdEx1dnw&s" alt="Transport" /></figure>}
                                                        {category === 'Health' && <figure><img src="https://img.freepik.com/premium-photo/heart-stethoscope-generate-ai_98402-13285.jpg" alt="Health" /></figure>}
                                                        {category === 'Others' && <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoFVUazypGswhWPcBAY65cbP8rg89oAqm1lg&s" alt="Others" /></figure>}
                                                        <div className="card-body flex justify-center items-center space-y-10">
                                                            {category === 'Food' && <RamenDiningIcon style={{ fontSize: "100px", color: "white" }} />}
                                                            {category === 'Groceries' && <LocalGroceryStoreIcon style={{ fontSize: "100px", color: "white" }} />}
                                                            {category === 'Transport' && <CommuteIcon style={{ fontSize: "100px", color: "white" }} />}
                                                            {category === 'Health' && <HealthAndSafetyIcon style={{ fontSize: "100px", color: "white" }} />}
                                                            {category === 'Others' && <MiscellaneousServicesIcon style={{ fontSize: "100px", color: "white" }} />}
                                                            <h2 className="text-xl card-title text-white">Total Money Spent: Rs {totalSpent.toFixed(2)} </h2>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </details>
                                    ))
                                ) : (
                                    <img src='https://cdn.dribbble.com/users/1138875/screenshots/4669703/404_animation.gif'></img>
                                )
                            ) : (
                                sortedDates.map(date => (
                                    <details key={date} className="collapse bg-white" open={true}>
                                        <summary className="collapse-title  ml-16 text-2xl font-medium ">
                                            <ArrowRightIcon style={{ fontSize: "40px" }} />
                                            {date}
                                        </summary>
                                        <div className="flex flex-wrap items-center space-x-4 px-16 justify-flex-start collapse-content space-y-6 max-height-400">
                                            {Object.entries(groupedExpenses[date].reduce((acc, expense) => {
                                                if (!acc[expense.category]) {
                                                    acc[expense.category] = {
                                                        category: expense.category,
                                                        totalSpent: 0
                                                    };
                                                }
                                                acc[expense.category].totalSpent += parseFloat(expense.spent || 0);
                                                return acc;
                                            }, {})).map(([category, { totalSpent }]) => (
                                                <div key={category} className="card ml-4 mr-4 bg-white-100 shadow-lg w-64 image-full mt-6 hover:bg-black">
                                                    {category === 'Food' && <figure><img src="https://clicklovegrow.com/wp-content/uploads/2020/03/Naomi-Sherman-Advanced-Graduate4.jpg" alt="Food" /></figure>}
                                                    {category === 'Groceries' && <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvxFbd7yJqcvVLdhu0Z3MUdwhJOl_erAmd5Y0gt7KoA&s" alt="Groceries" /></figure>}
                                                    {category === 'Transport' && <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfT97PUyOW2CEJ-OzozmTK14ZGeXjc9V4Ao7wdEx1dnw&s" alt="Transport" /></figure>}
                                                    {category === 'Health' && <figure><img src="https://img.freepik.com/premium-photo/heart-stethoscope-generate-ai_98402-13285.jpg" alt="Health" /></figure>}
                                                    {category === 'Others' && <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoFVUazypGswhWPcBAY65cbP8rg89oAqm1lg&s" alt="Others" /></figure>}
                                                    <div className="card-body flex justify-center items-center space-y-10">
                                                        {category === 'Food' && <RamenDiningIcon style={{ fontSize: "100px", color: "white" }} />}
                                                        {category === 'Groceries' && <LocalGroceryStoreIcon style={{ fontSize: "100px", color: "white" }} />}
                                                        {category === 'Transport' && <CommuteIcon style={{ fontSize: "100px", color: "white" }} />}
                                                        {category === 'Health' && <HealthAndSafetyIcon style={{ fontSize: "100px", color: "white" }} />}
                                                        {category === 'Others' && <MiscellaneousServicesIcon style={{ fontSize: "100px", color: "white" }} />}
                                                        <h2 className="text-xl card-title text-white">Total Money Spent: Rs {totalSpent.toFixed(2)} </h2>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
            {/* Modal button and form */}

            <button
                        className="btn border-none fixed bottom-4 rounded-full right-10 bg-[#5E60CE]"
                        onClick={() => {
                            document.getElementById('my_modal_3').showModal();
                        }}
                    >

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
                                <form action="" className='flex w-3/4 flex-col' onSubmit={handleSubmit}>
                                    <h2 className='font-bold text-center text-[#5e60ce] text-3xl py-10'>Add your Expense</h2>
                                    <label className="text-xl pb-2" htmlFor="">Select Category</label>
                                    <select
                                        className='bg-white border-[#5E60CE] border-2 rounded text-black px-2 py-2 mb-10'
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled selected>
                                            Select a category
                                        </option>
                                        <option value="Food">Food</option>
                                        <option value="Health">Health</option>
                                        <option value="Groceries">Groceries</option>
                                        <option value="Transport">Transport</option>
                                        <option value="Others">Others</option>
                                    </select>


                                    <label className="text-xl pb-2" htmlFor="">Enter Amount Spent (Rs)</label>
                                    <input type="number"
                                        name="spent"
                                        value={formData.spent}
                                        onChange={handleChange}
                                        className='bg-white border-[#5E60CE] border-2 rounded text-black px-2 py-2 mb-10' />

                                    <label className="text-xl pb-2" htmlFor="">Enter date (YYYY-MM-DD)</label>
                                    <input
                                        type="text"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className='bg-white border-[#5E60CE] border-2 rounded text-black px-2 py-2 mb-10' />

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
            <ToastContainer />
            <Footer />
        </div>
    );
};

export default PersonalExpense;
