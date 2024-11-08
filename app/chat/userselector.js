// components/UserSelector.js
import { useState } from 'react';

const UserSelector = ({ onSelectUser }) => {
  const [email, setEmail] = useState('');

  const handleSelectUser = () => {
    onSelectUser(email);
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter user email"
      />
      <button onClick={handleSelectUser}>Chat</button>
    </div>
  );
};

export default UserSelector;
