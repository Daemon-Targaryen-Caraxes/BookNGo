import React, { useState } from 'react';
import './App.css';

const Swap = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="currentColor" class="swap-icon" width="100" height="100">
      <path d="M8 5l-4 4h3v6h2V9h3l-4-4z"/>
      <path d="M16 19l4-4h-3v-6h-2v6h-3l4 4z" />
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
