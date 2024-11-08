// pages/index.js
import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <Link href="/invite">
        Invite Your Friends
      </Link>
    </div>
  );
};

export default Home;
