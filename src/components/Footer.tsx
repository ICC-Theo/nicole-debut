import React from 'react';
import { EVENT, DATE } from '../eventConfig';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-celebration">
          <span className="footer-emoji">🌸</span>
          <h3>{EVENT.celebrant}'s 18th Debut</h3>
          <span className="footer-emoji">🌸</span>
        </div>
        <p className="footer-date">{DATE.long}{DATE.timeRange && ` • ${DATE.timeRange}`}</p>
        <p className="footer-date">{EVENT.venueName}</p>
        <p className="footer-tagline">"{EVENT.tagline}"</p>
        <div className="footer-divider">
          <span>🌿</span>
          <span>🌷</span>
          <span>🌿</span>
        </div>
        <p className="footer-credits">Made with 💗 for a special debut</p>
      </div>
    </footer>
  );
};

export default Footer;
