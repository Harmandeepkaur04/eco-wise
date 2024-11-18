import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useUser } from '@clerk/nextjs';

const ChatComponent = ({ recipientEmail, recipientName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (!user || !recipientEmail) return;

    console.log("User:", user);
    console.log("Recipient Email:", recipientEmail);

    const q = query(
      collection(db, 'chatMessages'),
      orderBy('createdAt')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Fetched Messages:", messagesData);
      setMessages(messagesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching messages: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, recipientEmail]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log("Send button clicked");
    if (newMessage.trim() && user) {
      try {
        console.log("Sending message:", newMessage);
        await addDoc(collection(db, 'chatMessages'), {
          text: newMessage,
          createdAt: new Date(),
          participants: [user.emailAddresses[0].emailAddress, recipientEmail],
          sender: user.emailAddresses[0].emailAddress,
        });
        setNewMessage('');
        console.log("Message sent successfully");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    } else {
      console.log("Message is empty or user is not defined");
    }
  };

  return (
    <div>
      <div>
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>No messages</p>
        ) : (
          messages.map(message => (
            <div key={message.id}>
              <p><strong>{message.sender === user.emailAddresses[0].emailAddress ? 'You' : (recipientName || recipientEmail)}:</strong> {message.text}</p>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatComponent;
