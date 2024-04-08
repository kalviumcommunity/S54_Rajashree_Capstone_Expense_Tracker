import React from 'react'
import logo from '../../assets/Cashtrackrr-logo.png'
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <div className='items-center text-black'>
      <footer className="flex flex-col md:flex-row items-center  justify-evenly footer p-10 border-t" style={{ boxShadow: "0 0 5px 0 #E0E0E0" }}>
        <aside className='flex flex-col items-center mb-6 md:mb-0'>
          <img src={logo} className='w-52' alt="Logo"></img>
          <p className='w-44 text-center'>Take control of your finances with CashTrackrr, the all-in-one solution for effortless financial management.</p>
        </aside>
        <div className='flex md:space-x-24'>
          <nav >
            <h4 className="footer-title">Quick Link- Personal</h4>
            <div className='flex flex-col space-y-2 mt-4'>
              <a className="link link-hover block mb-2 md:inline-block md:mb-0 md:mr-4">Dashboard</a>
              <a className="link link-hover block md:inline-block">Add Expense</a>
            </div>
          </nav>
          <div className='divider divider-horizontal divider-neutral md:hidden'></div>
          <nav className="flex flex-col">
            <h4 className="footer-title">Quick Link- Business</h4>
            <div className='flex flex-col space-y-2 mt-4'>
              <a className="link link-hover block mb-2 md:inline-block md:mb-0 md:mr-4">Dashboard</a>
              <a className="link link-hover block md:inline-block">Add Expense</a>
              <a className="link link-hover block md:inline-block">Loan EMI Calculator</a>
            </div>
          </nav>
        </div>
        <form className='items-center' action="mailto:rajashreeguha@outlook.com" method="post" enctype="text/plain">
          <h4 className="footer-title">Drop a complaint</h4>
          <fieldset className="form-control w-full md:w-auto">
            <label className="label text-black">
              <span className="label-text text-black">Enter complaint reason</span>
            </label>
            <div className="join">
              <input type="text" name="Reason for complaint" placeholder="Enter complaint reason" className="input input-bordered join-item bg-white" required />
            </div>

            <label className="label text-black">
              <span className="label-text text-black">Please provide any details</span>
            </label>
            <div className="join">
              <input type="text" name="Details" placeholder="Enter details" className="input input-bordered join-item bg-white" required />
            </div>

            <div className="join">
              <button type="submit" className="btn join-item mt-4 bg-transparent" style={{ border: "2px solid #FF7545", color: "#FF7545" }}>Register Complaint</button>
            </div>
          </fieldset>
        </form>
      </footer>
      <footer className="footer  flex justify-between md:px-24 px-4 py-4 border">
        <div>
          <h5 className='font-bold'>Made by Rajashree</h5>
        </div>
        <div className="grid grid-flow-col gap-4">
            <a href="#"><InstagramIcon className="w-6 h-6 fill-current" /></a>
            <a href="#"><LinkedInIcon className="w-6 h-6 fill-current" /></a>
            <a href="#"><GitHubIcon className="w-6 h-6 fill-current" /></a>
        </div>
      </footer>
    </div>
  )
}

export default Footer
