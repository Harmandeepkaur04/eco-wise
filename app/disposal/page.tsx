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

          <div className="div-container">
            <Title component="h1">Shepard Landfill and Eco Centre</Title>
            <Text component="p">Materials Accepted:</Text>
            <ul>
              <li>Residential Waste</li>
              <li>
                No Commercial Waste except for Clean Fill and Industrial Waste -
                Permits and Appointments may be required.
              </li>
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

      <Title component="h2">Holiday Hours</Title>

      <Table className="table-container">
        <thead>
          <tr>
            <th>Holiday</th>
            <th>2024 Dates</th>
            <th>East Calgary</th>
            <th>Spyhill</th>
            <th>Shepard</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>New Year's Day</td>
              <td>Jan 1</td>
              <td>CLOSED</td>
              <td>CLOSED</td>
              <td>CLOSED</td>
            </tr>
            <tr>
              <td>Family Day</td>
              <td>Feb 19</td>
              <td>OPEN</td>
              <td>OPEN</td>
              <td>OPEN</td>
            </tr>
            <tr>
              <td>Good Friday</td>
              <td>Mar 29</td>
              <td>OPEN</td>
              <td>OPEN</td>
              <td>OPEN</td>
            </tr>
            <tr>
              <td>Easter Sunday</td>
              <td>Mar 31</td>
              <td>CLOSED</td>
              <td>CLOSED</td>
              <td>CLOSED</td>
            </tr>
            <tr>
              <td>Easter Monday</td>
              <td>Apr 1</td>
              <td>OPEN</td>
              <td>OPEN</td>
              <td>OPEN</td>
            </tr>
            <tr>
              <td>Victoria Day</td>
              <td>May 20</td>
              <td>OPEN</td>
              <td>OPEN</td>
              <td>OPEN</td>
            </tr>
            <tr>
              <td>Canada Day</td>
              <td>July 1</td>
              <td>OPEN</td>
              <td>OPEN</td>
              <td>OPEN</td>
            </tr>
            <tr>
              <td>Heritage Day</td>
              <td>Aug 5</td>
              <td>OPEN</td>
              <td>OPEN</td>
              <td>OPEN</td>
            </tr>
        </tbody>
      </Table>
    </Container>
  );
}
