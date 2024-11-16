// pages/invite.js
import React, { useState } from 'react';

const Invite = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with email:', email); // Debugging log

    const res = await fetch('/api/send-invite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.status === 200) {
      setMessage('Invitation sent successfully!');
    } else {
      setMessage('Error sending invitation.');
    }
    console.log('Response from API:', data); // Debugging log
  };

  return (
    <div>
      <h1>Invite Your Friends</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your friend's email"
          required
        />
        <button type="submit">Send Invite</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Invite;
