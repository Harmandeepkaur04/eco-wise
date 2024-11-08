// components/ChatComponent.js
import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useUser } from '@clerk/nextjs';

const ChatComponent = ({ recipientEmail }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useUser();

  useEffect(() => {
    if (!user || !recipientEmail) return;

    const q = query(
      collection(db, 'messages'),
      where('participants', 'array-contains', user.emailAddresses[0].emailAddress),
      orderBy('createdAt')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [user, recipientEmail]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && user) {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        createdAt: new Date(),
        participants: [user.emailAddresses[0].emailAddress, recipientEmail],
        sender: user.emailAddresses[0].emailAddress,
      });
      setNewMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map(message => (
          <div key={message.id}>
            <p><strong>{message.sender}:</strong> {message.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
