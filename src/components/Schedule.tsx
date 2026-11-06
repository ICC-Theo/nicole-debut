import React from 'react';
import Countdown from './Countdown';
import { PROGRAM, DATE, hasDate } from '../eventConfig';

const Schedule: React.FC = () => {
  return (
    <section id="schedule" className="section schedule-section">
      <div className="container schedule-content">
        <h1 className="section-main-title">THE PROGRAM</h1>
        <p className="section-subtitle">
          An afternoon of roses, candles, and treasured moments as Nicole turns eighteen.
        </p>
        {DATE.timeRange && <p className="program-hours">🕑 {DATE.weekday}, {DATE.long} · {DATE.timeRange}</p>}

        <div className="schedule-wrapper">
          {PROGRAM.map((item) => (
            <div className="schedule-card" key={item.title}>
              <div className="schedule-icon">{item.icon}</div>
              {item.time && <div className="schedule-time">{item.time}</div>}
              <h3 className="schedule-title">{item.title}</h3>
              <p className="schedule-description">{item.description}</p>
            </div>
          ))}
        </div>

        {hasDate && <Countdown />}
      </div>
    </section>
  );
};

export default Schedule;
