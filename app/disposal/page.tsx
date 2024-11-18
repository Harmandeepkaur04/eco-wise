'use client';
import React, { useRef, useState, useEffect } from "react";
import { Button, Text, Table, Container, ScrollArea, Title, Box, Stack, TextInput, Select } from "@mantine/core";
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Drawer.css';
import "../disposal/styles.css";
import { DatePicker } from '@mantine/dates';
import GoogleMaps from "../components/GoogleMaps";
import Drawers from "../components/Drawer";
import ShepardDrawers from "../components/ShepardDrawer";
import { loadStripe } from '@stripe/stripe-js';
import '@mantine/dates/styles.css';
import { useAudio } from '../Audio'; 
import {FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');


const elements = [
  { Holiday: "New Year's Day", Date: 'Jan 1', East: 'CLOSED', Spyhill: 'CLOSED', Shepard: 'CLOSED' },
  { Holiday: "Family Day", Date: 'Feb 19', East: 'OPEN', Spyhill: 'OPEN', Shepard: 'OPEN' },
  { Holiday: 'Good Friday', Date: 'Mar 29', East: 'OPEN', Spyhill: 'OPEN', Shepard: 'OPEN' },
  { Holiday: 'Easter Sunday', Date: 'Mar 31', East: 'CLOSED', Spyhill: 'CLOSED', Shepard: 'CLOSED' },
  { Holiday: 'Easter Monday', Date: 'Apr 1', East: 'OPEN', Spyhill: 'OPEN', Shepard: 'OPEN' },
  { Holiday: 'Victoria Day', Date: 'May 20', East: 'OPEN', Spyhill: 'OPEN', Shepard: 'OPEN' },
  { Holiday: 'Canada Day', Date: 'Jul 1', East: 'OPEN', Spyhill: 'OPEN', Shepard: 'OPEN' },
  { Holiday: 'Heritage Day', Date: 'Aug 5', East: 'OPEN', Spyhill: 'OPEN', Shepard: 'OPEN' },
  { Holiday: 'Labour Day', Date: 'Sept 2', East: 'OPEN', Spyhill: 'OPEN', Shepard: 'OPEN' },
  { Holiday: 'National Day for Truth & Reconciliation', Date: 'Sept 30', East: 'OPEN', Spyhill: 'OPEN', Shepard: 'OPEN' },
  { Holiday: 'Thanksgiving Day', Date: 'Oct 14', East: 'OPEN', Spyhill: 'OPEN', Shepard: 'OPEN' },
  { Holiday: 'Remembrance Day', Date: 'Nov 11', East: 'OPEN', Spyhill: 'OPEN', Shepard: 'OPEN' },
  { Holiday: 'Christmas Day', Date: 'Dec 25', East: 'CLOSED', Spyhill: 'CLOSED', Shepard: 'CLOSED' },
  { Holiday: 'Boxing Day', Date: 'Dec 26', East: 'OPEN', Spyhill: 'OPEN', Shepard: 'OPEN' },
  { Holiday: "New Year's Day (2025)", Date: 'Jan 1', East: 'CLOSED', Spyhill: 'CLOSED', Shepard: 'CLOSED' },
];

export default function Disposal() {

const [pickupDate, setPickupDate] = useState<Date | null>(null);
const [address, setAddress] = useState<string>('');

const handlePayment = async () => {
  if (!pickupDate || !address) {
    alert('Please fill out all fields before booking.');
    return;
  }

  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });

  const { sessionId } = await response.json();

  const stripe = await stripePromise;
  if (stripe) {
    await stripe.redirectToCheckout({ sessionId });
  }
};

const handleBooking = () => {
  if (!pickupDate || !address) {
    alert("Please fill out all fields before booking.");
  } else {
    alert("Pickup appointment booked!");
    // Proceed with booking logic
  }
};


  const [activeContent, setActiveContent] = useState('locations');

  const renderContent = () => {
    switch (activeContent) {
      case 'locations':
        return (
          <Box className="content-container">
            <ScrollArea className="locations-container">
              <div className="div-container">
                <Title component="h1">East Calgary Landfill and Eco Centre</Title>
                <br />
                <Text component="p">Materials Accepted:</Text>
                <Drawers /><br />
                <Text component="p">Hours of Operation (April - October):</Text>
                <ul>
                  <li>Monday: 6 am - 5 pm...</li>
                  <li>Tuesday: 6 am - 5 pm</li>
                  <li>Wednesday: 6 am - 5 pm</li>
                  <li>Thursday: 6 am - 5 pm</li>
                  <li>Friday: 6 am - 5 pm</li>
                  <li>Saturday: 7:30 am - 5 pm</li>
                  <li>Sunday: 7:30 am - 5 pm</li>
                </ul><br />
                <Text className="address">Address: 3020 68 Street SE</Text>
              </div><br />
              <div className="div-container">
                <Title component="h1">Spyhill Landfill and Eco Centre</Title>
                <br />
                <Text component="p">Materials Accepted:</Text>
                <Drawers /><br />
                <Text component="p">Hours of Operation (Year Round):</Text>
                <ul>
                  <li>Monday: 7:30 am - 5 pm</li>
                  <li>Tuesday: 7:30 am - 5 pm</li>
                  <li>Wednesday: 7:30 am - 5 pm</li>
                  <li>Thursday: 7:30 am - 5 pm</li>
                  <li>Friday: 7:30 am - 5 pm</li>
                  <li>Saturday: 7:30 am - 5 pm</li>
                  <li>Sunday: CLOSED</li>
                </ul><br />
                <Text className="address">Address: 11808 69 Street NW</Text>
              </div>
              <br />
              <div className="div-container">

            <Title component="h1">Shepard Landfill and Eco Centre</Title><br />
            <Text component="p">Materials Accepted:</Text>
            <div>
              <ShepardDrawers />
            </div><br />
            <Text component="p">Hours of Operation (Year Round):</Text>
            <ul>
              <li>Monday: 7:30 am - 5 pm</li>
              <li>Tuesday: 7:30 am - 5 pm</li>
              <li>Wednesday: 7:30 am - 5 pm</li>
              <li>Thursday: 7:30 am - 5 pm</li>
              <li>Friday: 7:30 am - 5 pm</li>
              <li>Saturday: 7:30 am - 5 pm</li>
              <li>Sunday: CLOSED</li>
            </ul> <br />
            <Text className="address">Address: 12111 68 Street SE</Text>
          </div>
          </ScrollArea>
            <Box className="map-section">
              <GoogleMaps />
            </Box>
          </Box>
        );
      case 'information':
        return (
          <ScrollArea className="scrollable-section">
            <div className="div-container-2">
        <Title className="div-2-title">Why use an Eco Centre?</Title>
        <Text className="div-2-txt">It is a convenient way to recycle, reuse and dispose of your old and unwanted household items. 
          The user-friendly locations makes it safe and easy to drop off materials. 
          They accept a wide range of items you can't dispose of in your carts at home. 
          By bringing your sorted materials to the Eco Centre, you will help keep more materials out of the landfill that could still be reused or recycled in a different way.</Text>
          <br />
        <Title className="div-2-title">For reusable and recyclable materials:</Title>
        <Text className="div-2-txt">Electronics, gently used furniture and other items can find a new life when brought to the Eco Centres.</Text>
        <br />
        <Title className="div-2-title">For hazardous materials:</Title>
        <Text className="div-2-txt">Chemicals, batteries, and other items that require safe disposal to protect your family, home and the environment.</Text>
        <br />
        <Title className="div-2-title">For oversized and large quantities of household waste:</Title>
        <Text className="div-2-txt">Got a major decluttering project or a home reno on your hands? 
          Eco Centres offer a responsible solution for disposing of construction materials, mattresses, 
          and large amounts of household waste.</Text>

      </div>
          </ScrollArea>
        );
      case 'holiday-schedule':
        return (
          <ScrollArea className="scrollable-section">
            <Table className="holiday-table">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Holiday</Table.Th>
          <Table.Th>2024 Dates</Table.Th>
          <Table.Th>East Calgary</Table.Th>
          <Table.Th>Spyhill</Table.Th>
          <Table.Th>Shepard</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
          </ScrollArea>
        );
        case 'booking':
        return (
          <Box className="booking-form">
  <Title order={3}>Book a Pickup Appointment</Title>

  <label className="form-label" htmlFor="pickup-date">Select Pickup Date</label>
  <DatePicker 
    id="pickup-date"
    value={pickupDate}
    onChange={setPickupDate}
    />

  <label className="form-label" htmlFor="pickup-address">Pickup Address</label>
  <TextInput
    id="pickup-address"
    placeholder="Enter your address"
    value={address}
    onChange={(e) => setAddress(e.currentTarget.value)}
  />

  <Button className="book-button" onClick={handlePayment}>Book & Pay</Button>
</Box>


        );
          case 'collection-tracker':
        return (
          <ScrollArea className="scrollable-section">
            <Box className="collection-tracker">
              <Title order={3}>Collection Tracker</Title>
              <Text>This section tracks your waste collection and recycling progress.</Text>
              <Text>View collection dates, types of waste collected, and your recycling stats.</Text>
              {/* Add more detailed components for tracking as needed */}
            </Box>
          </ScrollArea>
        );
      default:
        return null;
    }
  };


  //---------------------------------------------------------------------------------------------------------------

     // State for audio functionality
  const [isAudioOn, setIsAudioOn] = useState(true);
  
  // Function to toggle audio
  const toggleAudio = () => {
    setIsAudioOn((prev) => !prev);
  };

  // Audio speak function
  const speak = (message) => {
    if (isAudioOn) {
      const speech = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(speech);
    }
  };

  // Use effect for welcome message
  useEffect(() => {
    speak('Welcome to the Disposal page. Here you can nereby recycling locations,their contacts and hours of operation.');
  }, [isAudioOn]); // Trigger when isAudioOn changes
  
    //Constant for table
    const rows = elements.map((element) => (
      <Table.Tr key={element.Holiday}>
        <Table.Td>{element.Holiday}</Table.Td>
        <Table.Td>{element.Date}</Table.Td>
        <Table.Td>{element.East}</Table.Td>
        <Table.Td>{element.Spyhill}</Table.Td>
        <Table.Td>{element.Shepard}</Table.Td>
      </Table.Tr>
    ));

return (
  <Container className="main-container">
    {/* Title component at the top */}
    <Title order={2} className="main-title">Waste Management and Recycling Locations</Title>

    {/* Main content container for side-by-side layout */}
    <Box className="main-content">
      {/* Left side: Navigation buttons */}
      <Stack className="button-container">
        <Button className="nav-button" onClick={() => setActiveContent('locations')}>Locations</Button>
        <Button className="nav-button" onClick={() => setActiveContent('information')}>Information</Button>
        <Button className="nav-button" onClick={() => setActiveContent('holiday-schedule')}>Holiday Schedule</Button>
        <Button className="nav-button" onClick={() => setActiveContent('booking')}>Book Pickup</Button>
        <Button className="nav-button" onClick={() => setActiveContent('collection-tracker')}>Collection Tracker</Button>
        <Button onClick={toggleAudio} className="audio-button">
          {isAudioOn ? 'Mute Audio' : 'Unmute Audio'}
        </Button>
      </Stack>

      {/* Right side: Content box */}
      <Box className="content-box">
        {renderContent()}
      </Box>
    </Box>
  </Container>
);

}
