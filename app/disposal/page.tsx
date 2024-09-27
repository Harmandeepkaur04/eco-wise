import React from "react";
import {
  Button,
  Text,
  Table,
  Container,
  Paper,
  Group,
  Title,
  Grid,
} from "@mantine/core";
import "../disposal/styles.css";
import GoogleMaps from "../components/GoogleMaps";

export default function Disposal() {
  return (
    <Container component="main">
      <Title component="h2">Waste Management and Recycling Locations</Title>

      <div className="flex-container">
        <div className="locations-container">
          <div className="div-container">
            <Title component="h1">East Calgary Landfill and Eco Centre</Title>
            <Text component="p">Materials Accepted:</Text>
            <ul>
              <li>Residential Waste</li>
              <li>Commercial Waste</li>
            </ul>
            <Text component="p">Hours of Operation (April - October):</Text>
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

          <div className="div-container">
              <Title component="h1">Spyhill Landfill and Eco Centre</Title>
              <Text component="p">Materials Accepted:</Text>
              <ul>
                <li>Residential Waste</li>
                <li>Commercial Waste</li>
              </ul>
              <br />
              <Text component="p">Hours of Operation (Year Round):</Text>
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
        </div>

        <div className="map-container">
          <GoogleMaps />
        </div>
      </div>
    </Container>
  );
}
