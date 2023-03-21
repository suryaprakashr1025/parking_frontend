import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Parking from './Parking';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/parking" element={<Parking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
