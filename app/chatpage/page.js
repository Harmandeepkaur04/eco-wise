import { useState } from 'react';
 
const Chat = () => {
    const [email, setEmail] = useState('simranjotkaur.bal@edu.sait.ca');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { email: 'simranjotkaur.bal@edu.sait.ca', message: 'Hello' },
        { email: 'simranjotkaur.bal@edu.sait.ca', message: 'Test' }
    ]);
 
    const sendMessage = () => {
        if (message.trim() !== "") {
            setMessages([...messages, { email, message }]);
            setMessage('');
        } else {
            alert("Please enter a message.");
        }
    };
 
    return (
        <div className="chat-container">
            <h2>Email Chat Component</h2>
            <label htmlFor="email">Select Email:</label>
            <select id="email" value={email} onChange={(e) => setEmail(e.target.value)}>
                <option value="simranjotkaur.bal@edu.sait.ca">simranjotkaur.bal@edu.sait.ca</option>
                <option value="biancadominique.detorres@edu.sait.ca">biancadominique.detorres@edu.sait.ca</option>
                <option value="viclei.pasco@edu.sait.ca">viclei.pasco@edu.sait.ca</option>
            </select>
            <div className="message-box">
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    rows="4"
                    cols="50"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
            </div>
            <button onClick={sendMessage}>Send</button>
            <div id="display" className="message-box">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>To: {msg.email}</strong><br />
                        {msg.message}
                    </div>
                ))}
            </div>
            <style jsx>{`
                .chat-container {
                    max-width: 600px;
                    margin: auto;
                    border: 1px solid #ccc;
                    padding: 20px;
                    border-radius: 10px;
                }
                .message-box {
                    margin-top: 20px;
                }
                .message {
                    border-bottom: 1px solid #eee;
                    padding: 10px 0;
                }
            `}</style>
        </div>
    );
};
 
export default Chat;