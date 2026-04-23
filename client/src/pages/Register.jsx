import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import HalftoneWave from '../components/HalftoneWave';

const Register = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { Name, Email, Password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      await axios.post('http://localhost:5000/api/register', formData, config);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred during registration');
    }
  };

  return (
    <div className="landing-container">
      <div className="ticket-card" style={{ maxWidth: '800px', height: 'auto', minHeight: '500px' }}>
        {/* Left Side: Animated Canvas */}
        <div className="ticket-canvas-container" style={{ flex: '0.8' }}>
          <HalftoneWave />
          <div className="canvas-overlay-text" style={{ top: '2rem', left: '2rem', fontSize: '1rem' }}>
            <span>I N I T I A L I Z E</span><br />
            <span>N E W  U S E R</span>
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="ticket-details" style={{ flex: '1.2', padding: '2rem 3rem' }}>
          <h2 style={{ color: '#00ffff', marginBottom: '1.5rem', fontSize: '1.5rem', letterSpacing: '0.1em' }}>
            SYSTEM REGISTRATION
          </h2>

          {error && <div className="error-message" style={{ fontFamily: 'Inter', backgroundColor: 'transparent', border: '1px dashed #f87171' }}>{error}</div>}

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="ticket-label" style={{ display: 'block', marginBottom: '0.5rem', width: 'auto' }}>&gt; FULL_NAME</label>
              <input
                type="text"
                className="ticket-input"
                name="Name"
                value={Name}
                onChange={onChange}
                required
                placeholder="alias"
              />
            </div>
            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label className="ticket-label" style={{ display: 'block', marginBottom: '0.5rem', width: 'auto' }}>&gt; EMAIL_ADDRESS</label>
              <input
                type="email"
                className="ticket-input"
                name="Email"
                value={Email}
                onChange={onChange}
                required
                placeholder="user@node.local"
              />
            </div>
            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label className="ticket-label" style={{ display: 'block', marginBottom: '0.5rem', width: 'auto' }}>&gt; PASSWORD</label>
              <input
                type="password"
                className="ticket-input"
                name="Password"
                value={Password}
                onChange={onChange}
                required
                placeholder="••••••••"
                minLength="6"
              />
            </div>

            <div className="ticket-separator" style={{ marginTop: '2rem' }}>
              ----------------------------------------
            </div>

            <div className="ticket-footer" style={{ borderTop: 'none', paddingTop: '0', marginTop: '1rem' }}>
              <div className="ticket-footer-left">
                <Link to="/login" style={{ color: '#8ab4f8', textDecoration: 'none' }}>
                  &lt; BACK_TO_LOGIN
                </Link>
              </div>
              <div className="ticket-footer-right">
                <button type="submit" className="ticket-login-btn">
                  CREATE NODE
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
