// components/InviteForm.js
import { useState } from 'react';
import { functions } from '../firebase';
import { httpsCallable } from 'firebase/functions';

export default function InviteForm() {
  const [email, setEmail] = useState('');
  const [groupName, setGroupName] = useState('');

  const sendInvite = async () => {
    const sendInviteEmail = httpsCallable(functions, 'sendInviteEmail');
    try {
      const result = await sendInviteEmail({
        senderEmail: 'your-email@example.com',
        receiverEmail: email,
        groupName: groupName,
      });
      if (result.data.success) {
        alert('Invite sent successfully!');
      } else {
        alert('Failed to send invite: ' + result.data.error);
      }
    } catch (error) {
      console.error('Error sending invite:', error);
      alert('Error sending invite: ' + error.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Friend's email"
      />
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Group name"
      />
      <button onClick={sendInvite}>Send Invite</button>
    </div>
  );
}
