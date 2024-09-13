"use client"
import React from 'react';
import Link from 'next/link';
import '../Index/style.css';


export default function Index(){

    return (
        <main>
        <header>
            <nav>
                <ul>
                {/* <h1>EcoWise</h1> */}
                    <li><Link href="/Home">Home</Link></li>
                    <li><Link href="/recycle-page">Recycle</Link></li>
                    <li><Link href="/disposal">Disposal 
                    </Link></li>
                    <li><Link href="/rewards-page">Rewards</Link></li>
                    <li><Link href="/calendar">Calendar</Link></li>
                    <li><Link href="/profile">Profile</Link></li>
                </ul> 
                </nav>    
        </header>

        <div className='recycle'>
            <h2>Why to Recycle?</h2>
            <p>
            Recycling is vital for conserving resources, reducing waste, and minimizing environmental impact. It decreases pollution, lowers energy use, and reduces the strain on landfills.<br></br> By recycling, we contribute to a more sustainable future, protecting ecosystems and promoting responsible waste management
            <img src='/img.jpg'/>
            </p>
        </div>

        <div className='content'>
            <h2>3 Million</h2>
            <p>
            tonnes of plastic waste are generated annually in Canada, with only about 9% of it being recycled.
            </p>

            <h2>$5.5 Billion</h2>
            <p>
            is the contribution of the recycling industry to the Canadian economy.
            </p>
        </div>

        <div className='About'>
            <h2>Beyond Recycling </h2>
            <p>
            At ECO WISE, we go beyond recycling to support a sustainable future. Here's how we make a difference:
            </p>
        
            <div className='container'>
            <div className='test'>        
                <p> Recycling Information</p>
            </div>
            <div className='test'>
                <p>Local Disposal Center Locator </p>
            </div> 
            <div className='test'>
                <p>Educational Resources</p>
            </div>
            <div className='test'>
                    <p>Community Engagement</p>
            </div>    
        </div>
        </div>

        <div className='graph'>
            <img src='/graph.png'/>
            <div>
            <h2>Canada’s Recycling Revolution: A Snapshot of Efforts</h2>
            <p>
                Canada is committed to reducing waste, reusing materials, and composting, showcasing its dedication to sustainability and resource conservation.
            </p>
            </div>
        </div>


    <section class="team-section">
        <h1>Meet Our Team</h1>
        <div class="team-container">
            <div class="team-member">
                <img src="/image3.jpeg" />
                <h3>John Doe</h3>
                <p>CEO</p>
            </div>
            <div class="team-member">
                <img src="/image4.jpeg" />
                <h3>Jane Smith</h3>
                <p>Lead Developer</p>
            </div>
            <div class="team-member">
                <img src="/image5.jpeg" />
                <h3>Michael Johnson</h3>
                <p>Manager</p>
            </div>
        </div>
    </section>

  <footer className='footer'>
    <div className='footer-about'>
        <h4>About</h4>
        <p>
        Launched in 2024, our recycling website helps people adopt sustainable practices by providing nearby disposal centers and educational resources, making recycling easy and accessible for a greener future.
        </p>
    </div>
    <div className='footer-contact'>
        <h4>Contact Us</h4>
        <p>Email: info@recyclingwebsite.com</p>
        <p>Phone: +1-234-567-890</p>
        <p>Address: 123 Eco St, Green City, AB</p>
        </div>

        <div className='footer-social'>
        <h4>Follow Us</h4>
        <a href="#"><img src="/path-to-your-icons/facebook-icon.png" alt="Facebook" /></a>
        <a href="#"><img src="/path-to-your-icons/twitter-icon.png" alt="Twitter" /></a>
        <a href="#"><img src="/path-to-your-icons/instagram-icon.png" alt="Instagram" /></a>
        </div>
  
        <div className='footer-bottom'>
            <p>&copy; 2024 Recycling Website. All rights reserved.</p>
    </div>
    </footer>
    </main>
    );
};
