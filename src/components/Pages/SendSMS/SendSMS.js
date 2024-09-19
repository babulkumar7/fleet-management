// BulkSMSForm.js (React component)
import React, { useState } from 'react';
import axios from 'axios';

const BulkSMSForm = () => {
  const [message, setMessage] = useState('');
  const [numbers, setNumbers] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumbers = numbers.split(',').map(num => num.trim());

    axios.post('http://localhost:3001/send-sms', {
      numbers: phoneNumbers,
      message: message
    })
    .then(response => {
      alert('Messages sent successfully!');
    })
    .catch(error => {
      console.error('Error sending SMS:', error);
    });
  };

  return (
    <div>
      <h2>Send Bulk SMS</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Parent Numbers (comma-separated):</label>
          <input
            type="text"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send SMS</button>
      </form>
    </div>
  );
};

export default BulkSMSForm;
