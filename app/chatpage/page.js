import { useState, useEffect } from 'react';
import { FaComments } from 'react-icons/fa'; // Importing an icon from react-icons

const Chat = () => {
    const [email, setEmail] = useState('simranjotkaur.bal@edu.sait.ca');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { email: 'simranjotkaur.bal@edu.sait.ca', message: 'Hello', timestamp: new Date().toLocaleTimeString() },
        { email: 'simranjotkaur.bal@edu.sait.ca', message: 'Test', timestamp: new Date().toLocaleTimeString() },
        { email: 'biancadominique.detorres@edu.sait.ca', message: 'Hi there!', timestamp: new Date().toLocaleTimeString() },
        { email: 'viclei.pasco@edu.sait.ca', message: 'Good morning!', timestamp: new Date().toLocaleTimeString() }
    ]);
    const [typing, setTyping] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false); // State to manage chat visibility

    const sendMessage = () => {
        if (message.trim() !== "") {
            setMessages([...messages, { email, message, timestamp: new Date().toLocaleTimeString() }]);
            setMessage('');
            setTyping(false);
        } else {
            alert("Please enter a message.");
        }
    };

    useEffect(() => {
        if (message.trim() !== "") {
            setTyping(true);
        } else {
            setTyping(false);
        }
    }, [message]);

    return (
        <div>
            <FaComments 
                style={{ fontSize: '2em', cursor: 'pointer', position: 'fixed', bottom: '20px', right: '20px', color: 'var(--header-footer-bg)' }} 
                onClick={() => setIsChatOpen(!isChatOpen)} 
            />
            {isChatOpen && (
                <div style={{ width: '400px', margin: '0 auto', fontFamily: 'Inter, sans-serif', color: 'var(--text-color)', backgroundColor: 'var(--bg-color)', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', animation: 'slideUp 1s ease-in-out', position: 'fixed', bottom: '60px', right: '20px' }}>
                    <div style={{ backgroundColor: 'var(--header-footer-bg)', color: 'var(--header-footer-text)', padding: '10px', textAlign: 'center', borderRadius: '8px 8px 0 0' }}>
                        Email Chat Component
                    </div>
                    <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll', backgroundColor: 'var(--article-bg)', borderRadius: '0 0 8px 8px' }}>
                        {messages.filter(msg => msg.email === email).map((msg, index) => (
                            <div key={index} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', backgroundColor: 'var(--tile-bg)', color: 'var(--tile-text)', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                                <div>{msg.message}</div>
                                <div style={{ fontSize: '0.8em', color: 'var(--text-color)' }}>{msg.timestamp}</div>
                            </div>
                        ))}
                        {typing && <div style={{ fontStyle: 'italic', color: 'var(--text-color)' }}>Typing...</div>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                        <label>
                            Select Email:
                            <select value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px', fontSize: '16px', backgroundColor: 'var(--btn-bg-color)', color: 'var(--btn-text-color)', border: '1px solid #ccc', borderRadius: '5px' }}>
                                <option value="simranjotkaur.bal@edu.sait.ca">simranjotkaur.bal@edu.sait.ca</option>
                                <option value="biancadominique.detorres@edu.sait.ca">biancadominique.detorres@edu.sait.ca</option>
                                <option value="viclei.pasco@edu.sait.ca">viclei.pasco@edu.sait.ca</option>
                            </select>
                        </label>
                        <label>
                            Message:
                            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} style={{ padding: '10px', fontSize: '16px', backgroundColor: 'var(--btn-bg-color)', color: 'var(--btn-text-color)', border: '1px solid #ccc', borderRadius: '5px' }} />
                        </label>
                        <button onClick={sendMessage} style={{ backgroundColor: 'var(--header-footer-bg)', color: 'var(--header-footer-text)', padding: '10px', border: 'none', cursor: 'pointer', borderRadius: '5px', transition: 'background-color 0.3s ease' }}>
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;