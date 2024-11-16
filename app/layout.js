"use client";
import React from 'react';
import { ThemeProvider } from './darkmode/page'; // Adjust the path as necessary
import localFont from "next/font/local";
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import { useRouter } from 'next/router';
import { MantineProvider } from '@mantine/core';
import Link from 'next/link';
import { AudioProvider } from './Audio'; // Adjust the path as necessary
import './globals.css';
import ThemeToggle, { useTheme } from "./darkmode/page";
import ChatProvider from './chatprovider/page';


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

// Navbar component
const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: '#EBFADC' }}>
      <Link href="/">Home</Link>
      <Link href="/recycle-page">Recycle</Link>
      <Link href="/rewards-page">Rewards</Link>
      <Link href="/disposal">Disposal</Link>
      <Link href="/calendar">Calendar</Link>
      <Link href="/profile">Profile</Link>
    <ThemeToggle/>
    </nav>
  );
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <ChatProvider>
    <html lang="en">
      <body>
      <header className="header-container">
            <h1 className="header">Eco Wise</h1>
            <div className="user-button-container">
              <UserButton showName />
            </div>
          </header>
          <SignedOut>
            <SignIn routing="hash" />
          </SignedOut>
          <SignedIn>
          <ThemeProvider>
            <MantineProvider withGlobalStyles withNormalizeCSS>
              <Navbar />
              <AudioProvider>
                {children}
              </AudioProvider>
            </MantineProvider>
          </ThemeProvider>
          </SignedIn>
      </body>
    </html>
    </ChatProvider>
    </ClerkProvider>
  );
}
