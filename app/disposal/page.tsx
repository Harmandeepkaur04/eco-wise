import React from 'react';
import '../disposal/styles.css';
import GoogleMaps from '../components/GoogleMaps';
import Link from 'next/link';

export default function Disposal (){

    return <>
    <main>
        <header>
            <nav>
                <ul>
                {/* <h1>EcoWise</h1> */}
                    <li><Link href="/Index">Home</Link></li>
                    <li><Link href="/recycle-page">Recycle</Link></li>
                    <li><Link href="/disposal">Disposal 
                    </Link></li>
                    <li><Link href="/rewards-page">Rewards</Link></li>
                    <li><Link href="/calendar">Calendar</Link></li>
                    <li><Link href="/profile">Profile</Link></li>
                </ul> 
                </nav>    
        </header>
    <div>
        <h2>Waste Management and Recycling Locations</h2>
    </div>
    <GoogleMaps />
    </main>
    </>
    

}