// app/layout.js or app/layout.jsx
import React from 'react';
import localFont from "next/font/local";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { MantineProvider } from '@mantine/core'; // Import MantineProvider
import Link from 'next/link'; // Import Link for navigation
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            {/* Header */}
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

            {/* Main Content */}
            <main className="main-content">
              {children}
            </main>
          </MantineProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
