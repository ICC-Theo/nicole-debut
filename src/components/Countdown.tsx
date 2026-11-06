import React, { useState, useEffect } from 'react';
import { DATE } from '../eventConfig';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!DATE.date) return;
    const celebrationDate = DATE.date.getTime();

    const tick = () => {
      const difference = celebrationDate - Date.now();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
        return true;
      }
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return false;
    };

    tick();
    const timer = setInterval(() => {
      if (!tick()) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container">
      <h3>Counting down to the Debut</h3>
      <div className="countdown-timer">
        {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
          <div className="countdown-item" key={unit}>
            <span className="countdown-number">{timeLeft[unit]}</span>
            <span className="countdown-label">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
