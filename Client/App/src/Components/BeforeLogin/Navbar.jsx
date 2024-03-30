import React from 'react';
import logo from '../../assets/Cashtrackrr-logo.png'
const Navbar = () => {
  return (
<div className="navbar bg-white-100 text-black" style={{padding:"20px 70px"}}>
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white-100 text-black rounded-box w-52">
        <li><a>Home</a></li>
        <li><a>About Us</a></li>
        <li><a>Contact</a></li>
      </ul>
    </div>
    <img src={logo} className='w-40'></img>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li className='text-xl '><a href='/'>Home</a></li>
      <li className='text-xl'><a href='/'>About Us</a></li>
      <li className='text-xl'><a >Contact</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a href='/login' className="btn bg-transparent border border-black w-26" style={{borderWidth:"3px", color:"black",  fontFamily: "'Itim', sans-serif"}}>L O G I N</a>
  </div>
</div>
  );
};

export default Navbar;
