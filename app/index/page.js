"use client";
import React, { useState } from 'react';
import { Container, Title, Text, Image, Grid, Group, Input, Select } from '@mantine/core';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import '../Index/style.css';

export default function Index() {
  // Search bar state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  // Example data for dropdown (you can modify it to match your content)
  const searchOptions = [
    { value: 'why-recycle', label: 'Why Recycle' },
    { value: 'three-million', label: '3 Million' },
    { value: 'beyond-recycling', label: 'Beyond Recycling' },
    { value: 'canada-revolution', label: 'Canada Revolution' },
  ];

  // Filter options based on search term
  const filteredOptions = searchOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      {/* Search Bar Section */}
      <Container className="search-container">
        <Input
          placeholder="Search topics..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
        />
        <Select
          data={filteredOptions}
          placeholder="Select a section"
          value={selectedOption}
          onChange={setSelectedOption}
        />
      </Container>

      {/* Section 1: Why Recycle */}
      <Container id='why-recycle' className='recycle'>
        <Title order={2}>Why Recycle?</Title>
        <Text>
          Recycling is vital for conserving resources, reducing waste, and minimizing environmental impact. It decreases pollution, lowers energy use, and reduces the strain on landfills.
        </Text>
        <Image src='/img.jpg' alt='Recycling' />
      </Container>

      {/* Section 2: Three Million */}
      <Container id='three-million' className='content'>
        <Title order={2}>3 Million</Title>
        <Text>
          Tonnes of plastic waste are generated annually in Canada, with only about 9% of it being recycled.
        </Text>
      </Container>

      {/* Section 3: Beyond Recycling */}
      <Container id='beyond-recycling' className='About'>
        <Title order={2}>Beyond Recycling</Title>
        <Text>
          At ECO WISE, we go beyond recycling to support a sustainable future. Here's how we make a difference:
        </Text>

        <Grid className='container'>
          <Grid.Col span={12} className='test'>
            <Text>Recycling Information</Text>
          </Grid.Col>
          <Grid.Col span={6} className='test'>
            <Text>Local Disposal Center Locator</Text>
          </Grid.Col>
          <Grid.Col span={6} className='test'>
            <Text>Educational Resources</Text>
          </Grid.Col>
          <Grid.Col span={6} className='test'>
            <Text>Community Engagement</Text>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Section 4: Canada Revolution */}
      <Container id='canada-revolution' className='graph'>
        <Image src='/graph.png' alt='Graph' />
        <div>
          <Title order={2}>Canada’s Recycling Revolution: A Snapshot of Efforts</Title>
          <Text>
            Canada is committed to reducing waste, reusing materials, and composting, showcasing its dedication to sustainability and resource conservation.
          </Text>
        </div>
      </Container>

      {/* Team Section */}
      <section className="team-section">
        <Title order={1}>Meet Our Team</Title>
        <div className="team-container">
          <div className="team-member">
            <Image src="/image3.jpeg" alt="John Doe" />
            <Title order={3}>John Doe</Title>
            <Text>CEO</Text>
          </div>
          <div className="team-member">
            <Image src="/image4.jpeg" alt="Jane Smith" />
            <Title order={3}>Jane Smith</Title>
            <Text>Lead Developer</Text>
          </div>
          <div className="team-member">
            <Image src="/image5.jpeg" alt="Michael Johnson" />
            <Title order={3}>Michael Johnson</Title>
            <Text>Manager</Text>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Container className='footer'>
        <Container className='footer-about'>
          <Title order={4}>About</Title>
          <Text>
            Launched in 2024, our recycling website helps people adopt sustainable practices by providing nearby disposal centers and educational resources, making recycling easy and accessible for a greener future.
          </Text>
        </Container>
        <Container className='footer-contact'>
          <Title order={4}>Contact Us</Title>
          <Text>Email: info@recyclingwebsite.com</Text>
          <Text>Phone: +1-234-567-890</Text>
          <Text>Address: 123 Eco St, Green City, AB</Text>
        </Container>

        <Container className='footer-social'>
          <Title order={4}>Follow Us</Title>
          <Group>
            <FaFacebook className="icon facebook-icon" title="facebook" alt="Facebook" />
            <FaTwitter className="icon twitter-icon" title='twitter' />
          </Group>
        </Container>

        <Container className='footer-bottom'>
          <Text>© 2024 Recycling Website. All rights reserved.</Text>
        </Container>
      </Container>
    </main>
  );
}
