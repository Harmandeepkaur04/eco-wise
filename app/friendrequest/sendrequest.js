// utils/sendFriendRequest.js
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

// Function to send a friend request
const sendFriendRequest = async (senderId, receiverId) => {
  try {
    await addDoc(collection(db, 'friendRequests'), {
      senderId,
      receiverId,
      status: 'pending',
      timestamp: new Date(),
    });
    console.log('Friend request sent successfully');
  } catch (error) {
    console.error('Error sending friend request: ', error);
  }
};

export default sendFriendRequest;
