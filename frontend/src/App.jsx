import React, { useState } from 'react';
import './App.css';

// SVG Component for Swap Icon
const Swap = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M4.29 8.71a1 1 0 011.42 0L8 11.59V4a1 1 0 112 0v7.59l2.29-2.88a1 1 0 111.42 1.42l-4 5a1 1 0 01-1.42 0l-4-5a1 1 0 010-1.42zM19.71 15.29a1 1 0 00-1.42 0L16 18.41V11a1 1 0 10-2 0v7.41l-2.29-2.88a1 1 0 00-1.42 1.42l4 5a1 1 0 001.42 0l4-5a1 1 0 000-1.42z" />
    </svg>
  );
};

function App() {
  const [selectedService, setSelectedService] = useState('flight');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const renderForm = () => {
    switch (selectedService) {
      case 'flight':
        return (
          <div className="form">
            <input type="text" placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} />
            <button className="swap-btn" onClick={handleSwap}>
              <Swap />
            </button>
            <input type="text" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)}/>
            <input type="datetime-local" />
          </div>
        );
      case 'train':
        return (
          <div className="form">
            <input type="text" placeholder="Station From"  value={from} onChange={(e) => setFrom(e.target.value)} />
            <button className="swap-btn" onClick={handleSwap}>
              <Swap />
            </button>
            <input type="text" placeholder="Station To"  value={to}  onChange={(e) => setTo(e.target.value)}/>
            <input  type="datetime-local"/>
          </div>
        );
      case 'bus':
        return (
          <div className="form">
            <input type="text" placeholder="Bus Stop From"  value={from}  onChange={(e) => setFrom(e.target.value)}/>
            <button className="swap-btn" onClick={handleSwap}>
              <Swap />
            </button>
            <input type="text"  placeholder="Bus Stop To" value={to} onChange={(e) => setTo(e.target.value)}/>
            <input  type="datetime-local" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <header>
        <h1>BookNGo</h1>
        <button className="signin-btn">Sign In</button>
      </header>
      <div className="tabs">
        <button className={selectedService === 'flight' ? 'active' : ''} onClick={() => {  setSelectedService('flight');  setFrom('');  setTo(''); }} >
          Flight
        </button>
        <button className={selectedService === 'train' ? 'active' : ''} onClick={() => {setSelectedService('train'); setFrom('');  setTo(''); }} >
          Train
        </button>
        <button className={selectedService === 'bus' ? 'active' : ''}  onClick={() => {   setSelectedService('bus');   setFrom('');   setTo('');  }}>
          Bus
        </button>
      </div>
      {renderForm()}
      <button className="search-btn">Search</button>
    </div>
  );
}

export default App;
