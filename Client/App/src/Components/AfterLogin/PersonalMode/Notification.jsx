import React, { useEffect, useState, useRef } from 'react';
import PersonalNavbar from './PersonalNavbar';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; 
import '../../../App.css'; 

const Notification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationContainerRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowNotifications(true);
    }, 500); 

    return () => clearTimeout(timeout);
  }, []);

  const scrollDown = () => {
    if (notificationContainerRef.current) {
      const { scrollHeight, clientHeight } = notificationContainerRef.current;
      notificationContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  return (
    <div>
      <PersonalNavbar />
      <div className="flex justify-evenly bg-[#fbfbfb]" style={{ height: "82vh" }}>
        <div className='w-1/2'>
          <img src="https://cdn.dribbble.com/users/2553116/screenshots/13745770/media/1a3418a86cb6df1b9d6827b96be73ed6.gif" alt="" />
        </div>
        <div className='pt-12' style={{ position: 'relative' }}>
          <h2 className='text-2xl font-bold text-center pb-10'>Notifications</h2>
          <div className="notification-container pr-4 custom-scrollbar" ref={notificationContainerRef} style={{ maxHeight: '60vh', overflow: 'auto' }}>
            {showNotifications && (
              <div>
                <div className={`card-body card bg-white border border-blue-300 border-4 mb-8 ${showNotifications ? 'animate-notification' : ''}`} style={{ boxShadow: "3px 5px 7px 0 rgba(0,0,0,0.5)" }}>
                  <h2>U have spend 100% of ur monthly budget.U have spend 100% of ur monthly budget</h2>
                  <CloseIcon className="text-blue-500 rounded-full " style={{ position: 'absolute', top: 5, right: 10, cursor: 'pointer' }} />
                </div>
                <div className={`card-body card bg-white border border-blue-300 border-4 mb-8 ${showNotifications ? 'animate-notification' : ''}`} style={{ boxShadow: "3px 5px 7px 0 rgba(0,0,0,0.5)" }}>
                  <h2>U have spend 100% of ur monthly budget.U have spend 100% of ur monthly budget</h2>
                  <CloseIcon className="text-blue-500 rounded-full " style={{ position: 'absolute', top: 5, right: 10, cursor: 'pointer' }} />
                </div>
                <div className={`card-body card bg-white border border-blue-300 border-4 mb-8 ${showNotifications ? 'animate-notification' : ''}`} style={{ boxShadow: "3px 5px 7px 0 rgba(0,0,0,0.5)" }}>
                  <h2>U have spend 100% of ur monthly budget.U have spend 100% of ur monthly budget</h2>
                  <CloseIcon className="text-blue-500 rounded-full " style={{ position: 'absolute', top: 5, right: 10, cursor: 'pointer' }} />
                  
                </div>
                <div className={`card-body card bg-white border border-blue-300 border-4 mb-8 ${showNotifications ? 'animate-notification' : ''}`} style={{ boxShadow: "3px 5px 7px 0 rgba(0,0,0,0.5)" }}>
                  <h2>U have spend 100% of ur monthly budget.U have spend 100% of ur monthly budget</h2>
                  <CloseIcon className="text-blue-500 rounded-full " style={{ position: 'absolute', top: 5, right: 10, cursor: 'pointer' }} />
                </div>
                <div className={`card-body card bg-white border border-blue-300 border-4 mb-8 ${showNotifications ? 'animate-notification' : ''}`} style={{ boxShadow: "3px 5px 7px 0 rgba(0,0,0,0.5)" }}>
                  <h2>U have spend 100% of ur monthly budget.U have spend 100% of ur monthly budget</h2>
                  <CloseIcon className="text-blue-500 rounded-full " style={{ position: 'absolute', top: 5, right: 10, cursor: 'pointer' }} />
                </div>
              </div>
            )}
          </div>
          {showNotifications && (
            <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <ArrowDownwardIcon 
                onClick={scrollDown} 
                style={{
                  fontSize: '40px',
                  backgroundColor:"black",
                  padding:"5px",
                  color:"white",
                  borderRadius:"50%",
                  animation: 'blink 2s infinite' 
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notification;
