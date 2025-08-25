import React, { useState } from 'react';
import './Form.css';

export default function Login() {

  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  
  const handleLogin = () => {
    if (number === '123456' && password === 'admin') {
      alert('Login successful!');

       setNumber('');
    setPassword('');

    } else {
      alert('Invalid');
    }
  };

  return (
    <div>
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
          <div className='hello-1'>
            <h3>Hello Friend!</h3>
          </div>
          <div className='p-2'>
            <p>
              Enter your personal details and start <br />
              journey with us
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
