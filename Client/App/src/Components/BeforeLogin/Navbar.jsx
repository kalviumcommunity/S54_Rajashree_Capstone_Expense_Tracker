import React, { useState } from 'react';
import logo from '../../assets/Cashtrackrr-logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ width: "100vw", borderRadius: "0 0 1vw 1vw", backgroundColor: "white", filter: "drop-shadow(0 0 0.5vw #00000050)", position: "fixed", zIndex: "3", top: 0 }}>
      <div className="navbar bg-white-100 text-black px-10 py-6" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="navbar-start">
        <img src={logo} className='w-32 lg:w-40' alt="Logo" style={{ display:"flex" , maxWidth: "100%", height: "auto" }}></img>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">
            <li className='text-xl '><a href='/'>Home</a></li>
            <li className='text-xl '><a href='/'>About Us</a></li>
            <li className='text-xl '><a >Contact</a></li>
          </ul>
        </div>
        <div className="navbar-end hidden lg:flex space-x-6">
          <Link to="/login">
            <button className="btn bg-transparent border border-black w-26" style={{ borderWidth: "3px", color: "black", fontFamily: "'Itim', sans-serif" }}>L O G I N</button>
          </Link>
          <Link to="/signup">
            <button className="btn bg-black border-none w-26" style={{ borderWidth: "3px", color: "white", fontFamily: "'Itim', sans-serif" }}>S I G N U P</button>
          </Link>
        </div>

        <div className='pr-6'>
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            {menuOpen && (
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white-100 text-black bg-white rounded-box w-28">
                <li><a href="/">Home</a></li>
                <li><a href="/">About Us</a></li>
                <li><a href="/">Contact</a></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
