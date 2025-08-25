import React, { useState, useEffect } from 'react';
import { auth, RecaptchaVerifier } from '../firebase/setup';
import { signInWithPhoneNumber } from 'firebase/auth';
import './home.css';
import axios from 'axios';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoKeySharp } from 'react-icons/io5';
import { useNavigate,Link } from "react-router-dom";


function PhoneAuth() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let Availabel = localStorage.getItem("availabel");
   if(Availabel === "true"){
    if (!window.recaptchaVerifier && document.getElementById('recaptcha-container')) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {},
          'expired-callback': () => {
            alert('reCAPTCHA expired. Please try again.');
          }
        },
        auth
      );
    }
    try { 
    const response = axios.get("http://192.168.29.155:5000/api/events/latest");
      if (response) {
          const Newevent = response.data; 
        console.log(Newevent);
       let hed = document.querySelector('.Otp-head-heading');
       hed.innerHTML = `Event Name : ${Newevent.name}`
      }}
      catch(err)
      {
        console.log(err)
      }
    }
  }, []);

  
  
  const sendOtp = async () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      { size: 'invisible' },
      auth
    );
  }

  try {
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, `+91${phone}`, appVerifier);
    setConfirmation(confirmationResult);
    alert('OTP sent!');
  } catch (error) {
    console.error('SMS not sent:', error);
    alert('Failed to send OTP. Try again.');
  }
};


  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      alert('Enter a valid 6-digit OTP');
      return;
    }

    try {
      const result = await confirmation.confirm(otp);
        navigate("/Otp2");
      console.log('User:', result.user);
      localStorage.setItem("userPhone", phone);
      setPhone('');
    setOtp('');
    setConfirmation(null);

    } catch (err) {
      console.error('OTP verification failed', err);
      alert('Invalid OTP. Please try again.');
      setOtp('');
    }
  };

  return (
    <div className="main-div">
      <div className='Otp-head'> 
       <h2>Logo</h2>
       <div className='Otp-head-div'> 
        <Link to='/Edetails' className='a-tag'>
        <h3>{'<'}</h3>
        </Link>
        <h3 className='Otp-head-heading'>Event Name : Garba Event </h3>
       </div>
      </div>
          <h1 className='Otp-heading'>
            First verify your number before  booking slot
          </h1>
      <div className="Container-div">
          <div className='steps'>
           <span className='step1'> 1. Verify </span> <span style={{color:'#AFADAD'}}>&gt;</span> <span style={{color:'#AFADAD'}}> 2. Date & Time </span> <span style={{color:'#AFADAD'}}>&gt;</span> <span style={{color:'#AFADAD'}} > 3. Proceed to Pay </span>
          </div>
        <div style={{ padding: '3.5rem 1.3rem' }}>


         
          <div className="Phone-number" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.3rem'}}>
            <FaPhoneAlt className='phone-icon' />
            <input className='otp-input'
              type="tel"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={10}
            />
            <button className='Phone-btn' onClick={sendOtp}>Get OTP</button>
          </div>

          {/* OTP Input */}
          
            <div className='otp'>
              <IoKeySharp className='phone-icon' />
              <input
              className='otp-input'
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
            </div>
        

           
          
            <button className="Phone-btn" id='verify-btn' onClick={verifyOtp} >
              Verify
            </button>
      
  
           
        </div>
      </div>

      <div id="recaptcha-container" style={{ display: 'none' }}></div>
    </div>
  );
}

export default PhoneAuth;
