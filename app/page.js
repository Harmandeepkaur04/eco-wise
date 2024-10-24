"use client";
import React from "react";
import { AudioProvider } from './Audio';
import Index from "./index/page";
import ThemeToggle, { useTheme } from "./darkmode/page";

export default function Home() {
  const { theme } = useTheme();

  return (
    <main>
      <div className={theme}>
        <ThemeToggle/>
        <p>The current theme is {theme}</p>
      </div>
      <Index />
    </main>

  );
}
