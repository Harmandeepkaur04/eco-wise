"use client"
import React from 'react';
import '../profile/styles.css';
import Link from 'next/link';
import { useState } from 'react';

export default function ProfilePage() {

    const [userInfo, setUserInfo] = useState({
        name: 'Simranjot Kaur Bal',  // Replace with actual user info
        email: 'simran@example.com', // Replace with actual user info
        address: '123 Green Street, Alberta, Canada', // Replace with actual user info
      });

  const [points, setPoints] = useState(150); // Assume user has 150 points for demonstration
  const [notifications, setNotifications] = useState([
    'Reminder: Drop off your recyclables at the nearest center today!',
    'New event: Community cleanup drive on Saturday!'
  ]);

  return (
    <main>
    <header>
            <nav>
                <ul>
                    <li><Link href="/recycle-page">Recycle</Link></li>
                    <li><Link href="/disposal">Disposal 
                    </Link></li>
                    <li><Link href="/rewards-page">Rewards</Link></li>
                    <li><Link href="/calendar">Calendar</Link></li>
                    <li><Link href="/profile">Profile</Link></li>
                </ul> 
                </nav>    
        </header>

    
    <div className='container'>
    
      <h1>Profile Page</h1>
      
      {/* User Info Section */}
      <div className='userInfoSection' >
        <h3>User Information</h3>
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Address:</strong> {userInfo.address}</p>
      </div>

   
      
      <div className='infoSection'>
        <div  className='option' >
          <h3>Points Earned</h3>
          <p>{points} points</p>
        </div>
        <div  className='option'>
          <h3>See Your Rewards</h3>
          <p>Check your reward status based on the points earned.</p>
        </div>
        <div  className='option'>
          <h3>Notifications</h3>
          <ul>
            {notifications.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
        <div className='button'>
          
          <button onClick={() => alert('Signed out!')}>Sign Out</button>
        </div>
      </div>

      
    </div>
    </main>
  );
}