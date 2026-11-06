import React from 'react';
import { EVENT } from '../eventConfig';

const Venue: React.FC = () => {
  const query = encodeURIComponent(EVENT.mapsQuery);
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const embedSrc = `https://maps.google.com/maps?q=${query}&z=15&output=embed`;

  return (
    <section id="venue" className="section venue-section">
      <div className="container venue-content">
        <h1 className="section-main-title">VENUE</h1>
        <p className="section-subtitle">
          Join us at this private garden resort in Batangas City for an unforgettable evening!
        </p>

        <div className="venue-card">
          <div className="venue-map-container">
            <iframe
              src={embedSrc}
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '15px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${EVENT.venueName} Location`}
            ></iframe>
          </div>

          <div className="venue-info">
            <h2 className="venue-name">{EVENT.venueName}</h2>
            <p className="venue-address">
              <span className="address-icon">📍</span>
              {EVENT.venueAddress}
            </p>
            <div className="venue-features">
              <span className="feature">🏊 Pool</span>
              <span className="feature">🌳 Garden</span>
              <span className="feature">🔒 Private Resort</span>
              <span className="feature">🅿️ Parking</span>
            </div>
            <button className="venue-directions-btn" onClick={() => window.open(googleMapsLink, '_blank')}>
              📍 View on Google Maps
            </button>
          </div>
        </div>

        <div className="venue-directions">
          <h3>How to Get There</h3>
          <div className="directions-content">
            <div className="direction-item">
              <span className="direction-icon">🚗</span>
              <div className="direction-text">
                <strong>By Car</strong>
                <p>Take SLEX and STAR Tollway to the Batangas City exit, then head to Barangay Banaba West and follow the signs to Sitio Lagundi.</p>
              </div>
            </div>
            <div className="direction-item">
              <span className="direction-icon">🚌</span>
              <div className="direction-text">
                <strong>By Public Transport</strong>
                <p>Take a bus bound for Batangas City Grand Terminal, then a jeepney or tricycle to Banaba West and the resort.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
