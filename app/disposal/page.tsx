'use client';

import React,{ useRef } from "react";
import { useDisclosure } from '@mantine/hooks';
import { Button, Text, Table, Container, Paper, Group, Title, Grid, Drawer, Box, } from "@mantine/core";
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Drawer.css';

import "../disposal/styles.css";
import GoogleMaps from "../components/GoogleMaps";

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

    const tableRef = useRef(null); // Create a ref for the table
  
    // Function to scroll to the table
    const scrollToTable = () => {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const rows = elements.map((element) => (
      <Table.Tr key={element.Holiday}>
        <Table.Td>{element.Holiday}</Table.Td>
        <Table.Td>{element.Date}</Table.Td>
        <Table.Td>{element.East}</Table.Td>
        <Table.Td>{element.Spyhill}</Table.Td>
        <Table.Td>{element.Shepard}</Table.Td>
      </Table.Tr>
    ));

    const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container component="main">
      <Title component="h2">Waste Management and Recycling Locations</Title>

      <div className="scroll-buttons">
            <button onClick={scrollToTable} className="scroll-button">
              View Holiday Hours
            </button>
          </div>

      <div className="flex-container">
        <div className="locations-container">
          <div className="div-container">
            <Title component="h1">East Calgary Landfill and Eco Centre</Title>
            <Text component="p">Materials Accepted:</Text>
            <Drawer className="drawer" position="right" size='xl' opened={opened} onClose={close} withCloseButton={false}>
        {<Box className="drawer-content">
          <Title>Residential Waste</Title>
          </Box>}
      </Drawer>

      <Button className="button" onClick={open}>Residential Waste</Button>
            <br />
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
            <br />
            <Text component="p">Address:</Text>
            <Text className="address">3020 68 Street SE</Text>
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
            <br />
            <Text component="p">Address:</Text>
            <Text className="address">11808 69 Street NW</Text>
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
            <br />
            <Text component="p">Address:</Text>
            <Text className="address">12111 68 Street SE</Text>
          </div>
        </div>

        <div className="map-container">
          <GoogleMaps />
        </div>
      </div>

      <Title component="h2">Holiday Hours</Title>

      <Table ref={tableRef} className="table-container" stickyHeader stickyHeaderOffset={60}>
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

    </Container>
  );
}
