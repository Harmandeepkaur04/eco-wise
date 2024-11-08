// utils/sendFriendRequest.js
import { db, functions } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

// Function to send a friend request and an email invitation
const sendFriendRequest = async (senderId, senderEmail, receiverEmail, groupName) => {
  try {
    // Add friend request to Firestore
    await addDoc(collection(db, 'friendRequests'), {
      senderId,
      senderEmail,
      receiverEmail,
      groupName,
      status: 'pending',
      timestamp: new Date(),
    });

    // Call the Cloud Function to send an email invitation
    const sendInviteEmail = httpsCallable(functions, 'sendInviteEmail');
    const result = await sendInviteEmail({ senderEmail, receiverEmail, groupName });

    if (result.data.success) {
      console.log('Friend request and email invitation sent successfully');
    } else {
      console.error('Error sending email invitation:', result.data.error);
    }
  } catch (error) {
    console.error('Error sending friend request: ', error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};

export default sendFriendRequest;
