import React, { useState, useEffect } from 'react';
import { validateGuestId, loadGuestData } from '../services/guestService';
import { EVENT, DATE, GALLERY } from '../eventConfig';

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [guestId, setGuestId] = useState('');
  const [error, setError] = useState('');
  const [isOpening, setIsOpening] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      await loadGuestData();
      setIsLoading(false);
    };
    initializeData();
  }, []);

  useEffect(() => {
    const checkUrlGuestId = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const guestIdFromUrl = urlParams.get('GuestID');

      if (guestIdFromUrl) {
        const isValid = await validateGuestId(guestIdFromUrl);
        if (isValid) {
          setIsOpening(true);
        } else {
          setError('Invalid Guest ID in URL. Please enter a valid Guest ID.');
          setShowModal(true);
        }
      }
    };

    if (!isLoading) {
      checkUrlGuestId();
    }
  }, [isLoading]);

  const handleInvitationClick = () => {
    if (!isOpening) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setGuestId('');
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    if (/^[A-Z]*$/.test(value) && value.length <= 5) {
      setGuestId(value);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (guestId.length !== 5) {
      setError('Guest ID must be exactly 5 letters');
      return;
    }

    setIsValidating(true);
    setError('');

    const isValid = await validateGuestId(guestId);

    if (!isValid) {
      setIsValidating(false);
      setError('Invalid Guest ID. Please check your invitation and try again.');
      return;
    }

    setShowModal(false);
    setIsValidating(false);
    setIsOpening(true);

    setTimeout(() => {
      window.location.href = `${window.location.origin}${window.location.pathname}?GuestID=${guestId}`;
    }, 5000);
  };

  return (
    <>
      <header className="header">
        <div className="hero-photo" role="img" aria-label={EVENT.celebrant}
          style={{ backgroundImage: `url(${GALLERY[0]})` }} />
        <div className="hero-fade" />

        <div className="header-content">
          <div className="celebration-badge">{EVENT.age}th</div>
          <h1>{EVENT.celebrant.toUpperCase()}</h1>
          <p className="header-subtitle">{EVENT.tagline}</p>
          <p className="header-date">{DATE.short}</p>

          <div className="invitation-container">
            <div className="invitation-wrapper">
              <div
                className={`invitation-card-closed ${isOpening ? 'hide' : ''}`}
                onClick={handleInvitationClick}
                style={{ cursor: isOpening ? 'default' : 'pointer' }}
              >
                <div className="card-decoration top-left">🌸</div>
                <div className="card-decoration top-right">🌿</div>
                <div className="card-content">
                  <span className="tap-text">Tap to Open</span>
                  <div className="summer-icon">💌</div>
                </div>
                <div className="card-decoration bottom-left">🌿</div>
                <div className="card-decoration bottom-right">🌸</div>
              </div>

              {isOpening && (
                <div className="invitation-contents">
                  <div className="invitation-objects">
                    <div className="party-elements">
                      <span className="party-icon sun">🌷</span>
                      <span className="party-icon palm">🎀</span>
                      <span className="party-icon flower">🌹</span>
                      <span className="party-icon umbrella">🦋</span>
                    </div>
                    <div className="invitation-message">
                      <p>You're Invited!</p>
                      <p className="event-date">{DATE.long}</p>
                      {DATE.timeRange && <p className="event-time">{DATE.timeRange}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content guest-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>

            <h2 className="guest-modal-title">Enter Your Guest ID</h2>
            <p className="guest-modal-text">
              Please enter your 5-letter Guest ID to access your invitation.
            </p>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <input
                type="text"
                value={guestId}
                onChange={handleInputChange}
                placeholder="ABCDE"
                maxLength={5}
                autoFocus
                className="guest-id-input"
              />
              <p className="guest-id-hint">5 letters only (A-Z)</p>

              {error && <p className="guest-id-error">{error}</p>}

              <button
                type="submit"
                disabled={guestId.length !== 5 || isValidating}
                className="guest-id-submit"
              >
                {isValidating ? 'Validating...' : 'Open Invitation'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
