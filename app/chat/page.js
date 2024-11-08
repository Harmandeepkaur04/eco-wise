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
      collection(db, 'messages'),
      // Temporarily remove the where clause for debugging
      // where('participants', 'array-contains', user.emailAddresses[0].emailAddress),
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
    });

    return () => unsubscribe();
  }, [user, recipientEmail]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && user) {
      try {
        await addDoc(collection(db, 'messages'), {
          text: newMessage,
          createdAt: new Date(),
          participants: [user.emailAddresses[0].emailAddress, recipientEmail],
          sender: user.emailAddresses[0].emailAddress,
        });
        setNewMessage('');
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  return (
    <div>
      <div>
        {loading ? <p>Loading messages...</p> : messages.map(message => (
          <div key={message.id}>
            <p><strong>{message.sender === user.emailAddresses[0].emailAddress ? 'You' : (recipientName || recipientEmail)}:</strong> {message.text}</p>
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
