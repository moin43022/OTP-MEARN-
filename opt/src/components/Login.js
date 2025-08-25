import React, { useState } from 'react';
import './Login.css';
import { useNavigate,Link } from 'react-router-dom';


export default function Login() {

     const Navigate = useNavigate();
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  
  const handleLogin = () => {
    if (number === '123456' && password === 'admin') {
     Navigate('/Admin');

       setNumber('');
    setPassword('');

    } else {
      alert('Invalid');
    }
  };

  return (


    
      <div className='login'>
        <div className='signin'>
          <p className='p-1'>Sign in</p>

          <div className='in-1'>
            <input
              type='text'
              placeholder='number'
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <div className='in-2'>
            <input
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button className='sign-btn' onClick={handleLogin}>
              Sign-in
            </button>
          </div>
        </div>

        <div className='hello'> 
            <div  className='Signin-btn'> <Link to="/" ><button >X</button></Link>  </div>
            
          <div className='hello-1'>
            <h3>Hello Admin!</h3>
          </div>
          <div className='p-2'>
            <p>
              Access your admin dashboard to manage bookings, monitor event flow, <br /> and ensure a seamless experience for all attendees. Log in to take<br />  control, oversee performance, and make real-time updates with <br/> ease and efficiency.
            </p>
          </div>
        </div>
      </div>
);
}
