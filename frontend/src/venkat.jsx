import  { useState } from 'react';
import './App.css';

const Swap = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="swap-icon" width="100" height="100">
      <path d="M8 5l-4 4h3v6h2V9h3l-4-4z" />
      <path d="M16 19l4-4h-3v-6h-2v6h-3l4 4z" />
    </svg>
  );
};

function Venkat() {
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
            <input type="text" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
            <input type="datetime-local" />
          </div>
        );
      case 'train':
        return (
          <div className="form">
            <input type="text" placeholder="Station From" value={from} onChange={(e) => setFrom(e.target.value)} />
            <button className="swap-btn" onClick={handleSwap}>
              <Swap />
            </button>
            <input type="text" placeholder="Station To" value={to} onChange={(e) => setTo(e.target.value)} />
            <input type="datetime-local" />
          </div>
        );
      case 'bus':
        return (
          <div className="form">
            <input type="text" placeholder="Bus Stop From" value={from} onChange={(e) => setFrom(e.target.value)} />
            <button className="swap-btn" onClick={handleSwap}>
              <Swap />
            </button>
            <input type="text" placeholder="Bus Stop To" value={to} onChange={(e) => setTo(e.target.value)} />
            <input type="datetime-local" />
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
        <button className={selectedService === 'flight' ? 'active' : ''} onClick={() => { setSelectedService('flight'); setFrom(''); setTo(''); }} >
          <svg fill="#1f1e1e" width="64px" height="64px" viewBox="-25.77 -25.77 110.11 110.11" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)" stroke="#1f1e1e" stroke-width="0.00058568"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-25.77" y="-25.77" width="110.11" height="110.11" rx="55.055" fill="#7ed0ec" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="flight_plane" data-name="flight plane" d="M1023.994,672.006c2.4-3.218,3.843-6.559,3.85-8.946a3.323,3.323,0,0,0-.453-1.828,1.706,1.706,0,0,0-.578-.584,3.265,3.265,0,0,0-1.852-.466c-2.381,0-5.723,1.442-8.942,3.849a77.166,77.166,0,0,0-8.806,8.487q-.917.966-1.934,2.031l-6.976-2.091.02-.02a1.566,1.566,0,0,0-.005-2.2l-1.259-1.261a1.571,1.571,0,0,0-1.11-.461,1.541,1.541,0,0,0-1.1.458l-1.885,1.886-1-.3a1.563,1.563,0,0,0-.125-2.063l-1.266-1.265a1.568,1.568,0,0,0-1.109-.457,1.534,1.534,0,0,0-1.1.458l-1.73,1.73-7.094-2.125a1.775,1.775,0,0,0-.507-.072,1.875,1.875,0,0,0-1.311.531l-2.494,2.494a1.463,1.463,0,0,0-.439,1.029,1.433,1.433,0,0,0,.761,1.284l14.918,8.334a2.607,2.607,0,0,1,.362.275l4.253,4.252c-3.978,4.191-7.522,8.25-10.284,11.781-.258.328-.5.649-.742.965l-11.541-1.048a1.573,1.573,0,0,0-.2-.012,2.127,2.127,0,0,0-1.429.591l-1.163,1.161a1.449,1.449,0,0,0-.446,1.029,1.418,1.418,0,0,0,.839,1.3l8.119,3.857a1.843,1.843,0,0,1,.311.223l.674.668a4.938,4.938,0,0,0-.325,1.561,2.053,2.053,0,0,0,.567,1.5l.029.026.008.005a2.056,2.056,0,0,0,1.493.56,4.964,4.964,0,0,0,1.548-.322l.684.682a1.956,1.956,0,0,1,.212.3l3.848,8.1a1.435,1.435,0,0,0,1.294.851h.008a1.446,1.446,0,0,0,1.026-.432l1.192-1.2a2.132,2.132,0,0,0,.569-1.426c0-.066,0-.117-.005-.144l-1.051-11.581c.317-.238.636-.484.965-.739,3.536-2.766,7.6-6.313,11.779-10.286l4.256,4.26a2.314,2.314,0,0,1,.278.365l8.318,14.891a1.451,1.451,0,0,0,2.322.342l2.512-2.51a1.9,1.9,0,0,0,.514-1.31,1.769,1.769,0,0,0-.069-.491l-2.125-7.095,1.729-1.733a1.563,1.563,0,0,0,0-2.205l-1.268-1.267a1.559,1.559,0,0,0-2.062-.129l-.3-.995,1.887-1.886a1.577,1.577,0,0,0,.455-1.107,1.54,1.54,0,0,0-.455-1.1l-1.262-1.262a1.563,1.563,0,0,0-2.217,0l-.013.012-2.089-6.976q1.082-1.032,2.062-1.96C1019.32,677.193,1022.053,674.6,1023.994,672.006Z" transform="translate(-969.276 -660.182)"></path> </g></svg>
          <span>flight</span>
        </button>
        <button className={selectedService === 'train' ? 'active' : ''} onClick={() => { setSelectedService('train'); setFrom(''); setTo(''); }} >
          <svg height="64px" width="64px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-56.32 -56.32 624.64 624.64" xml:space="preserve" fill="#000000" stroke="#000000" stroke-width="0.00512" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-56.32" y="-56.32" width="624.64" height="624.64" rx="312.32" fill="#7ed0ec" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"></style> <g> <path class="st0" d="M431.665,356.848V147.207c0-48.019-38.916-86.944-86.943-86.944h-40.363l4.812-42.824h8.813 c9.435,0,17.508,5.74,20.965,13.898l16.06-6.779V24.55C348.929,10.124,334.641,0.018,317.984,0L193.999,0.009 c-16.639,0.009-30.928,10.116-37.016,24.541l16.06,6.796c3.466-8.166,11.539-13.906,20.956-13.897h8.823l4.81,42.815h-40.354 c-48.01,0-86.942,38.924-86.942,86.944v209.641c0,36.403,26.483,66.736,61.208,72.773L87.011,512h48.488l22.378-33.823h196.264 L376.519,512h48.47l-54.516-82.379C405.182,423.576,431.665,393.252,431.665,356.848z M291.621,17.44l-4.803,42.824h-61.635 l-4.819-42.815L291.621,17.44z M180.715,99.299h150.57v25.095h-150.57V99.299z M135.413,180.409 c0-10.917,8.839-19.773,19.756-19.773h201.664c10.916,0,19.773,8.856,19.773,19.773v65.96c0,10.917-8.857,19.764-19.773,19.764 H155.168c-10.916,0-19.756-8.847-19.756-19.764V180.409z M154.232,378.495c-12.739,0-23.06-10.321-23.06-23.043 c0-12.739,10.321-23.052,23.06-23.052c12.722,0,23.043,10.313,23.043,23.052C177.275,368.174,166.954,378.495,154.232,378.495z M172.421,456.19l16.844-25.461h133.471l16.844,25.461H172.421z M357.768,378.495c-12.722,0-23.043-10.321-23.043-23.043 c0-12.739,10.321-23.052,23.043-23.052c12.739,0,23.06,10.313,23.06,23.052C380.828,368.174,370.507,378.495,357.768,378.495z"></path> </g> </g></svg>
          <span>train</span>
        </button>
        <button className={selectedService === 'bus' ? 'active' : ''} onClick={() => { setSelectedService('bus'); setFrom(''); setTo(''); }}>
          <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="-21.12 -21.12 106.24 106.24" enable-background="new 0 0 64 64" xml:space="preserve" fill="#7a7575" stroke="#7a7575" stroke-width="0.00064"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-21.12" y="-21.12" width="106.24" height="106.24" rx="53.12" fill="#7ed0ec" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.024"> <g> <circle fill="#231F20" cx="13" cy="46" r="2"></circle> <rect x="22" y="43" fill="#231F20" width="20" height="6"></rect> <circle fill="#231F20" cx="51" cy="46" r="2"></circle> <path fill="#231F20" d="M64,18.999c0-0.553-0.447-1-1-1h-3V10c0-5.523-4.478-10-10-10H14C8.477,0,4,4.478,4,10v7.999H1 c-0.553,0-1,0.447-1,1v9L0.003,28H0c0,2.209,1.791,4,4,4v20c0,2.211,1.789,4,4,4v7c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1v-7 h28v7c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1v-7c2.211,0,4-1.789,4-4V32c2.209,0,4-1.791,4-4h-0.003L64,27.999V18.999z M4,30 c-1.104,0-2-0.896-2-2v-8.001h2V30z M28,5h8c0.553,0,1,0.447,1,1s-0.447,1-1,1h-8c-0.553,0-1-0.447-1-1S27.447,5,28,5z M16,62h-6 v-6h6V62z M13,50c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S15.209,50,13,50z M16,36h-6V12h21v24h-3c0-3.314-2.686-6-6-6 S16,32.686,16,36z M22,32c2.209,0,4,1.791,4,4h-8C18,33.791,19.791,32,22,32z M44,50c0,0.553-0.447,1-1,1H21c-0.553,0-1-0.447-1-1 v-8c0-0.553,0.447-1,1-1h22c0.553,0,1,0.447,1,1V50z M33,36V12h21v24H33z M54,62h-6v-6h6V62z M51,50c-2.209,0-4-1.791-4-4 s1.791-4,4-4s4,1.791,4,4S53.209,50,51,50z M62,28c0,1.104-0.896,2-2,2V19.999h2V28z"></path> <path fill="#231F20" d="M49.707,14.294c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l2,2 c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L49.707,14.294z"></path> <path fill="#231F20" d="M44.707,14.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l7,7C50.488,22.902,50.744,23,51,23 s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L44.707,14.293z"></path> </g> </g><g id="SVGRepo_iconCarrier"> <g> <circle fill="#231F20" cx="13" cy="46" r="2"></circle> <rect x="22" y="43" fill="#231F20" width="20" height="6"></rect> <circle fill="#231F20" cx="51" cy="46" r="2"></circle> <path fill="#231F20" d="M64,18.999c0-0.553-0.447-1-1-1h-3V10c0-5.523-4.478-10-10-10H14C8.477,0,4,4.478,4,10v7.999H1 c-0.553,0-1,0.447-1,1v9L0.003,28H0c0,2.209,1.791,4,4,4v20c0,2.211,1.789,4,4,4v7c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1v-7 h28v7c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1v-7c2.211,0,4-1.789,4-4V32c2.209,0,4-1.791,4-4h-0.003L64,27.999V18.999z M4,30 c-1.104,0-2-0.896-2-2v-8.001h2V30z M28,5h8c0.553,0,1,0.447,1,1s-0.447,1-1,1h-8c-0.553,0-1-0.447-1-1S27.447,5,28,5z M16,62h-6 v-6h6V62z M13,50c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S15.209,50,13,50z M16,36h-6V12h21v24h-3c0-3.314-2.686-6-6-6 S16,32.686,16,36z M22,32c2.209,0,4,1.791,4,4h-8C18,33.791,19.791,32,22,32z M44,50c0,0.553-0.447,1-1,1H21c-0.553,0-1-0.447-1-1 v-8c0-0.553,0.447-1,1-1h22c0.553,0,1,0.447,1,1V50z M33,36V12h21v24H33z M54,62h-6v-6h6V62z M51,50c-2.209,0-4-1.791-4-4 s1.791-4,4-4s4,1.791,4,4S53.209,50,51,50z M62,28c0,1.104-0.896,2-2,2V19.999h2V28z"></path> <path fill="#231F20" d="M49.707,14.294c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l2,2 c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L49.707,14.294z"></path> <path fill="#231F20" d="M44.707,14.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l7,7C50.488,22.902,50.744,23,51,23 s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L44.707,14.293z"></path> </g> </g></svg><span>bus</span>
        </button>
      </div>
      {renderForm()}
      <button className="search-btn">Search</button>
    </div>
  );
}

export default Venkat;
