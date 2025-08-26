import { Link } from 'react-router-dom';
import './Admin.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { motion } from "framer-motion";

export default function Admin() {
  const [tickets, setTickets] = useState([]);
  const [Atickets, setAtickets] = useState(100);
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState(30);
  const userInfoRef = useRef(); // ✅ Declare the ref

 useEffect(() => {
  const fetchData = async () => {
    try {
      // 1️⃣ Fetch latest event
      let Availabel = localStorage.getItem("availabel");
      console.log(Availabel);
   if(Availabel === "true"){
    
      const eventResponse = await axios.get("http://localhost:5000/api/events/latest");
      const Newevent = eventResponse.data;
      console.log("✔ Latest Event:", Newevent);
      // Set state from event data
      const daay = Newevent.date.slice(-2);
      setDay(daay);
      setAtickets(Newevent.capacity);
    }

      // 2️⃣ Fetch all tickets
      const ticketsResponse = await axios.get("http://localhost:5000/api/tickets");
      console.log("✔ Tickets Fetched:", ticketsResponse.data);
      setTickets(ticketsResponse.data);

    } catch (err) {
      console.error("❌ Error fetching data:", err);
    } finally {
      setLoading(false); // stop loader
    }
  };

  fetchData();
}, []);


 const downloadPDF = () => {
  if (window.innerWidth > 480) {
    
    const input = userInfoRef.current;
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("Ticket_Info.pdf");
    });
  } else {
    // ---- Mobile: text-only PDF from backend data ----
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.setFontSize(16);
    pdf.text("Ticket Information", 20, 20);

    let y = 40; // starting Y position
    pdf.setFontSize(12);

    tickets.forEach((ticket, index) => {
      if (y > 270) { // ✅ auto page break
        pdf.addPage();
        y = 20;
      }

      pdf.text(`Name: ${ticket.name}`, 20, y);
      pdf.text(`Phone: ${ticket.phone}`, 20, y + 10);
      pdf.text(`Location: ${ticket.location}`, 20, y + 20);
      pdf.text(`Date: ${ticket.date}`, 20, y + 30);
      pdf.text(`Price: ${ticket.price}`, 20, y + 40);

      y += 60; // gap for next ticket
    });

    pdf.save("Ticket_Info.pdf");
  }
};


 const [click, setClick] = useState(false);

  return (
    <div className='content'>
      
  <div className={`admin ${click ? "show" : ""}`}>
        <div className='admin-div'

        >
        <p className='home-2'>
            <i class="fa-solid fa-house"></i>
            <Link  to="/" className='a-tag'> <button className='admin-btn'>Home</button></Link>
            
          </p>
          <p className='view-event-1'>
            <i class="fa-solid fa-eye"></i>
             <Link  to='/Edetails' className='a-tag'>  <button className='admin-btn'>View Event</button></Link>
           
          </p>
          <p className='admin-2'>
            <i className="fa-solid fa-circle-user"></i>
            <button className='admin-btn'>Admin</button>
          </p>
          <p className='dashboard-1'>
            <i className="fa-solid fa-file"></i>
            <button className='admin-btn'>Dashboard</button>
          </p>
          <p className='log-out'>
            <Link to='/' style={{ textDecoration: 'none', color: "inherit" }}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <button className='admin-btn'>Log Out</button>
            </Link>
          </p>
          <p className='add-event'>
            <Link to="/Form" style={{ textDecoration: 'none', color: "inherit" }}>
              <i className="fa-solid fa-circle-plus"></i>
              <button className='admin-btn'>Add Event</button>
            </Link>
          </p>
        </div>
      </div>


      <div className='image'>
          <nav className='main-nav navbar'>
                           <p className='navbar-logo'>Logo</p>
                       <ul>
                           <Link  to="/" className='a-tag'> <li className='navbar-home navbar-manu'>Home</li></Link>
                          <Link  to='/Edetails'  className='a-tag' >  <li className='navbar-manu'> View Event</li></Link>
         
                             <Link to="/Login" className='a-tag'><button className='Admin-btn'>Admin Login</button></Link>
                           
                       </ul>
                   </nav>

         <div className='dashboard-section'
         
         >
        <motion.h2 className='dashboard-title'
         initial={{ opacity: 0, y: -100 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
        >Dashboard</motion.h2>
        <div>
        <li className="menu-toggle" onClick={() => setClick(!click)}>
              <i className="fa-solid fa-bars"></i>
            </li>
        </div>

        </div>
        <div className='dashboard'>
          <motion.div className='dashboard-div'
          initial={{ opacity: 0, y: -100 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
          >
            <div className='dashboard-icon'><i className="fa-regular fa-calendar"></i></div>
            <div className='dashboard-info'>
              <h3>{day}</h3>
              <h5>Event Date</h5>
            </div>
          </motion.div>

          <motion.div className='dashboard-div'
          initial={{ opacity: 0, y: -100 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
          >
            <div className='dashboard-icon' style={{ background: 'palevioletred' }}>
              <i className="fa-solid fa-ticket"></i>
            </div>
            <div className='dashboard-info'>
              <h3>{tickets.length}</h3>
              <h5>Tickets Sold</h5>
            </div>
          </motion.div>

          <motion.div className='dashboard-div'
          initial={{ opacity: 0, y: -100 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
          >
            <div className='dashboard-icon' style={{ background: 'rgb(61, 111, 220)' }}>
              <i className="fa-solid fa-ticket"></i>
            </div>
            <div className='dashboard-info'>
              <h3>{Atickets - tickets.length}</h3>
              <h5>Ticket Remaining</h5>
            </div>
          </motion.div>

          <motion.div className='dashboard-div'
          initial={{ opacity: 0, y: -100 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
          >
            <div className='dashboard-icon' style={{ background: 'rgb(82, 193, 82)' }}>
              <span> ₹</span>
            </div>
            <div className='dashboard-info'>
              <h3>
                {tickets.reduce((sum, ticket) => sum + (parseInt(ticket.price) || 0), 0)}.00
              </h3>
              <h5>Total Revenue</h5>
            </div>
          </motion.div>
        </div>

       {/* ✅ Only wrap this content */}
<div ref={userInfoRef}>
  <h2 className='user-info-title'>Users Information</h2>
  <div className='user'>
    <div className='user-heading'>
      <p>Event Name</p>
      <p>User Name</p>
      <p>Phone Number</p>
      <p>Token Number</p>
      <p>Booking Date</p>
      <p>Booking Time</p>
    </div>

    {loading ? (
      <p>Loading...</p>
    ) : tickets.length === 0 ? (
      <p>No tickets found.</p>
    ) : (
      tickets.map((ticket, index) => {
        const date = new Date(ticket.bookedAt).toISOString().split("T")[0];
        const time = new Date(ticket.bookedAt).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        return (
          <div className='user-info' key={index}>
            <p>Garba Event</p>
            <p>{ticket.name || 'Unknown'}</p>
            <p>{ticket.phone}</p>
            <p>{ticket.tokenNumber}</p>
            <p>{date}</p>
            <p>{time}</p>
          </div>
        );
      })
    )}
  </div>
</div>

{tickets.length > 0 && (
  <div className='pdt-btn-div'>
    <button className="pdf-btn" onClick={downloadPDF}>
      Download PDF
    </button>
  </div>
)}
      </div>
    </div>
  );
}
