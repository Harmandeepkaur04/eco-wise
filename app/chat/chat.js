// pages/chat.js
import { useState } from 'react';
import Auth from '../components/auth';
import ChatComponent from '../chat/page';
import UserSelector from '../chat/userselector';
import FriendRequestButton from '../friendrequest/page'; // Assuming this is another component you have

const ChatPage = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const senderId = 'yourSenderId'; // Replace with actual sender ID
  const receiverId = 'yourReceiverId'; // Replace with actual receiver ID

  return (
    <div>
      <h1>Send a Friend Request</h1>
      <FriendRequestButton senderId={senderId} receiverId={receiverId} />
      <UserSelector onSelectUser={setRecipientEmail} />
      {recipientEmail && <ChatComponent recipientEmail={recipientEmail} />}
      <Auth />
    </div>
  );
};

export default ChatPage;
