"use client"
import React from 'react';
import '../profile/styles.css';
import Link from 'next/link';
import { useState } from 'react';
export default function ProfilePage() {
    const [userInfo] = useState({
        name: 'Ben Stoks',  
        email: 'ben@example.com', 
        address: '123 green Street, Alberta, Canada', 
      });

  const [points] = useState(150); 

  const [notifications] = useState([
    'Reminder: Drop off your recyclables at the nearest center today!',
    'New event: Community cleanup drive on Saturday!'
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
    <header>
            <nav>
                <ul>
                    <li><Link href="/recycle-page">Recycle</Link></li>
                    <li><Link href="/disposal">Disposal</Link></li>
                    <li><Link href="/rewards-page">Rewards</Link></li>
                    <li><Link href="/calendar">Calendar</Link></li>
                    <li><Link href="/profile">Profile</Link></li>
                </ul> 
                </nav>    
        </header>

    <div className='container'>
      <h1><strong>Profile Page</strong></h1>
      
      {/* User Info Section */}
      <div className='infoSection' >
        <h3 onClick={toggleUserInfo} style={{cursor:'pointer'}}>User Information</h3>

        {isUserInfo && (

        <div>
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Address:</strong> {userInfo.address}</p>
      </div>
        )}
      </div>

        <div  className='infoSection' >
          <h3 onClick={togglePoints} style={{cursor:'pointer'}}>Points Earned</h3>
          {isPoints && (
          <div>
          <p>{points} points</p>
          </div>
          )}
          
        </div>
      
        <div  className='infoSection'>
          <h3 onClick={toggleRewards} style={{cursor:'pointer'}}>See Your Rewards</h3>
          {isRewards && (
          <div>
          <p>Check your reward status based on the points earned.</p>
          </div>
          )}
        </div>

        <div  className='infoSection'>
          <h3 onClick={toggleNotifications} style={{cursor:'pointer'}}>Notifications</h3>
          {isNotifications &&(
          <div>
          <ul>
            {notifications.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
          </div>
        )}
        </div>

        <div className='button'>
          <button onClick={() => alert('Signed out!')}>Sign Out</button>
        </div>
      </div>

    </main>
  );
}