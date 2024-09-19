import React from 'react';
import '../disposal/styles.css';
import GoogleMaps from '../components/GoogleMaps';
import Link from 'next/link';

export default function Disposal (){

    return <>
    <main>
    
    <div>
        <h1>Waste Management and Recycling Locations:</h1>
    </div>
    
    <div className='flex-container'>
        <div className='div-container'>
            <h1>East Calgary Landfill and Eco Centre</h1>
            <p>Materials Accepted:</p>
            <ul>
                <li>Residential Waste</li>
                <li>Commercial Waste</li>
            </ul>
            <br />
            <p>Hours of Operation (April - October):</p>
            <ul>
                <li>Monday: 6 am - 5 pm</li>
                <li>Tuesday: 6 am - 5 pm</li>
                <li>Wednesday: 6 am - 5 pm</li>
                <li>Thursday: 6 am - 5 pm</li>
                <li>Friday: 6 am - 5 pm</li>
                <li>Saturday: 7:30 am - 5 pm</li>
                <li>Sunday: 7:30 am - 5 pm</li>
            </ul>
        </div>

        <div className='div-container'>
            <h1>Spyhill Landfill and Eco Centre</h1>
            <p>Materials Accepted:</p>
            <ul>
                <li>Residential Waste</li>
                <li>Commercial Waste</li>
            </ul>
            <br />
            <p>Hours of Operation (Year Round):</p>
            <ul>
                <li>Monday: 7:30 am - 5 pm</li>
                <li>Tuesday: 7:30 am - 5 pm</li>
                <li>Wednesday: 7:30 am - 5 pm</li>
                <li>Thursday: 7:30 am - 5 pm</li>
                <li>Friday: 7:30 am - 5 pm</li>
                <li>Saturday: 7:30 am - 5 pm</li>
                <li>Sunday: CLOSED</li>
            </ul>
        </div>

        <div className='div-container'>
            <h1>Shepard Landfill and Eco Centre</h1>
            <p>Materials Accepted:</p>
            <ul>
                <li>Residential Waste</li>
                <li>No Commercial Waste except for Clean Fill and Industrial Waste - Permits and Appointments may be required.</li>
            </ul>
            <br />
            <p>Hours of Operation (Year Round):</p>
            <ul>
                <li>Monday: 7:30 am - 5 pm</li>
                <li>Tuesday: 7:30 am - 5 pm</li>
                <li>Wednesday: 7:30 am - 5 pm</li>
                <li>Thursday: 7:30 am - 5 pm</li>
                <li>Friday: 7:30 am - 5 pm</li>
                <li>Saturday: 7:30 am - 5 pm</li>
                <li>Sunday: CLOSED</li>
            </ul>
        </div>
        <GoogleMaps />
    </div>
    </main>
    </>
}
