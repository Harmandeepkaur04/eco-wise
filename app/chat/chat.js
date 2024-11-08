import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useUser } from '@clerk/nextjs';
import './styles.css'; // Import the CSS file

const ChatComponent = ({ recipientEmail, recipientName }) => {
  // State variables to manage messages, new message input, loading state, and user info
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [currentRecipient, setCurrentRecipient] = useState(recipientEmail);
  const [currentRecipientName, setCurrentRecipientName] = useState(recipientName);

  useEffect(() => {
    // Exit early if user or recipient is not available
    if (!user || !currentRecipient) return;

    console.log("User:", user);
    console.log("Current Recipient Email:", currentRecipient);

    // Firestore query to fetch messages involving the current user and recipient, ordered by creation time
    const q = query(
      collection(db, 'messages'),
      where('participants', 'array-contains', user.emailAddresses[0].emailAddress),
      where('participants', 'array-contains', currentRecipient),
      orderBy('createdAt')
    );

    // Real-time listener for the query
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Fetched Messages:", messagesData);
      setMessages(messagesData);
      setLoading(false);
    });

    // Clean up the listener when the component unmounts or dependencies change
    return () => unsubscribe();
  }, [user, currentRecipient]);

  const handleSendMessage = async () => {
    // Send a new message to Firestore if the message is not empty and user is available
    if (newMessage.trim() && user) {
      try {
        await addDoc(collection(db, 'messages'), {
          text: newMessage,
          createdAt: new Date(),
          participants: [user.emailAddresses[0].emailAddress, currentRecipient],
          sender: user.emailAddresses[0].emailAddress,
        });
        setNewMessage(''); // Clear the input field after sending
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  const extractName = (email) => {
    // Extract the username from an email address
    return email.split('@')[0];
  };

  const handleRecipientChange = (newRecipientEmail, newRecipientName) => {
    // Update the recipient and reset the message state
    setCurrentRecipient(newRecipientEmail);
    setCurrentRecipientName(newRecipientName);
    setMessages([]);
    setLoading(true);
  };

  return (
    <div className="chatContainer">
      <div className="chatHeader">
        <h2>Chat with {currentRecipientName}</h2>
      </div>
      <div className="messagesContainer">
        {loading ? <p>Loading messages...</p> : messages.map(message => (
          <div key={message.id} className="message">
            <p><strong>{message.sender === user.emailAddresses[0].emailAddress ? 'You' : extractName(message.sender)}:</strong> {message.text}</p>
          </div>
        ))}
      </div>
      <div className="inputContainer">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="input"
        />
        <button onClick={handleSendMessage} className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
