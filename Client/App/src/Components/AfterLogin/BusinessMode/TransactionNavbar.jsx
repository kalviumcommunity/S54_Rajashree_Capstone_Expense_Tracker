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

                    <Link to='/businessExpense'>
                    <IconButton color="inherit" aria-label="profile">
                        <ArrowBack style={{ fontSize: "35px" }} />
                    </IconButton>
                    </Link>
            </div>
        </div>
    );
};

export default TransactionNavbar;
