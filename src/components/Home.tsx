import React from 'react';
import { EVENT, DATE, hasDate } from '../eventConfig';

const Home: React.FC = () => {
  return (
    <section id="home" className="home-section">
      <div className="home-content">
        <div className="invitation-cards-wrapper">
          <div className="celebration-card">
            <div className="summer-decoration top">🌸 🌿 🌸</div>
            <p className="celebration-header">You are cordially invited to</p>
            <h1 className="celebrant-name">{EVENT.celebrant.toUpperCase()}'S</h1>
            <div className="age-badge">
              <span className="age-number">{EVENT.age}</span>
              <span className="age-text">th</span>
            </div>
            <p className="celebration-type">Debut Celebration</p>
            <p className="celebration-theme">"{EVENT.tagline}"</p>
            <div className="summer-decoration bottom">🌿 🌷 🌿</div>
          </div>

          <div className="celebration-card save-date-card">
            <h1 className="std-header">Save the Date</h1>
            <div className="summer-icon-header">🌹</div>
            {hasDate ? (
              <>
                <h2 className="std-month">{DATE.month}</h2>
                <div className="std-datetime">
                  <span className="std-day">{DATE.weekday}</span>
                  <span className="std-date">{DATE.day}</span>
                  <span className="std-time">
                    {DATE.time || 'Time TBA'}
                    {DATE.time && EVENT.endTime && <><br />to {EVENT.endTime}</>}
                  </span>
                </div>
                <h2 className="std-year">{DATE.year}</h2>
              </>
            ) : (
              <h2 className="std-month std-tba">Date to be announced</h2>
            )}
            <p className="std-venue-label">Celebration at</p>
            <p className="std-location">{EVENT.venueName}</p>
            <p className="std-address">{EVENT.venueAddress}</p>
            <div className="summer-footer">
              <span>🌸</span>
              <span>{EVENT.theme}</span>
              <span>🌸</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
