"use client";
import React from "react";
import { AudioProvider } from './Audio';
import Index from "./index/page";


import { useTheme } from "./darkmode/page"; // Using the imported useTheme

export default function Home() {
  const { theme, toggleTheme } = useTheme(); // Using the hook from darkmode/page

  return (
    <div>
      
      <button onClick={toggleTheme}>
        Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <Index/>
      
    </div>
    
  );
}
