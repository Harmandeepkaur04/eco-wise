"use client";
import React from 'react';
import { ThemeProvider } from './darkmode/page'; // Adjust the path as necessary
import localFont from "next/font/local";
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <ThemeProvider>
            <MantineProvider withGlobalStyles withNormalizeCSS>
              {/* AudioProvider can wrap around specific components that require audio context */}
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
