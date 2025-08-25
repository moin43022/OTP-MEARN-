import React, { useEffect, useState } from 'react';
import './Tracker.css';
import { Link } from 'react-router-dom';

function Tracker() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });



  useEffect(() => {
     sessionStorage.setItem("bookVisited", "true");
    const time = localStorage.getItem('time') || '8:00 PM'; 
    const targetTime = `30 July 2025 ${time}`;

    const calculateTimeLeft = () => {
      const end = new Date(targetTime);
      const now = new Date();
      const diff = (end - now) / 1000;

      if (diff < 0) return;

      setTimeLeft({
        days: Math.floor(diff / 3600 / 24),
        hours: Math.floor(diff / 3600) % 24,
        minutes: Math.floor(diff / 60) % 60,
        seconds: Math.floor(diff) % 60,
      });
    };

    calculateTimeLeft(); 
    const timer = setInterval(calculateTimeLeft, 1000); 

    return () => clearInterval(timer); 


  }, []);

  const stored = localStorage.getItem('UserNames');
  const userNames = JSON.parse(stored);
  
  return (
    <div className="tracker-wrapper">
      <div className="tracker-left-div"></div>

      <div className="tracker-box">
        <nav className="main-nav">
          <ul>
            <li style={{ marginLeft: '30px', marginRight: '30px' }}>Logo</li>
           <Link to="/" style={{textDecoration:'none',  color: "inherit"}}> <li style={{ marginLeft: '730px' }}>Home</li> </Link> 
            <Link to='/Edetails'  className='a-tag' >  <li>View Event</li></Link>
           <Link to='/Tracker'  className='a-tag' > <li>Status Tracker</li> </Link> 

            <button>Admin Login</button>
          </ul>
        </nav>
        <h1 className="timer-heading">Event Remaining Time</h1>

        <div className="timer-box">
          <div className="timer-item">
            <p>Days</p>
            <input className="timer-input" value={timeLeft.days} readOnly />
          </div>
          <div className="timer-item">
            <p>Hrs</p>
            <input className="timer-input" value={timeLeft.hours} readOnly />
          </div>
          <div className="timer-item">
            <p>Min</p>
            <input className="timer-input" value={timeLeft.minutes} readOnly />
          </div>
          <div className="timer-item">
            <p>Sec</p>
            <input className="timer-input" value={timeLeft.seconds} readOnly />
          </div>
        </div>

        <div className="pass-section">
          <p className="pass-heading">Event Pass</p>

            {userNames.map((name, index) => ( <div className='pass' key={index}>Number of Ticket is {index+1} and Name of User is {name}</div>))}
        </div>

        <div className="Tracker-footer"></div>
      </div>
    </div>
  );
}

export default Tracker;
