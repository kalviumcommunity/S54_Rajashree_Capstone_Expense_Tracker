import React, { useContext } from 'react';
import logo from '../../../assets/Cashtrackrr-logo.png';
import { IconButton, Badge } from '@mui/material';
import { LogoutRounded, Notifications } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context';

const PersonalNavbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext); 
  const { isSignedUp, setIsSignedUp } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsSignedUp(false);
    setIsLoggedIn(false);

    console.log("sign",isSignedUp)
    console.log("login",isLoggedIn)
    navigate("/");
  };

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
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white-100 text-black rounded-box w-52">
              <li><a>Dashboard</a></li>
              <li><a>Add Expense</a></li>
              <li><a>About Us</a></li>
              <li><a>Contact</a></li>
              <li><a>Notification</a></li>
            </ul>
          </div>
          <img src={logo} className='w-40' alt="logo" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <Link to="/personalDashboard">
              <li className='text-xl '><a>Dashboard</a></li>
            </Link>
            <Link to="/personalExpense">
              <li className='text-xl '><a>Add Expense</a></li>
            </Link>
            <li className='text-xl'><a>About</a></li>
            <li className='text-xl'><a>Contact</a></li>
          </ul>
        </div>
        <div className="navbar-end space-x-4">
          <label className="swap">
            <input type="checkbox" />
            <div className="swap-on btn bg-transparent border border-black text-black w-26">Personal</div>
            <div className="swap-off btn bg-transparent border border-black text-black w-26">Business</div>
          </label>
          <Link to="/notification">
            <IconButton color="inherit" aria-label="notifications">
              <Badge badgeContent={8} color="secondary">
                <Notifications style={{ fontSize: "35px" }} />
              </Badge>
            </IconButton>
          </Link>
          <IconButton color="inherit" aria-label="profile" onClick={handleLogout}>
            <LogoutRounded style={{ fontSize: "35px" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default PersonalNavbar;
