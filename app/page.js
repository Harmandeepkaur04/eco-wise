import React from "react";
import Index from "./index/page";
import pool from "./utils/postgres";

export default function Home() {
  return (
   <main>
    <Index/>
    
   </main>
  );
}
