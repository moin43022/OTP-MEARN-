import React from 'react'
import './E-details.css';
import { useEffect, useState } from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import image from './Event.jpg'
import singer from './Singer.jpeg'
import axios from 'axios';
import { motion } from "framer-motion";



export default function Edetails() {
  window.scrollTo(0, 0);
  const [location, setLocation] = useState('Jyoti nagar, khargone');
  const navigate = useNavigate();
   function BokkNow(){
    const visited = sessionStorage.getItem("bookVisited");
    if(visited === "true"){
      navigate('/Ticket')
    }else{
      navigate('/Otp1')
      localStorage.setItem('location',location);
    }
  }
   const getDirections = () => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const destination = encodeURIComponent(location);
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${destination}&travelmode=driving`;
          window.open(directionsUrl, '_blank');
        },
        (error) => {
          alert("Error getting location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  function handletrecker(){
    const visited = sessionStorage.getItem("bookVisited");
    if(visited === "true"){
      navigate('/Ticket')
    }else{
      alert('Please Book Ticket First')
    }
  }
const [click, setClick] = useState(false);

useEffect(() => {
   let Availabel = localStorage.getItem("availabel");
   if(Availabel === "true"){
  const fetchEvent = async () => {
    try {
     const response = await axios.get(`http://192.168.29.155:5000/api/events/latest?t=${Date.now()}`);

      const Newevent = response.data; // Axios auto-parses JSON
      console.log(Newevent);

      let img = document.querySelector(".E-img");
      let aimg = document.querySelector(".A-img");
      let heading = document.querySelector(".event-heading");
      let about = document.querySelector(".event-about");
      let artist = document.querySelector(".event-artist");
      let info = document.querySelector(".event-info");
      let date = document.querySelector(".event-date");
      let time = document.querySelector(".event-time");
      let name = document.querySelector(".event-name");
      let ticketp = document.querySelector(".ticket-price");
      setLocation(Newevent.location);

      console.log(about);

      if (img) img.src = Newevent.image1;
      if (aimg) aimg.src = Newevent.image2;
      if (artist) artist.innerHTML = Newevent.artist;
      if (heading) heading.innerHTML = Newevent.name;
      if (info) info.innerHTML = Newevent.info;
      if (about) about.innerHTML = `About the Event : ${Newevent.name}`;
      if (date) date.innerHTML = `<i class="fa-regular fa-calendar"></i> ${Newevent.date}`;
      if (time) time.innerHTML = `<i class="fa-regular fa-clock"></i> ${Newevent.time} & ${Newevent.time2}`;
      if (name) name.innerHTML = `<i class="fa-regular fa-chart-bar"></i> ${Newevent.name}`;
      if (ticketp) ticketp.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i> ${Newevent.ticket} Onwards`;

    } catch (err) {
      console.error("❌ Error fetching latest event:", err);
    }
  };

  fetchEvent();
}
}, []);

  return (
    
    <div className='E-div'>
               <>
            {/* Sidebar Navbar */}
            <nav className={`main-nav ${click ? "active" : ""}`}>
              <p className="navbar-logo">Logo</p>
              <ul>
                <Link to="/" className="a-tag">
                  <li className="navbar-home navbar-manu">Home</li>
                </Link>
                <Link to="/Edetails" className="a-tag">
                  <li className='navbar-manu'>View Event</li>
                </Link>
                <li onClick={handletrecker} className='navbar-manu'>Status Tracker</li>
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
        <div className='event-container'>
        <div className='event-details-div'
        >
          
          <motion.h1 className='event-heading'
           initial={{ opacity: 0, y: -100 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
          >
            Garba Mega Event
          </motion.h1>
          <motion.div className='event-image'
           initial={{ opacity: 0, x: -100 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
          >
              <img src={image} className="E-img" alt='error'   />
          </motion.div>
          <div className='details'
          >
            <motion.div className='about-box'
             initial={{ opacity: 0, x: -100 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
            >
               <p className='event-about' style={{fontSize:'1.1rem'}}>
               About the Event : Garba Night 2025 
            </p>
            <p className='event-info'>
            Get ready for a magical night filled with rhythm, tradition, and joy! Garba Night 2025 is not 
just an event—it's a celebration of culture, community, and devotion Join us as we dance to 
the beats of traditional folk music and modern remixes, celebrating the divine energy of
Goddess Durga through the vibrant art of Garba and Dandiya Raas.</p></motion.div>
<div className='artist'
>
    <motion.p
      initial={{ opacity: 0, y: -100 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
    >Artist</motion.p>
    <motion.div 
      initial={{ opacity: 0, x: -100 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
    >

     <img src={singer}  className="A-img" alt='error' style={{height: '133px', width:'222px'}} />

    </motion.div>
     <motion.pre 
       initial={{ opacity: 0, y: 100 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
     >Singer</motion.pre>
    
     <motion.label className='event-artist'
     initial={{ opacity: 0, y: 100 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
     >Falguni Pathak</motion.label>
   
</div>
          </div>
         
        </div>

         <div className='p-time'>
             <div className='time-event'>
          <motion.div className='time-icon' 
          initial={{ opacity: 0, x: 100 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
          >
            <div className='icon-1'>
            <p className='event-date'> <i class="fa-regular fa-calendar"></i> 2025-08-30</p>
            </div>
            <div className='icon-2'>
            <p className='event-time'><i class="fa-regular fa-clock"></i> 8:00 PM </p>
            </div>
             <div className='icon-3'>
            <p><i class="fa-regular fa-hourglass-half"></i> 4 hours </p>
            </div>
             
            <div className='icon-4'>
            <p  className='event-name'><i class="fa-regular fa-chart-bar"></i> Festival Event</p>
            </div>
             <div className='icon-5'>
            <p  ><i class="fa-solid fa-location-dot"></i> { location ?? "Jyoti nagar, khargone "} <i class="fa-solid fa-plane-departure"   onClick={getDirections} style={{cursor: 'pointer', color: ' #472B84', marginLeft :'20px', fontSize:'25px'}} ></i></p>
            </div>
          </motion.div>
          <div className='payment'>
            <motion.p className='ticket-price'
            initial={{ opacity: 0, x: 100 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
            ><i class="fa-solid fa-indian-rupee-sign "></i> 499 Onwards</motion.p>

            <motion.button onClick={BokkNow}
            initial={{ opacity: 0, y: -100 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
            >Book Now</motion.button>
           
          </div>

        </div>


         </div>
        
      </div>

                   <div className='footer'>
              <div className='footer-data'>
                <motion.div className='footer-heading'
                initial={{ opacity: 0, x: -100 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
                >
                  <h3 style={{marginLeft:'5px'}} className='footer-logo-heading'>Logo</h3>
                  <h3 className='footer-about-heading'>About</h3>
                  <h3 style={{marginLeft:'190px',marginBottom:'10px'}} className='footer-contact-heading'>Contact</h3>
                  <h3 style={{marginLeft:'110px'}} className='footer-terms-heading'>Terms</h3>
                </motion.div>


                <div className='footer-about'>
                  <motion.div className='whole-about'
                   initial={{ opacity: 0, y: 100 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
                  >
                    <div className='about-data'>
                      <span>•</span>
                      <p className='about-first-detail'>Name Is Smart Queue Management System.</p>
                    </div>

                    <div className='about-data'>
                      <span>•</span>
                      <p>Designed for hospital, banks, and offices.</p>
                    </div>

                    <div className='about-data'>
                      <span>•</span>
                      <p>Helps reduce waiting time with slot booking and digital token.</p>
                    </div>

                    <div className='about-data'>
                      <span>•</span>
                      <p>Aims to improve user  experience and service speed.</p>
                    </div>
                 </motion.div>



                  <motion.div className='footer-contact'
                  
                                       initial={{ opacity: 0, y: 100 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}>
                    <div className='contact-data'

                    >
                      <i className="fa-solid fa-location-dot"></i>
                      <p>Address: 1st floor, baheti tower, Khargone MP.</p>
                    </div>

                    <div className='contact-data'>
                      <i className="fa-solid fa-phone-volume"></i>
                      <p>+91 9893829938839</p>
                    </div>

                    <div className='contact-data'>
                      <i className="fa-solid fa-envelope"></i>
                      <p>Email: support@ourname@gmail.com</p>
                    </div>
                  </motion.div>



                  <motion.div className='footer-terms'
                   initial={{ opacity: 0, y: 100 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
                  >
                    <div className='terms-data'
                    
                    >
                      <span>•</span>
                      <p>User must book a slot in advance.</p>
                    </div>

                    <div className='terms-data'>
                      <span>•</span>
                      <p>Tokens are valid only for selected time slot. </p>
                    </div>

                    <div className='terms-data'>
                      <span>•</span>
                      <p>Arrived 10 minutes before your sheduled time.</p>
                    </div>

                    <div className='terms-data'>
                      <span>•</span>
                      <p>Users data securely stored and not shared</p>
                    </div>
                  </motion.div>

                </div>
                
              </div>

              <div className='footer-bottom'>
                <motion.div
                initial={{ opacity: 0, x: -100 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
                >
                 <p>@ 2025 Site name. All Rights Reserved</p>
                </motion.div>
                <motion.div className='social-media'
                initial={{ opacity: 0, x: 100 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      viewport={{ once: true, amount: 0.2 }}
                >
                  <h3>Follow Us</h3>
                  <i  className="fa-brands fa-instagram"></i>
                  <i className="fa-brands fa-facebook"></i>
                  <i className="fa-brands fa-x-twitter"></i>
                  <i className="fa-brands fa-linkedin-in"></i>
                </motion.div>
              </div>

            </div>

  </div>
  )
}
