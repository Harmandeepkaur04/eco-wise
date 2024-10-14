import React from "react";
import { AudioProvider } from './Audio';
import Index from "./index/page";


export default function Home() {
  return (
   <AudioProvider>
    <Index/>
   </AudioProvider>
  );
}
