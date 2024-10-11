"use client";
import React from "react";
import Index from "./index/page";
import { useTheme } from "./darkmode/page";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main>
      <div className={theme}>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'dark' : 'light'} theme
        </button>
        <p>The current theme is {theme}</p>
      </div>
      <Index />
    </main>
  );
}
