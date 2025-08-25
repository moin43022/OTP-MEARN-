import React from 'react';
import './popup.css';

function Popup({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose} style={{fontSize:'30px',color:'white'}}>×</button>
        <div className="popup-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Popup;
