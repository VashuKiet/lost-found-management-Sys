import React from 'react';
import { useNavigate } from 'react-router-dom';
import HalftoneWave from '../components/HalftoneWave';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="ticket-card">
        {/* Left Side: Animated Canvas */}
        <div className="ticket-canvas-container">
          <HalftoneWave />
          {/* Overlay Text */}
          <div className="canvas-overlay-text">
            <span>L O S T  &amp;  F O U N D</span><br/>
            <span>S E C U R E  S Y S T E M</span><br/>
            <span style={{ color: 'var(--theme-text-muted)' }}>V E R S I O N  1 . 0</span>
          </div>
        </div>

        {/* Right Side: Ticket Details */}
        <div className="ticket-details">
          <div className="ticket-info-group">
            <div className="ticket-row">
              <span className="ticket-label">TYPE</span>
              <span className="ticket-value">&gt; USER AUTHENTICATION</span>
            </div>
            <div className="ticket-row">
              <span className="ticket-label">ACCESS</span>
              <span className="ticket-value">&gt; ALL ZONES</span>
            </div>
          </div>

          <div className="ticket-info-group">
            <div className="ticket-row">
              <span className="ticket-label">DATE</span>
              <span className="ticket-value">&gt; {new Date().toLocaleDateString('en-GB').replace(/\//g, '.')}</span>
            </div>
            <div className="ticket-row">
              <span className="ticket-label">STATUS</span>
              <span className="ticket-value" style={{ color: 'var(--theme-accent)' }}>&gt; SECURE</span>
            </div>
            <div className="ticket-row">
              <span className="ticket-label">NODE</span>
              <span className="ticket-value">&gt; LOCALHOST</span>
            </div>
          </div>

          <div className="ticket-separator">
            LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
          </div>

          <div className="ticket-info-group">
            <div className="ticket-row">
              <span className="ticket-label">ACT 01</span>
              <span className="ticket-value">&gt; LOGIN</span>
            </div>
            <div className="ticket-row">
              <span className="ticket-label">ACT 02</span>
              <span className="ticket-value">&gt; MANAGE ITEMS</span>
            </div>
          </div>

          {/* Login Button Area */}
          <div className="ticket-footer">
            <div className="ticket-footer-left">
              LOST &amp; FOUND <span className="cyan-square"></span> VOL. 01<br/>
              <span className="ticket-id">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}-A</span>
            </div>
            <div className="ticket-footer-right">
              <button
                className="ticket-login-btn"
                onClick={() => navigate('/login')}
              >
                INITIALIZE LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
