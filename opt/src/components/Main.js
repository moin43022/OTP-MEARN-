import React from 'react'
import axios from 'axios';
import "./Main.css"
import {useState, useEffect} from 'react';
import Slider from './Event.jpg'
import Manage from './Manage.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Link, useNavigate} from 'react-router-dom';
const Main = () => {
const navigate = useNavigate();
const [cap , setCap] = useState(true);
const [capacity, setcapacity] = useState(100);
const [bookVisited, setBookVisited] = useState(false);
const [date, setDate] = useState("2025-08-22");

  useEffect(() => {
  const visited = sessionStorage.getItem("bookVisited");
  setBookVisited(visited === "true");
}, []);

useEffect(() => {
  const handler = () => {
    sessionStorage.setItem("bookVisited", "false");
  };
  window.addEventListener('beforeunload', handler);
  return () => window.removeEventListener('beforeunload', handler);
}, []);


  // ✅ Load capacity from localStorage




//localStorage.removeItem("eventData");
// localStorage.clear();




useEffect(() => {
  if (!capacity) return; 
  axios.get(`http://192.168.29.155:5000/api/Tickets/check-capacity?capacity=${capacity}`)
    .then((res) => {
      if (res.data.capacityFull) {
        setCap(false);
      } else {
        console.log(`Seats booked: ${res.data.currentCount}`);
        console.log(`Capacity Full: ${res.data.capacityFull}`);
        console.log(`Capacity: ${res.data.capacity}`);
      }
    })
    .catch((err) => console.error(err));
}, [capacity]); 


  function handletrecker(){
    const visited = sessionStorage.getItem("bookVisited");
    if(visited === "true"){
      navigate('/Ticket')
    }else{
      alert('Please Book Ticket First')
    }
  }



useEffect(() => {
  
  const fetchLatestEvent = async () => {
    try {
      const response = await axios.get("http://192.168.29.155:5000/api/events/latest");

      localStorage.setItem("availabel",true);
      const Newevent = response.data; 
      console.log("Latest Event:", Newevent);

      if (Newevent.deadline) setDate(Newevent.deadline);

      const img = document.querySelectorAll(".d-block");
      img.forEach((e) => {
        if (Newevent.image1) e.src = Newevent.image1;
      });
    } catch (err) {
      localStorage.setItem("availabel",false);
      console.error("Error fetching latest event:", err);
    
  
  };

}
fetchLatestEvent();
}, []);


  
  function handleview(){
    if(cap){
    navigate('/Edetails');
    }
    else{
    alert("All Tickets Are Booked")
    }
  }
const [click, setClick] = useState(false);
  return (
   <div className='main-container'>
    
    
           <>
      {/* Sidebar Navbar */}
      <nav className={`main-nav ${click ? "active" : ""}`}>
        <p className="navbar-logo">Logo</p>
        <ul>
          <Link to="/" className="a-tag">
            <li className="navbar-home">Home</li>
          </Link>
          <li onClick={handleview}>
            <p>View Event</p>
          </li>
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

            <div id="carouselExampleDark" className="carousel carousel-dark slide" style={{height:'400px'}}>
                <div className="carousel-indicators">
                   <button
                      type="button"
                      data-bs-target="#carouselExampleDark"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                      style={{
                      backgroundColor: 'whitesmoke',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      }}
                    ></button>

                    <button
                      type="button"
                      data-bs-target="#carouselExampleDark"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                      style={{
                      backgroundColor: 'whitesmoke',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      }}
                    ></button>

                    <button
                      type="button"
                      data-bs-target="#carouselExampleDark"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                      style={{
                      backgroundColor: 'whitesmoke',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      }}
                    ></button>
                </div>


                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                      <img id='sliderimg' src={Slider} style={{ height: '400px' }} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                      <img id='sliderimg' src={Slider} style={{ height: '400px' }} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img id='sliderimg' src={Slider} style={{ height: '400px' }} className="d-block w-100" alt="..." />
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev" style={{justifyContent:'start',marginLeft:'20px'}}>
                   <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                    style={{
                    filter: 'invert(1) brightness(2)'
                    }}
                   ></span>
                   <span className="visually-hidden">Previous</span>
                </button>

                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next" style={{justifyContent:'end',marginRight:'20px'}}>
                   <span
                   className="carousel-control-next-icon"
                   aria-hidden="true"
                   style={{
                   filter: 'invert(1) brightness(2)'
                   }}
                   ></span>
                   <span className="visually-hidden">Next</span>
                </button>
            </div>


            <div className='slider-advantage'>
                <div className='advantage'>
                    <i className="fa-regular fa-clock"></i>
                    <div className='advantage-details'>
                      <h5 style={{marginRight:'13px', fontWeight:'600'}} className='reduce-time'>Reduce Waiting Time</h5>
                      <h6>Helps to avoid long physical lines.</h6>
                    </div>
                </div>

                 <div className='advantage'>
                    <i className="fa-regular fa-user"></i>
                    <div className='advantage-details'>
                      <h5 style={{marginRight:'5px', fontWeight:'600'}} className='Improve-cs'>Improved Customer Experience</h5>
                      <h6>Increases satisfaction and build trust in service.</h6>
                    </div>
                </div>

                 <div className='advantage' id='removed-advantage'>
                    <i className="fa-solid fa-people-arrows"></i>
                    <div className='advantage-details'>
                      <h5 style={{marginRight:'30px', fontWeight:'600'}} className='Social-dis'>Social Distancing & Safety</h5>
                      <h6>Reduce physical crowding and unnessasary.</h6>
                    </div>
                </div>
            </div>
               

            <div className='event-banner'>
                <h1>Events</h1>
                            
                <img src={Slider} style={{height: '400px' }} className="d-block w-100" alt="..." />
                               <Link to='/Edetails' > <button className='event-view'>View Event</button> </Link> 

            </div>
    <div className="marquee-wrapper">
  <p className="marquee-text">
    {cap
      ? `🚨 The Event Ticket Deadline is ${date}. Hurry up and grab your tickets! 🎟️`
      : `❌ Sorry, the event is full. No more tickets available.`}
  </p>
</div>

            <div className='time-managment'>
              <div className='time-img-div'>
                 <img src={Manage} alt='' className='time-img' />
              </div>
              <div className='time-content'>
                <h1>Manage The Time</h1>
                <p>Optimize your event with smart queue management that keeps everything moving smoothly.</p>
                <pre>Reduce waiting time and avoid crowd buildup at entry points. Give your visitors a faster,</pre>
                <pre>hassle-free experience from the moment they arrive. No more long lines—just happy,</pre>
                <pre>engaged attendees.</pre>
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

export default Main




  
    
