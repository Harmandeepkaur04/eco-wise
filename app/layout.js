// app/layout.js or app/layout.jsx
import React from 'react';
import localFont from "next/font/local";

import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (

    <ClerkProvider>
    
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
       
        <header className="header-container">
            <h1 className="header">Eco Wise</h1>
            <nav>
              <ul className="nav-links">
                <li><Link href="/Home">Home</Link></li>
                <li><Link href="/recycle-page">Recycle</Link></li>
                <li><Link href="/disposal">Disposal</Link></li>
                <li><Link href="/rewards-page">Rewards</Link></li>
                <li><Link href="/calendar">Calendar</Link></li>
                <li><Link href="/profile">Profile</Link></li>
              </ul>
            </nav>
            <div className="user-button-container">
              <UserButton showName />
            </div>
        </header>
        <SignedOut>
          <div className="sign-in-container">
            <SignIn routing="hash" />
          </div>
        </SignedOut>

        <nav>
                <ul>
                <h1>EcoWise</h1>
                    <li><Link href="/index">Home</Link></li>
                    <li><Link href="/recycle-page">Recycle</Link></li>
                    <li><Link href="/disposal">Disposal
                    </Link></li>
                    <li><Link href="/rewards-page">Rewards</Link></li>
                    <li><Link href="/calendar">Calender</Link></li>
                    <li><Link href="/profile">Profile</Link></li>
                </ul> 
                </nav>
        <SignedIn>
          {children}
        </SignedIn>
        
      </body>
    </html>
    </ClerkProvider>

  );
}
