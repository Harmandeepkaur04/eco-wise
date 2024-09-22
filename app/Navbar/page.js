import Link from 'next/link';
export default function Navbar(){


    return(
        <main>
        <header>
           
            <nav>
           
                <ul>
                <h1>EcoWise</h1>
                    <li><Link href ="/Home">Home</Link></li>
                    <li><Link href="/recycle-page">Recycle</Link></li>
                    <li><Link href="/disposal">Disposal
                    </Link></li>
                    <li><Link href="/rewards-page">Rewards</Link></li>
                    <li><Link href="/calendar">Calendar</Link></li>
                    // <li><Link href="/profile">Profile</Link></li>
                </ul>
                </nav>    
        </header>
        </main>
    );
}
