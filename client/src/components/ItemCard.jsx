import { Calendar, MapPin, Phone, Tag } from 'lucide-react';

const ItemCard = ({ item }) => {
  const date = new window.Date(item.Date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const isLost = item.Type === 'Lost';
  const typeColor = isLost ? '#ff4d4d' : '#39ff14';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '1rem',
        borderBottom: '1px solid var(--theme-accent)',
        transition: 'background-color 0.2s ease'
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--theme-input-bg)'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      {/* Left: Item Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
        <h4 style={{ margin: 0, color: 'var(--theme-accent)', fontSize: '1.05rem', fontWeight: 'bold' }}>
          {item.ItemName}
        </h4>
        <div style={{ fontSize: '0.78rem', color: 'var(--theme-text-muted)', opacity: 0.85 }}>
          {item.Description}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', color: 'var(--theme-text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={12} /> {item.Location}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={12} /> {date}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Phone size={12} /> {item.ContactInfo}
          </span>
        </div>
      </div>

      {/* Right: Type Badge */}
      <div style={{
        padding: '0.25rem 0.6rem',
        border: `1px solid ${typeColor}`,
        color: typeColor,
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        borderRadius: '3px',
        textShadow: `0 0 6px ${typeColor}`,
        boxShadow: `0 0 6px ${typeColor}22`,
        marginLeft: '1rem',
        whiteSpace: 'nowrap',
        alignSelf: 'flex-start',
        marginTop: '0.15rem'
      }}>
        {item.Type.toUpperCase()}
      </div>
    </div>
  );
};

export default ItemCard;
