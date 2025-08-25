import React from "react";
import { useNavigate,Link } from "react-router-dom";
import Popup from './Popup';
import "./Otp3.css";
import axios from 'axios';
import { useState , useEffect} from 'react';

function PaymentSummary() {
  const [date, setdate] = useState('2025-08-30');
const [pri, setpri] = useState(499);
const [price, setprice] = useState(499);
const [ticket, setticket] = useState(1);
const[cap, setcap] = useState(100);
const [showPopup, setShowPopup] = useState(false);
const [inputs, setInputs] = useState(Array(ticket).fill(''));
const navigate = useNavigate();
let time = localStorage.getItem('time');
let phone = localStorage.getItem('userPhone');

let location = localStorage.getItem('location');
function Addticket(){
  let newprice = price+pri;
  let newticket = ticket+1;
  setticket(newticket);
  setprice(newprice);

}
function Removeticket(){
  if(price === pri){
  }
  else{
    let newprice = price-pri;
    let newticket = ticket-1;
    setticket(newticket);
  setprice(newprice);
  }
}
 const handleChange = (index, value) => {
      const updated = [...inputs];
      updated[index] = value;
      setInputs(updated);
    };
  
    useEffect(() => {
      let Availabel = localStorage.getItem("availabel");
   if(Availabel === "true"){
  const fetchEvent = async () => {
    try {
      const response = await axios.get("http://10.157.87.139:5000/api/events/latest");
      const Newevent = response.data;
      console.log(Newevent);

      let head = document.querySelector(".opt3-heading");
      if (head) head.innerHTML = `${Newevent.name} Event`;

      let sp = Newevent.ticket;
      setprice(parseInt(sp));
      setpri(parseInt(sp));

      setcap(Newevent.capacity);
      setdate(Newevent.date);

      console.log(Newevent.date);
    } catch (err) {
      console.error("Error fetching latest event:", err);
    }
  };

  fetchEvent();
   }
}, []);


const handleSubmit = async () => {
  const allFilled = inputs.every((val) => val.trim() !== '');

  if (!allFilled) {
    return alert('Please fill all names.');
  }
  
  if (!phone) {
    return alert("Phone number missing. Please verify again.");
  }

  try {
  const res = await axios.post('http://192.168.29.155:5000/api/tickets/book', {
  phone,
  names: inputs,
  time,
  location,
  price: pri,
  date,
  capacity:cap
});

  
    if (res.status === 200) {
let x = localStorage.setItem("date",date)      
      navigate("/Ticket");
    }
  } catch (err) {

    console.error("Booking failed:", err);
    alert("Booking failed. Try again.");
  }
   
};




  return (
    <div className="main-payment-div">
               <div className='Otp-head'> 
       <h2>Logo</h2>
       <div className='Otp-head-div'> 
        <Link to='/Otp2' className='a-tag'>
        <h3>{'<'}</h3>
        </Link>
        <h3 className='Otp-head-heading'>Event Name : Garba Event </h3>
       </div>
      </div>
    <div className="payment-container">
      <div className="steps-bar">
        <span className="payment-step active">1. Verify</span>
        <span className="divider">{'>'}</span>
        <span className="payment-step active">2. Date & Time</span>
        <span className="divider">{'>'}</span>
        <span className="payment-step active">3. Proceed To Pay</span>
      </div>

      <div className="summary-box">
        <div className="summary-header">
          <h2 className="opt3-heading">Garba Event</h2>
          <h2 className="price">₹{price}.00</h2>
        </div>

        <hr />

        <div className="event-details">
          <p>{date}</p>
          <p><strong>{time}</strong></p>
          <br />
          <p><strong>Venue</strong></p>
          <p>{location}</p>
        </div>

        <hr />

        <div className="ticket-row">
          <span className="ticket-label">Ticket: {ticket} </span>
          <span className="ticket-label ticket-l">Add & Remove Tickets</span>
          <button className='remove-btn'onClick={Removeticket}>-</button>
          <button className="add-btn" onClick={Addticket}>+</button>
        </div>
      </div>

      <div className="total-row">
        <span>Total Amount</span>
        <span className="total-price">₹{price}.00</span>
      </div>
      
      <button className="pay-btn" onClick={() => setShowPopup(true)}>Proceed</button>
      <Popup show={showPopup} onClose={() => setShowPopup(false)}>

      <h2 style={{color:'white'}}>{ticket > 1 ? 'Provid Names For Tickets' : 'Provide Name For Ticket '}</h2>

  <div
    style={{
      maxHeight: ticket > 7 ? '300px' : 'auto',
      overflowY: ticket > 7 ? 'auto' : 'visible',
      paddingRight: '10px',
    }}
  >
    {[...Array(ticket)].map((_, i) => (
      <input
        key={i}
        type="text"
        placeholder={`Enter Name Of Ticket ${i + 1}`}
        style={{ display: 'block', margin: '15px 0' }}
        onChange={(e) => handleChange(i, e.target.value)}
        className="Ticket-input"

      />
    ))}
  </div>

  <button className="Ticket-btn" onClick={handleSubmit}>
    Proceed To Pay
  </button>
</Popup>

    </div>
</div>
  );
}

export default PaymentSummary;
