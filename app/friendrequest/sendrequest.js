// friendRequest/page.js
import React, { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebaseConfig';

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

const FriendRequestButton = ({ senderEmail, groupName }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendRequest = async () => {
    const receiverEmail = prompt('Enter the email address of the person you want to invite:');
    if (receiverEmail) {
      setLoading(true);
      setError(null);
      const sendInviteEmail = httpsCallable(functions, 'sendInviteEmail');
      try {
        await sendInviteEmail({ senderEmail, receiverEmail, groupName });
        console.log('Friend request sent successfully');
        alert('Invitation sent!');
      } catch (error) {
        console.error('Error sending friend request:', error);
        setError('Failed to send friend request. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      console.log('No email address entered.');
    }
  };

  return (
    <div>
      <button onClick={handleSendRequest} disabled={loading}>
        {loading ? 'Sending...' : 'Send Friend Request'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default FriendRequestButton;
