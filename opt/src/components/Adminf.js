import React, { useState } from 'react';
import './AdminF.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // ✅ Important for API calls

const Eventf = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    time2: '',
    name: '',
    capacity: '',
    location: '',
    info: '',
    artist: '',
    ticket: '',
    deadline: ''
  });

  const navigate = useNavigate();
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, box) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    if (box === 1) setImage1({ file, url });
    else setImage2({ file, url });
  };

  const removeImage = (box) => {
    if (box === 1) setImage1(null);
    else setImage2(null);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  sessionStorage.setItem("bookVisited", "false");

  try {
    // Clear ticket collection first
    await axios.delete("http://192.168.29.155:5000/api/Tickets/clear");
    console.log("✅ Ticket collection cleared.");

    const reader1 = new FileReader();
    const reader2 = new FileReader();

    let img1Base64 = null;
    let img2Base64 = null;

    const sendToBackend = async (img1Base64, img2Base64) => {
      const fullData = {
        ...formData,
        image1: img1Base64 || null,
        image2: img2Base64 || null,
      };

      try {
        const res = await axios.post("http://192.168.29.155:5000/api/events/add", fullData);
        console.log("✅ Event saved:", res.data);
        navigate('/');
      } catch (err) {
        console.error("❌ Error saving event to backend:", err);
        alert("Error saving event to backend");
      }
    };

    // Handle first image
    if (image1?.file) {
      reader1.onloadend = () => {
        img1Base64 = reader1.result;
        if (!image2?.file) sendToBackend(img1Base64, null);
        else if (img2Base64 !== null) sendToBackend(img1Base64, img2Base64);
      };
      reader1.readAsDataURL(image1.file);
    }

    // Handle second image
    if (image2?.file) {
      reader2.onloadend = () => {
        img2Base64 = reader2.result;
        if (!image1?.file) sendToBackend(null, img2Base64);
        else if (img1Base64 !== null) sendToBackend(img1Base64, img2Base64);
      };
      reader2.readAsDataURL(image2.file);
    }

    // If no images
    if (!image1?.file && !image2?.file) {
      sendToBackend(null, null);
    }

  } catch (err) {
    console.error("❌ Error submitting form:", err);
    alert("Error clearing previous data or saving new event.");
  }
};



  return (
    <div>
      <div className="component-1">
        <div className="space-22" />
        <form className="event-form" onSubmit={handleSubmit}>
          <Link to="/Admin" className='a-tag'><p className='close'>X</p></Link>
          <h2 className="form-1">Add New Event</h2>

          {/* Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Event Name</label>
              <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label>Artist Name</label>
              <input type="text" name="artist" placeholder="Enter Artist" value={formData.artist} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Enter Capacity </label>
              <input type="number" name="capacity" placeholder="Max Capacity is 1000" max="1000" value={formData.capacity} onChange={handleChange} required />
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input type="text" name="location" placeholder="Enter Location" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Event Info</label>
              <input type="text" name="info" placeholder="Enter Info" value={formData.info} onChange={handleChange} required />
            </div>
          </div>

          {/* Row 4 */}
          <div className="form-row">
            <div className="form-group">
              <label>Time Slot</label>
              <input type="text" name="time" placeholder="Ex: 8:00 PM" value={formData.time} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Second Time Slot</label>
              <input type="text" name="time2" placeholder="Ex: 10:00 PM" value={formData.time2} onChange={handleChange} required />
            </div>
          </div>

          {/* Row 5 */}
          <div className="form-row">
            <div className="form-group">
              <label>Ticket Price</label>
              <input type="text" name="ticket" placeholder="Ticket Price" value={formData.ticket} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Booking Deadline</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
            </div>
          </div>

          {/* Images */}
          <div className="form-row-img">
            <div className="form-group">
              <label>Add Event Image</label>
              {image1 ? (
                <div className="img-preview">
                  <img src={image1.url} alt="event" />
                  <button type="button" onClick={() => removeImage(1)}>X</button>
                </div>
              ) : (
                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 1)} required />
              )}
            </div>
            <div className="form-group2">
              <label>Add Artist Image</label>
              {image2 ? (
                <div className="img-preview">
                  <img src={image2.url} alt="artist" />
                  <button type="button" onClick={() => removeImage(2)}>X</button>
                </div>
              ) : (
                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 2)} required />
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="submit-btn-wrap">
            <button type="submit" className="submit-btn">Submit Event</button>
          </div>
        </form>
      </div>
      <div className="nothing"></div>
    </div>
  );
};

export default Eventf;
