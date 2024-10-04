"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Container, Title, Text, Group, Button, List, ThemeIcon } from '@mantine/core';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { IconCheck } from '@tabler/icons-react';
import '../profile/styles.css';

export default function ProfilePage() {
  const [userInfo] = useState({
    name: 'Ben Stoks',
    email: 'ben@example.com',
    address: '123 green Street, Alberta, Canada',
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

  const toggleUserInfo = () => {
    setIsUserInfo(!isUserInfo);
  };

  const togglePoints = () => {
    setIsPoints(!isPoints);
  };

  const toggleRewards = () => {
    setIsRewards(!isRewards);
  };

  const toggleNotifications = () => {
    setIsNotifications(!isNotifications);
  };

  return (
    <main>
      

      <Container className='container'>
        <Title order={1}><strong>Profile Page</strong></Title>

        {/* User Info Section */}
        <div className='infoSection'>
          <Title order={3} onClick={toggleUserInfo} style={{ cursor: 'pointer' }}>User Information</Title>
          {isUserInfo && (
            <div>
              <Text><strong>Name:</strong> {userInfo.name}</Text>
              <Text><strong>Email:</strong> {userInfo.email}</Text>
              <Text><strong>Address:</strong> {userInfo.address}</Text>
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
          <Button onClick={() => alert('Signed out!')}>Sign Out</Button>
        </Group>
      </Container>
    </main>
  );
}
