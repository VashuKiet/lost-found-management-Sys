import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import HalftoneWave from '../components/HalftoneWave';

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
    Email: '',
    Password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { Email, Password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${apiUrl}/api/login`, formData, config);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Invalid Credentials');
    }
  };

  return (
    <div className="landing-container">
      <div className="ticket-card" style={{ maxWidth: '800px', height: 'auto', minHeight: '450px' }}>
        {/* Left Side: Animated Canvas */}
        <div className="ticket-canvas-container" style={{ flex: '0.8' }}>
          <HalftoneWave />
          <div className="canvas-overlay-text" style={{ top: '2rem', left: '2rem', fontSize: '1rem' }}>
            <span>A U T H E N T I C A T E</span><br/>
            <span>S E C U R E  Z O N E</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="ticket-details" style={{ flex: '1.2', padding: '2rem 3rem' }}>
          <h2 style={{ color: 'var(--theme-accent)', marginBottom: '1.5rem', fontSize: '1.5rem', letterSpacing: '0.1em' }}>
            SYSTEM LOGIN
          </h2>
          
          {error && <div className="error-message" style={{ fontFamily: 'Inter', backgroundColor: 'transparent', border: '1px dashed #f87171' }}>{error}</div>}
          
          <form onSubmit={onSubmit}>
            <div className="form-group">
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
              />
            </div>
            
            <div className="ticket-separator" style={{ marginTop: '2rem' }}>
              ----------------------------------------
            </div>

            <div className="ticket-footer" style={{ borderTop: 'none', paddingTop: '0', marginTop: '1rem' }}>
              <div className="ticket-footer-left">
                <Link to="/register" style={{ color: 'var(--theme-text)', textDecoration: 'none' }}>
                  &lt; CREATE_ACCOUNT
                </Link>
              </div>
              <div className="ticket-footer-right">
                <button type="submit" className="ticket-login-btn">
                  EXECUTE LOGIN
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
