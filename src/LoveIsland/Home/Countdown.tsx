import React, { useEffect, useState } from "react";

function getNext9PM(): Date {
  const now = new Date();
  const next9PM = new Date();

  next9PM.setHours(21, 0, 0, 0); // Set to 9:00 PM today

  // If 9 PM today already passed, move to the next day
  if (now >= next9PM) {
    next9PM.setDate(next9PM.getDate() + 1);
  }

  // If the next 9 PM falls on a Wednesday (3), skip to Thursday (add 1 more day)
  if (next9PM.getDay() === 3) {
    next9PM.setDate(next9PM.getDate() + 1);
  }

  return next9PM;
}

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2,"0")}:${minutes
    .toString()
    .padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(() => getNext9PM().getTime() - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = getNext9PM().getTime() - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="montserrat-text">
      <h2>Time Until Next Episode:</h2>
      <div className="countdown-image-wrapper">
        <p className="countdown-text">{formatTime(timeLeft)}</p>
      </div>
    </div>
  );  
  
}
