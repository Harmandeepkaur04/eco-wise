"use client";
import React from 'react';
import { ThemeProvider } from './darkmode/page'; // Adjust the path as necessary
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { MantineProvider } from '@mantine/core';
import Link from 'next/link';
import { AudioProvider } from './Audio'; // Adjust the path as necessary
import './globals.css';

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
    <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: '#f0f0f0' }}>
      <Link href="/">Home</Link>
      <Link href="/recycle-page">Recycle</Link>
      <Link href="/rewards-page">Rewards</Link>
      <Link href="/disposal">Disposal</Link>
      <Link href="/calendar">Calendar</Link>
      <Link href="/profile">Profile</Link>
    </nav>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <ThemeProvider>
            <MantineProvider withGlobalStyles withNormalizeCSS>
              <Navbar />
              <AudioProvider>
                {children}
              </AudioProvider>
            </MantineProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
