import React from "react";
import './index.css';
const TrainCard = ({ train }) => {
  return (
    <div className="train-card">
      <div className="train-header">
        <h3>{train.number} {train.name}</h3>
        <span>Runs on: {train.days}</span>
        <span className="running-status">
          <a href="#">{train.runningStatus}</a>
        </span>
      </div>
      <div className="train-body">
        <div className="train-info">
          <div>
            <strong>{train.from.time}</strong>
            <p>{train.from.station}</p>
          </div>
          <div className="train-duration">
            <span>{train.duration}</span>
          </div>
          <div>
            <strong>{train.to.time}</strong>
            <p>{train.to.station}</p>
          </div>
        </div>
        <div className="classes">
          {train.classes.map((cls, index) => (
            <div key={index} className="class-card">
              <p>{cls.type}</p>
              <p>₹{cls.fare}</p>
              <p>{cls.status}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="availability-btn">Show Availability</button>
    </div>
  );
};

const Train = () => {
  const trainData = [
    {
      number: "12793",
      name: "RAYALASEEMA EXP",
      days: "S M T W T F S",
      runningStatus: "12793 Running Status",
      from: { time: "18:50", station: "RJP" },
      to: { time: "05:50", station: "SC" },
      duration: "11hr",
      classes: [
        { type: "SL", fare: 390, status: "WL54" },
        { type: "3A", fare: 1025, status: "WL19" },
        { type: "2A", fare: 1445, status: "WL14" },
        { type: "1A", fare: 2415, status: "WL3" },
      ],
    },
    {
      number: "12798",
      name: "VENKATADRI EXP",
      days: "S M T W T F S",
      runningStatus: "12798 Running Status",
      from: { time: "20:00", station: "RJP" },
      to: { time: "06:20", station: "KCG" },
      duration: "10hr 20min",
      classes: [
        { type: "SL", fare: 355, status: "WL70" },
        { type: "3A", fare: 935, status: "WL18" },
        { type: "2A", fare: 1310, status: "WL14" },
        { type: "1A", fare: 2180, status: "WL5" },
      ],
    },
  ];

  return (
    <div className="train">
      {trainData.map((train, index) => (
        <TrainCard key={index} train={train} />
      ))}
    </div>
  );
};

export default Train;
