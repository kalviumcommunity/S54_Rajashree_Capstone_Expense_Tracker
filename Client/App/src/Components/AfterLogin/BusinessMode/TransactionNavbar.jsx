import React, { useContext, useEffect, useState } from 'react';
import { IconButton, Badge } from '@mui/material';
import { ArrowLeftOutlined, AccountCircleOutlined, ArrowBack } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context';


const TransactionNavbar = () => {

    const { username, setUsername } = useContext(AppContext);

    useEffect(() => {
        const userNameFromLocalStorage = localStorage.getItem('username');

        if (userNameFromLocalStorage) {
            setUsername(userNameFromLocalStorage);
        }

    }, []);

    return (
        <div style={{ width: "100%", borderRadius: "1vw", backgroundColor: "white", filter: "drop-shadow(0 0 0.5vw #00000050" }}>
            <div className="navbar bg-white-100 text-black" style={{ padding: "20px 70px" }} >
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>

                    </div>

                    <Link to='/businessExpense'>
                    <IconButton color="inherit" aria-label="profile">
                        <ArrowBack style={{ fontSize: "35px" }} />
                    </IconButton>
                    </Link>
            </div>

            <div className="navbar-end flex items-center space-x-4">
                {/* <IconButton color="inherit" aria-label="profile">
                        <AccountCircleOutlined style={{ fontSize: "35px" }} />
                    </IconButton> */}
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                {/* <h2 className='text-xl font-bold'>{username}</h2> */}
                </div>
            </div>
        </div>
        </div >
    );
};

export default TransactionNavbar;
