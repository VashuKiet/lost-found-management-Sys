import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ItemForm from '../components/ItemForm';
import ItemCard from '../components/ItemCard';
import { LogOut, Filter, Search } from 'lucide-react';
import ItemTree from '../components/ItemTree';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const types = ['All', 'Lost', 'Found'];

  const fetchItems = async (typeFilter = 'All') => {
    try {
      const config = {
        headers: { 'x-auth-token': localStorage.getItem('token') },
        params: typeFilter !== 'All' ? { type: typeFilter } : {}
      };
      const res = await axios.get('http://localhost:5000/api/items', config);
      setItems(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  useEffect(() => { fetchItems(filter); }, [filter]);

  const onLogout = () => { localStorage.removeItem('token'); navigate('/login'); };

  const handleItemAdded = (newItem) => {
    if (filter === 'All' || filter === newItem.Type) {
      setItems([newItem, ...items]);
    }
  };

  const lostCount  = items.filter(i => i.Type === 'Lost').length;
  const foundCount = items.filter(i => i.Type === 'Found').length;

  return (
    <>
      {/* Animated Background */}
      <ItemTree />

      {/* Navbar */}
      <nav style={{
        backgroundColor: 'var(--theme-bg)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: "'Space Mono', monospace",
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search size={18} color="var(--theme-accent)" />
          <span style={{ color: 'var(--theme-accent)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.15em' }}>
            LF_SYSTEM
          </span>
          <span style={{ color: 'var(--theme-text-muted)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            // v1.0
          </span>
        </div>
        <button onClick={onLogout} style={{
          background: 'transparent',
          border: '1px solid var(--theme-text-muted)',
          color: 'var(--theme-text-muted)',
          padding: '0.3rem 0.75rem',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.75rem',
          cursor: 'pointer',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--theme-accent)'; e.currentTarget.style.color = 'var(--theme-accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--theme-text-muted)'; e.currentTarget.style.color = 'var(--theme-text-muted)'; }}
        >
          <LogOut size={14} /> LOGOUT
        </button>
      </nav>

      {/* Main Content */}
      <div style={{ background: 'transparent', minHeight: '100vh', padding: '2rem', fontFamily: "'Space Mono', monospace", position: 'relative', zIndex: 1 }}>

        {/* Top Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>

          {/* Total Items Card */}
          <div style={panelStyle}>
            <div style={panelHeaderStyle}>
              <span>ITEMS_REPORTED // TOTAL</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <div style={dotStyle('#555')} />
                <div style={dotStyle('#555')} />
              </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {items.length}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--theme-text-muted)', marginTop: '0.75rem', letterSpacing: '0.1em' }}>
                {filter !== 'All' ? `FILTERED: ${filter.toUpperCase()}` : 'ALL TYPES'}
              </div>
              {/* Lost / Found mini breakdown */}
              <div style={{ marginTop: '1.2rem', display: 'flex', gap: '1.5rem' }}>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}>
                  <span style={{ color: '#ff4d4d', fontWeight: 700 }}>{lostCount}</span>
                  <span style={{ color: 'var(--theme-text-muted)' }}> LOST</span>
                </div>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}>
                  <span style={{ color: '#39ff14', fontWeight: 700 }}>{foundCount}</span>
                  <span style={{ color: 'var(--theme-text-muted)' }}> FOUND</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reports Log Count Card */}
          <div style={panelStyle}>
            <div style={panelHeaderStyle}>
              <span>REPORTS // LOG</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--theme-accent)', animation: 'pulse 2s infinite' }}>● LIVE</span>
            </div>
            <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '3.5rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                  {items.length.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--theme-text-muted)', marginTop: '0.75rem', letterSpacing: '0.1em' }}>
                  ITEMS LOGGED
                </div>
              </div>
              {/* Dot grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 10px)', gap: '4px', marginTop: '0.25rem' }}>
                {Array.from({ length: 21 }).map((_, i) => (
                  <div key={i} style={{
                    width: '8px', height: '8px', borderRadius: '2px',
                    backgroundColor: i < Math.min(items.length, 21) ? 'var(--theme-accent)' : 'rgba(255,255,255,0.08)'
                  }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1rem' }}>

          {/* Report Item Panel */}
          <div style={panelStyle}>
            <div style={panelHeaderStyle}>
              <span>REPORT_ITEM // FORM</span>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <ItemForm onItemAdded={handleItemAdded} />
            </div>
          </div>

          {/* Items Log Panel */}
          <div style={panelStyle}>
            <div style={panelHeaderStyle}>
              <span>ITEMS_LOG // RECORDS</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Filter size={12} color="var(--theme-text-muted)" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--theme-text-muted)',
                    color: 'var(--theme-text-muted)',
                    fontSize: '0.65rem',
                    fontFamily: "'Space Mono', monospace",
                    padding: '0.2rem 0.4rem',
                    cursor: 'pointer',
                    borderRadius: '2px',
                  }}
                >
                  {types.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{ padding: '0.5rem 1.5rem 1.5rem', maxHeight: '450px', overflowY: 'auto' }}>
              {items.length === 0 ? (
                <div style={{ color: 'var(--theme-text-muted)', textAlign: 'center', padding: '3rem 0', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                  NO RECORDS FOUND<br />
                  <span style={{ fontSize: '0.65rem', opacity: 0.5, marginTop: '0.5rem', display: 'block' }}>
                    Report an item to get started
                  </span>
                </div>
              ) : (
                items.map(item => <ItemCard key={item._id} item={item} />)
              )}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </>
  );
};

const panelStyle = {
  backgroundColor: 'rgba(5, 18, 30, 0.38)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '8px',
  overflow: 'hidden',
};

const panelHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.6rem 1.5rem',
  backgroundColor: 'rgba(255,255,255,0.03)',
  borderBottom: '1px solid rgba(255,255,255,0.05)',
  fontSize: '0.65rem',
  color: 'var(--theme-text-muted)',
  letterSpacing: '0.12em',
  fontFamily: "'Space Mono', monospace",
};

const dotStyle = (color) => ({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  backgroundColor: color,
});

export default Dashboard;
