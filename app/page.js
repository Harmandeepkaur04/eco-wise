import React from "react";
import { AudioProvider } from './.app/Audio';
import Index from "./index/page";


export default function Home() {
  return (
   <AudioProvider>
    <Index/>
   </AudioProvider>
  );
}
