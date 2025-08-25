 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 import Home from "./components/Home";
 import Otp2 from "./components/Otp2"
import Otp3 from "./components/Otp3"
import Tracker from "./components/Tracker";
import Edetails from "./components/Edetails";
import Main from "./components/Main"
import Login from "./components/Login";
import Admin from "./components/Admin";
import Adminf from "./components/Adminf";
import Ticket from "./components/Ticket";
function App() {
  return (
     <Router>
      
      <Routes>
        
        <Route path="/" element={<Main />} />
        <Route path="/Edetails" element={<Edetails />} />
        <Route path="/Otp1" element={<Home />} />
        <Route path="/Otp2" element={<Otp2 />} />
        <Route path="/Otp3" element={<Otp3 />} />
        <Route path="/Tracker" element={<Tracker />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Form" element={<Adminf/>} />
        <Route path="/Ticket" element={<Ticket/>} />
      </Routes>
    </Router>
    // <div>
    //  <Main />
    //  </div>
  );
}

export default App;
