import React, { useState } from 'react';
import { EVENT, GALLERY } from '../eventConfig';

// Display order for a 2-column phone grid: portraits pair up, landscapes span the row.
const LAYOUT: { photo: number; size?: 'wide' | 'full' }[] = [
  { photo: 2 }, { photo: 4 },
  { photo: 1, size: 'wide' },
  { photo: 0, size: 'full' },
  { photo: 3, size: 'wide' },
  { photo: 5, size: 'wide' },
];
const ITEMS = LAYOUT.map((l) => ({ ...l, src: GALLERY[l.photo] }));

const Gallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const step = (delta: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((i) => (i === null ? null : (i + delta + ITEMS.length) % ITEMS.length));
  };

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container gallery-content">
        <h1 className="section-main-title">PORTRAITS OF {EVENT.celebrant.toUpperCase()}</h1>
        <p className="section-subtitle">
          A little garden of moments before the big day
        </p>

        <div className="gallery-grid">
          {ITEMS.map((item, index) => (
            <div key={item.src} className={`gallery-item ${item.size ?? ''}`} onClick={() => setSelectedIndex(index)}>
              <img src={item.src} alt={`${EVENT.celebrant} ${index + 1}`} className="gallery-image" loading="lazy" />
              <div className="gallery-overlay">
                <span className="view-icon">🔍</span>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-cta">
          <p>🌸 Eighteen years of grace, now in full bloom 🌸</p>
        </div>
      </div>

      {selectedIndex !== null && (
        <div className="gallery-modal-overlay" onClick={() => setSelectedIndex(null)}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-modal-close" onClick={() => setSelectedIndex(null)}>×</button>
            <img src={ITEMS[selectedIndex].src} alt="Gallery" className="gallery-modal-image" />
            <div className="gallery-modal-nav">
              <button className="nav-btn prev" onClick={step(-1)}>❮</button>
              <button className="nav-btn next" onClick={step(1)}>❯</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
