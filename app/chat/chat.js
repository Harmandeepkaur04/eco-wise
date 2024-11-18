import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useUser } from '@clerk/nextjs';
import './styles.css'; // Import the CSS file

const ChatComponent = ({ recipientEmail, recipientName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [currentRecipient, setCurrentRecipient] = useState(recipientEmail);
  const [currentRecipientName, setCurrentRecipientName] = useState(recipientName);

  useEffect(() => {
    if (!user || !currentRecipient) return;

    console.log("User:", user);
    console.log("Current Recipient Email:", currentRecipient);

    const q = query(
      collection(db, 'chatMessages'), // Changed collection name to 'chatMessages'
      where('participants', 'array-contains', user.emailAddresses[0].emailAddress),
      where('participants', 'array-contains', currentRecipient),
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
  }, [user, currentRecipient]);

  const handleSendMessage = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Send button clicked"); // Log to confirm function is called
    if (newMessage.trim() && user) {
      try {
        console.log("Sending message:", newMessage);
        await addDoc(collection(db, 'chatMessages'), { // Changed collection name to 'chatMessages'
          text: newMessage,
          createdAt: new Date(),
          participants: [user.emailAddresses[0].emailAddress, currentRecipient],
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

  const extractName = (email) => {
    return email.split('@')[0];
  };

  const handleRecipientChange = (newRecipientEmail, newRecipientName) => {
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
      <form className="inputContainer" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="input"
        />
        <button type="submit" className="sendButton">Send</button>
      </form>
    </div>
  );
};

export default ChatComponent;
