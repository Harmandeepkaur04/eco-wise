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
    
    <div className='div-container'>
        <h1>East Calgary Landfill and Eco Centre</h1>
        <br />
        <h3>Information:</h3>
        <p>Materials accepted</p>
        <ul>
            <li>Residential Waste</li>
            <li>Commercial Waste</li>
        </ul>
    </div>
    
    <GoogleMaps />
    </main>
    </>
    

}