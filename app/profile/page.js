"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, Title, Text, Group, Button, List, ThemeIcon, TextInput } from '@mantine/core';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { IconCheck } from '@tabler/icons-react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Make sure to adjust the path as necessary
import '../profile/styles.css';

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
  });

  const [points] = useState(150);

  const [notifications] = useState([
    'Reminder: Drop off your recyclables at the nearest center today!',
    'New event: Community cleanup drive on Saturday!',
  ]);

  const [isUserInfo, setIsUserInfo] = useState(false);
  const [isPoints, setIsPoints] = useState(false);
  const [isRewards, setIsRewards] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

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
    try {
      await setDoc(doc(db, "users", "personal1"), userInfo); // Use your document ID
      console.log('User info saved:', userInfo);
      speak('User information has been saved.');
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user info: ", error);
    }
  };

  const toggleUserInfo = () => setIsUserInfo(!isUserInfo);
  const togglePoints = () => setIsPoints(!isPoints);
  const toggleRewards = () => setIsRewards(!isRewards);
  const toggleNotifications = () => setIsNotifications(!isNotifications);

  // Improved audio navigation function
  const speak = (message) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 1; // Speed of the voice
      utterance.pitch = 1; // Pitch of the voice
      utterance.volume = 1; // Volume level
      synth.speak(utterance);
      console.log('Speaking:', message);
    } else {
      console.error('SpeechSynthesis API not supported in this browser.');
    }
  };

  useEffect(() => {
    // Speak when the profile page is loaded
    speak('Welcome to the profile page.');

    const handleNavigation = (e) => {
      const target = e.target;
      if (target.tagName === 'BUTTON') {
        speak(`You clicked ${target.innerText}`);
      }
      if (target.tagName === 'A') {
        speak(`Navigating to ${target.innerText}`);
      }
    };

    window.addEventListener('click', handleNavigation);

    const fetchUserInfo = async () => {
      try {
        const docRef = doc(db, "users", "user1"); // Use your document ID
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user info: ", error);
      }
    };

    fetchUserInfo();

    return () => {
      window.removeEventListener('click', handleNavigation);
    };
  }, []);

  return (
    <main>
      <Container className='container'>
        <Title order={1}><strong>Profile Page</strong></Title>

        {/* User Info Section */}
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
