
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';
import './Ticket.css';

export default function Token() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const ticketRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

 useEffect(() => {
  const phone = localStorage.getItem('userPhone');
  if (!phone) return;

try{

 axios.get(`http://localhost:5000/api/tickets/by-phone?phone=${phone}`)
    .then((res) => {
      setTickets(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching tickets:", err);
      setLoading(false);
    });
    } 
    catch(err)
    {
      console.log(err);
    }
}, []);

const [click, setClick] = useState(false);


  useEffect(() => {
    sessionStorage.setItem("bookVisited", "true");
    const time = localStorage.getItem('time') || '8:00 PM';
    const date = localStorage.getItem('date') || '25 August 2025';
    const targetTime = `${date} ${time}`;
    
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

  const handleDownloadPDF = (refIndex) => {
  const element = ticketRefs.current[refIndex];
  if (!element) return;

  html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const padding = 10; 
    const maxWidth = pageWidth - 2 * padding;
    const imgWidth = maxWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const x = padding;
    const y = (pageHeight - imgHeight) / 2;
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
    pdf.save(`Ticket_${refIndex + 1}.pdf`);
  });
};


  return (
    <div className="tracker-wrapper">
      <div className="tracker-left-div"></div>
      <div className='tracker-div'>
        <div className="tracker-box">
        <>
                   {/* Sidebar Navbar */}
                   <nav className={`main-nav ${click ? "active" : ""}`}>
                     <p className="navbar-logo">Logo</p>
                     <ul>
                       <Link to="/" className="a-tag">
                         <li className="navbar-home navbar-manu">Home</li>
                       </Link>
                       <Link to="/Edwtails" className="a-tag">
                         <li className='navbar-manu'>View Event</li>
                       </Link>
                       <li className='navbar-manu'>Status Tracker</li>
                       <Link to="/Login" className="a-tag">
                         <button className="Admin-btn">Admin Login</button>
                       </Link>
                     </ul>
             
                     {/* Close button */}
                     <span className="close-btn" onClick={() => setClick(false)}>
                       <i className="fa-solid fa-xmark"></i>
                     </span>
                   </nav>
             
                   {/* Logo + Toggle button */}
                  <div className='logo-section'>
                     <h2 className="logo-title">Logo</h2>
                     <li className="logo-toggle" onClick={() => setClick(true)}>
                       <i className="fa-solid fa-bars"></i>
                     </li>
                      </div>
                 
                 </>

          <h1 className="timer-heading">Event Remaining Time</h1>
          <div className="timer-box">
            <div className="timer-item"><p>Days</p><input className="timer-input" value={timeLeft.days} readOnly /></div>
            <div className="timer-item"><p>Hrs</p><input className="timer-input" value={timeLeft.hours} readOnly /></div>
            <div className="timer-item"><p>Min</p><input className="timer-input" value={timeLeft.minutes} readOnly /></div>
            <div className="timer-item"><p>Sec</p><input className="timer-input" value={timeLeft.seconds} readOnly /></div>
          </div>
        </div>

        <div className="token-container">
          <h1 className="token-title">🎟 All Booked Tickets</h1>

{loading ? (
  <p>Loading...</p>
) : tickets.length === 0 ? (
  <p>No tickets found</p>
) : (
tickets.map((ticket, index) => (
  <React.Fragment key={ticket._id || index}>
    <div
      className="ticket-card"
      ref={(el) => (ticketRefs.current[index] = el)}
    >
      <div className="ticket-left">
        <p><strong>Name:</strong> {ticket.name}</p>
        <p><strong>Phone:</strong> {ticket.phone}</p>
        <p><strong>Date:</strong> {ticket.date}</p>
        <p><strong>Time:</strong> {ticket.time}</p>
        <p><strong>Location:</strong> {ticket.location}</p>
      </div>

      <div className="ticket-right">
        <p><strong>Date:</strong> {ticket.date}</p>
        <p><strong>Price:</strong> ₹{ticket.price}</p>
        <p className='ticket-rigth-token'><strong>{ticket.tokenNumber}</strong> </p>
      </div>
    </div>
      <button className='download-btn' onClick={() => handleDownloadPDF(index)}>Download PDF</button>
   
  </React.Fragment>
))

)}


        </div>

        <div className="Tracker-footer"></div>
      </div>
    </div>
  );
}

