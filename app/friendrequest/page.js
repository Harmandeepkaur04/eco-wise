// components/FriendRequestButton.js
import React from 'react';
import sendFriendRequest from './sendrequest'; // Adjust the path

const FriendRequestButton = ({ senderId, receiverId }) => {
  const handleSendRequest = () => {
    sendFriendRequest(senderId, receiverId);
  };

  return (
    <button onClick={handleSendRequest}>
      Send Friend Request
    </button>
  );
};

export default FriendRequestButton;
