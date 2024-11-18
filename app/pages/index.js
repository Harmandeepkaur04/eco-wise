// pages/index.js
import { useState } from 'react';
import { db,functions } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

export default function Home() {
  const [friendEmail, setFriendEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add invitation to Firestore
      await addDoc(collection(db, 'invitations'), {
        email: friendEmail,
        timestamp: serverTimestamp()
      });

      // Call the Cloud Function to send the email
      const sendInvite = httpsCallable(functions, 'sendInvite');
      await sendInvite({ email: friendEmail });

      alert('Invite sent!');
      setFriendEmail('');
    } catch (error) {
      console.error('Error sending invite: ', error);
      alert('Failed to send invite.');
    }
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="friendEmail">Friend's Email:</label>
        <input
          type="email"
          id="friendEmail"
          value={friendEmail}
          onChange={(e) => setFriendEmail(e.target.value)}
          required
        />
        <button type="submit">Send Invite</button>
      </form>
    </div>
  );
}
