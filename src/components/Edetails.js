import React from 'react'
import './E-details.css';
import { useEffect, useState } from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import image from './Event.jpg'
import singer from './Singer.jpeg'
import axios from 'axios';




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
                  <li className="navbar-home">Home</li>
                </Link>
                <Link to="/Edwtails" className="a-tag">
                  <li>View Event</li>
                </Link>
                <li onClick={handletrecker}>Status Tracker</li>
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
        <div className='event-details-div'>
          <h1 className='event-heading'>
            Garba Mega Event
          </h1>
          <div className='event-image'>
              <img src={image} className="E-img" alt='error'   />
          </div>
          <div className='details'>
            <div className='about-box'>
               <p className='event-about' style={{fontSize:'1.1rem'}}>
               About the Event : Garba Night 2025 
            </p>
            <p className='event-info'>
            Get ready for a magical night filled with rhythm, tradition, and joy! Garba Night 2025 is not 
just an event—it's a celebration of culture, community, and devotion Join us as we dance to 
the beats of traditional folk music and modern remixes, celebrating the divine energy of
Goddess Durga through the vibrant art of Garba and Dandiya Raas.</p></div>
<div className='artist'>
    <p>Artist</p>
     <img src={singer}  className="A-img" alt='error' style={{height: '133px', width:'222px'}} />
     <pre >Singer</pre>
    
     <label className='event-artist'>Falguni Pathak</label>
   
</div>
          </div>
         
        </div>

         <div className='p-time'>
             <div className='time-event'>
          <div className='time-icon'>
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
          </div>
          <div className='payment'>
            <p className='ticket-price'><i class="fa-solid fa-indian-rupee-sign "></i> 499 Onwards</p>

            <button onClick={BokkNow}>Book Now</button>
           
          </div>

        </div>


         </div>
        
      </div>

                   <div className='footer'>
              <div className='footer-data'>
                <div className='footer-heading'>
                  <h3 style={{marginLeft:'5px'}} className='footer-logo-heading'>Logo</h3>
                  <h3 className='footer-about-heading'>About</h3>
                  <h3 style={{marginLeft:'190px',marginBottom:'10px'}} className='footer-contact-heading'>Contact</h3>
                  <h3 style={{marginLeft:'110px'}} className='footer-terms-heading'>Terms</h3>
                </div>


                <div className='footer-about'>
                  <div className='whole-about'>
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
                 </div>



                  <div className='footer-contact'>
                    <div className='contact-data'>
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
                  </div>



                  <div className='footer-terms'>
                    <div className='terms-data'>
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
                  </div>

                </div>
                
              </div>

              <div className='footer-bottom'>
                <div>
                 <p>@ 2025 Site name. All Rights Reserved</p>
                </div>
                <div className='social-media'>
                  <h3>Follow Us</h3>
                  <i  className="fa-brands fa-instagram"></i>
                  <i className="fa-brands fa-facebook"></i>
                  <i className="fa-brands fa-x-twitter"></i>
                  <i className="fa-brands fa-linkedin-in"></i>
                </div>
              </div>

            </div>

  </div>
  )
}
