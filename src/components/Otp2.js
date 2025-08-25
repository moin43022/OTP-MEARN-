import "./Otp-pro-2.css";
import axios from "axios";
import React, { useState , useEffect } from 'react';
import { useNavigate,Link } from "react-router-dom";

function GarbaEvent() {
const [isClicked, setIsClicked] = useState(true);
const [isClicke, setIsClicke] = useState(true);
const [date, setdate] = useState('2025-08-30');
const navigate = useNavigate();
const left = document.querySelector("#left-b")
         const rigth = document.querySelector("#rigth-b")
function handle(){
  setIsClicke(prev => !prev);
  setIsClicked(true);
}

function handleclicke(){
setIsClicked(prev => !prev);
setIsClicke(true);

};

useEffect(() => {
  let Availabel = localStorage.getItem("availabel");
   if(Availabel === "true"){
  const fetchEvent = async () => {
    try {
      const response = await axios.get("http://192.168.29.155:5000/api/events/latest");
      const Newevent = response.data; 
      console.log(Newevent);

      let hed = document.querySelector('.Otp-head-heading');
      let left = document.querySelector("#left-b");
      let rigth = document.querySelector("#rigth-b");

      if (hed) hed.innerHTML = `Event Name : ${Newevent.name}`;
      if (left) left.innerHTML = Newevent.time;
      if (rigth) rigth.innerHTML = Newevent.time2;

      setdate(Newevent.date);

    } catch (err) {
      console.error("❌ Error fetching latest event:", err);
    }
  };

  fetchEvent();
}
}, []);

function handleproceed(){
if(!isClicked){
  localStorage.setItem('time', left.innerHTML); 
  navigate("/Otp3");
}
else if(!isClicke){
    navigate("/Otp3");
    localStorage.setItem('time', rigth.innerHTML); 
}
else{
  alert("Please select time")
}
};
  return (
    <div className="containerr">
        <div className='Otp-head'> 
       <h2>Logo</h2>
       <div className='Otp-head-div'> 
        <Link to='/Otp1' className='a-tag'>
        <h3>{'<'}</h3>
        </Link>
        <h3 className='Otp-head-heading'>Event Name : Garba Event </h3>
       </div>
      </div>
      <h1 className="otp2heading">Mega Garba Event</h1>


      <div className="box">
      <div className="date-steps">
        <span className="step active">1. Verify</span>
        <span className="divider">{'>'}</span>
        <span className="step active">2. Date & Time</span>
        <span className="divider">{'>'}</span>
        <span className="step">3. Proceed to Pay</span>
      </div>
        <div className="section">
          <p className="select">Event Date</p>
          <button className="btn-selected">{date}</button>
        </div>

        <div className="section">
          <p className="select"> Select Time</p>
          <div className="btn-group">
            <button id="left-b" className={isClicked ? 'btn-time' : 'btn-time-change'}  onClick={handleclicke}>
              04:00 pm
            </button>
            <button id="rigth-b"  className={isClicke ? 'btn-time' : 'btn-time-change-lower'}  onClick={handle}>
              08:00 pm
            </button>
          </div>
        </div>
      </div>

      <div className="proceed-footer">
        <button className="proceed-btn" onClick={handleproceed}>Proceed</button>
      </div>
    </div>
  );
}

export default GarbaEvent;
