import React, { useState } from 'react';
import sendFriendRequest from './sendrequest'; // Adjust the path

const FriendRequestButton = ({ senderId, senderEmail, groupName }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendRequest = async () => {
    const receiverEmail = prompt('Enter the email address of the person you want to invite:');
    if (receiverEmail) {
      setLoading(true);
      setError(null);
      try {
        await sendFriendRequest(senderId, senderEmail, receiverEmail, groupName);
        console.log('Friend request sent successfully');
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
