import { useState } from 'react';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';

const ItemForm = ({ onItemAdded }) => {
  const [formData, setFormData] = useState({
    ItemName: '',
    Description: '',
    Type: 'Lost',
    Location: '',
    ContactInfo: '',
    Date: ''
  });
  const [loading, setLoading] = useState(false);

  const { ItemName, Description, Type, Location, ContactInfo, Date } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        }
      };

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${apiUrl}/api/items`, formData, config);
      onItemAdded(res.data);
      setFormData({ ItemName: '', Description: '', Type: 'Lost', Location: '', ContactInfo: '', Date: '' });
    } catch (err) {
      console.error(err.response?.data?.msg || 'Error reporting item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="ticket-label" style={{ display: 'block', marginBottom: '0.5rem', width: 'auto' }}>&gt; ITEM NAME</label>
          <input
            type="text"
            className="ticket-input"
            name="ItemName"
            value={ItemName}
            onChange={onChange}
            required
            placeholder="e.g. Blue Backpack"
          />
        </div>
        <div className="form-group">
          <label className="ticket-label" style={{ display: 'block', marginBottom: '0.5rem', width: 'auto' }}>&gt; TYPE</label>
          <select
            className="ticket-input"
            name="Type"
            value={Type}
            onChange={onChange}
          >
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>
        <div className="form-group">
          <label className="ticket-label" style={{ display: 'block', marginBottom: '0.5rem', width: 'auto' }}>&gt; DESCRIPTION</label>
          <input
            type="text"
            className="ticket-input"
            name="Description"
            value={Description}
            onChange={onChange}
            required
            placeholder="e.g. Black zipper, laptop inside"
          />
        </div>
        <div className="form-group">
          <label className="ticket-label" style={{ display: 'block', marginBottom: '0.5rem', width: 'auto' }}>&gt; LOCATION</label>
          <input
            type="text"
            className="ticket-input"
            name="Location"
            value={Location}
            onChange={onChange}
            required
            placeholder="e.g. Library, Block B"
          />
        </div>
        <div className="form-group">
          <label className="ticket-label" style={{ display: 'block', marginBottom: '0.5rem', width: 'auto' }}>&gt; CONTACT INFO</label>
          <input
            type="text"
            className="ticket-input"
            name="ContactInfo"
            value={ContactInfo}
            onChange={onChange}
            required
            placeholder="e.g. vashu@college.edu / 9876543210"
          />
        </div>
        <div className="form-group">
          <label className="ticket-label" style={{ display: 'block', marginBottom: '0.5rem', width: 'auto' }}>&gt; DATE (OPTIONAL)</label>
          <input
            type="date"
            className="ticket-input"
            name="Date"
            value={Date}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="ticket-login-btn" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
          {loading ? 'EXECUTING...' : 'REPORT ITEM'}
        </button>
      </form>
    </>
  );
};

export default ItemForm;
