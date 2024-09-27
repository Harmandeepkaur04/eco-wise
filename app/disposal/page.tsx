import React from 'react';
import { Button, Text, Table, Container, Paper, Group, Title, Grid } from '@mantine/core';
import "../disposal/styles.css";
import GoogleMaps from "../components/GoogleMaps";


export default function Disposal (){

  return (
    <Container component="main">
      <Title component="h2">
        Waste Management and Recycling Locations
      </Title>

            <div className='flex-container'>
              <Title>East Calgary Landfill and Eco Centre</Title>
              <Text>Materials Accepted:</Text>
              <ul>
                <li>Residential Waste</li>
                <li>Commercial Waste</li>
              </ul>
              <Text>Hours of Operation (April - October):</Text>
              <ul>
                <li>Monday: 6 am - 5 pm</li>
                <li>Tuesday: 6 am - 5 pm</li>
                <li>Wednesday: 6 am - 5 pm</li>
                <li>Thursday: 6 am - 5 pm</li>
                <li>Friday: 6 am - 5 pm</li>
                <li>Saturday: 7:30 am - 5 pm</li>
                <li>Sunday: 7:30 am - 5 pm</li>
              </ul>

              <div className="map-container">
                <GoogleMaps />
              </div>
            </div>  
    </Container>
  )

}