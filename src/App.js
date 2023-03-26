import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Parking from './Parking';
import Endtime from './Endtime';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/endtime" element={<Endtime />} />
      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
