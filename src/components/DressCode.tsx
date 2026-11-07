import React from 'react';
import { DRESS_CODE_SWATCHES, asset } from '../eventConfig';

const OutfitPhotos: React.FC<{ files: string[]; label: string }> = ({ files, label }) => (
  <div className="outfit-photos">
    {files.map((f, i) => (
      <img key={f} src={asset(`DressCode/${f}`)} alt={`${label} ${i + 1}`} loading="lazy" />
    ))}
  </div>
);

const DressCode: React.FC = () => {
  return (
    <section id="dress-code" className="section dress-code-section">
      <div className="container dress-code-content">
        <h1 className="section-main-title">DRESS CODE</h1>
        <p className="section-subtitle">
          Step into a floral painting with us. Come dressed in soft pastels!
        </p>

        <div className="dress-code-wrapper">
          <div className="dress-code-card main-theme">
            <div className="theme-icon">🎨</div>
            <h2 className="theme-title">Pastel Attire</h2>
            <p className="theme-description">Any pastel shade, <strong>except pink</strong></p>

            <div className="color-palette">
              <h4>Suggested Shades</h4>
              <div className="colors">
                {DRESS_CODE_SWATCHES.map((s) => (
                  <div className="swatch-item" key={s.name}>
                    <span className="color-swatch" style={{ background: s.color }} title={s.name}></span>
                    <span className="swatch-name">{s.name}</span>
                  </div>
                ))}
              </div>
              <div className="no-pink">
                <span className="color-swatch no-pink-swatch" title="Pink is reserved for the debutante"></span>
                <span>Pink is reserved for the debutante</span>
              </div>
            </div>
          </div>

          <div className="dress-suggestions">
            <div className="dress-code-card suggestion-card">
              <div className="suggestion-icon">👗</div>
              <h3 className="suggestion-title">For Ladies</h3>
              <OutfitPhotos files={['Female1.jpg', 'Female2.jpg']} label="Ladies' outfit idea" />
              <ul className="suggestion-list">
                <li>Flowy pastel dress or gown</li>
                <li>Soft floral prints in lavender, blue, mint, or yellow</li>
                <li>Pastel blouse with a skirt or trousers</li>
                <li>Light, airy fabrics like chiffon, tulle, or linen</li>
                <li>Pearl or dainty floral accessories</li>
              </ul>
            </div>

            <div className="dress-code-card suggestion-card">
              <div className="suggestion-icon">👔</div>
              <h3 className="suggestion-title">For Gentlemen</h3>
              <OutfitPhotos files={['Male1.jpg', 'Male2.jpg']} label="Gentlemen's outfit idea" />
              <ul className="suggestion-list">
                <li>Pastel polo, barong, or dress shirt</li>
                <li>Light blue, sage, lavender, or cream tones</li>
                <li>Beige, khaki, or light gray slacks</li>
                <li>Light-colored loafers or dress shoes</li>
                <li>Optional pastel tie or floral pocket square</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="dress-code-note">
          <div className="note-icon">🌸</div>
          <div className="note-content">
            <p><strong>Note:</strong> Our theme is inspired by Impressionist floral paintings, so soft,
            dreamy pastels will make every photo look like a canvas. Kindly avoid pink, which is reserved
            for the debutante, as well as dark or neon colors.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressCode;
