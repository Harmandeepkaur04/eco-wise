"use client";
import React, { useState, useEffect } from 'react';
import { Container, Title, Text, Group, List, ThemeIcon, TextInput, Button } from '@mantine/core';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useAudio } from '../Audio';
import { IconCheck } from '@tabler/icons-react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useAuth } from '@clerk/nextjs';
import '../profile/styles.css';
import Invite from '../pages/index'; 


export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
  });

  const [points, setPoints] = useState(0);
  const [notifications] = useState([
    'Reminder: Drop off your recyclables at the nearest center today!',
    'New event: Community cleanup drive on Saturday!',
  ]);
  const [isUserInfo, setIsUserInfo] = useState(false);
  const [isPoints, setIsPoints] = useState(false);
  const [isRewards, setIsRewards] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { speak, isAudioOn, setIsAudioOn } = useAudio();
  const { userId } = useAuth();
  const [isInviteFriend, setIsInviteFriend] = useState(false);
  

  useEffect(() => {
    speak('Welcome to the profile page. Here you can view and manage your personal information and track record on activities.');
  }, [isAudioOn]);

  

  const handleAudioToggle = () => {
    setIsAudioOn((prev) => !prev);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    if (!userId) return;
    try {
      await setDoc(doc(db, "users", userId), userInfo);
      console.log('User info saved successfully:', userInfo);
      speak('User information has been saved.');
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  };

  const toggleUserInfo = () => setIsUserInfo(!isUserInfo);
  const togglePoints = () => setIsPoints(!isPoints);
  const toggleRewards = () => setIsRewards(!isRewards);
  const toggleNotifications = () => setIsNotifications(!isNotifications);
  const toggleInviteFriend = () => setIsInviteFriend(!isInviteFriend);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId) return;
      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Fetched user Info:", docSnap.data());
          setUserInfo(docSnap.data());
        } else {
          console.log("No user data found!");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (!userId) return;
      try {
        const pointsDocRef = doc(db, "leaderboard", userId);
        const pointsDocSnap = await getDoc(pointsDocRef);
        if (pointsDocSnap.exists()) {
          setPoints(pointsDocSnap.data().points || 0);
        } else {
          console.log("No points data found!");
        }
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };

    fetchUserPoints();
  }, [userId]);

  return (
    <main>
      <Container className='container'>
        <Group position="center" className='audio-icon'>
          <div onClick={handleAudioToggle} style={{ cursor: 'pointer' }}>
            {isAudioOn ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
          </div>
        </Group>

        <Title order={1}><strong>Profile Page</strong></Title>

        <div className='infoSection'>
          <Title order={3} onClick={toggleUserInfo} style={{ cursor: 'pointer' }}>User Information</Title>
          {isUserInfo && (
            <div>
              {isEditing ? (
                <div>
                  <TextInput
                    label="Name"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Address"
                    name="address"
                    value={userInfo.address}
                    onChange={handleChange}
                  />
                  <Button onClick={handleSaveClick}>Save</Button>
                </div>
              ) : (
                <div>
                  <Text><strong>Name:</strong> {userInfo.name}</Text>
                  <Text><strong>Email:</strong> {userInfo.email}</Text>
                  <Text><strong>Address:</strong> {userInfo.address}</Text>
                  <Button onClick={handleEditClick}>Edit</Button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className='infoSection'>
          <Title order={3} onClick={togglePoints} style={{ cursor: 'pointer' }}>Points Earned</Title>
          {isPoints && (
            <div>
              <Text>{points} points</Text>
            </div>
          )}
        </div>

        <div className='infoSection'>
          <Title order={3} onClick={toggleRewards} style={{ cursor: 'pointer' }}>See Your Rewards</Title>
          {isRewards && (
            <div>
              <Text>Check your reward status based on the points earned.</Text>
            </div>
          )}
        </div>

        <div className='infoSection'>
          <Title order={3} onClick={toggleNotifications} style={{ cursor: 'pointer' }}>Notifications</Title>
          {isNotifications && (
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="teal" size={24} radius="xl">
                  <IconCheck size={16} />
                </ThemeIcon>
              }
            >
              {notifications.map((note, index) => (
                <List.Item key={index}>{note}</List.Item>
              ))}
            </List>
          )}
        </div>

        <div className='infoSection'>
          <Title order={3} onClick={toggleInviteFriend} style={{ cursor: 'pointer' }}>Invite a Friend</Title>
          <Invite />
        </div>

        <Group position="center" className='button'>
          <Button onClick={() => {
            speak('Signed out!');
            alert('Signed out!');
          }}>Sign Out</Button>
        </Group>



        
      </Container>
      
        
     
    </main>
    
  );
}
