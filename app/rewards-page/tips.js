"use client";
import { Title, Text, List, Anchor, Container } from '@mantine/core';
import React from 'react';

const tips = [
  {
    title: 'Understand Recycling Rules',
    content: 'Check local guidelines to know what materials can be recycled in your area.',
  },
  {
    title: 'Rinse Before Recycling',
    content: 'Clean containers to remove food residue; dirty items can contaminate the recycling stream.',
  },
  {
    title: 'Minimize Plastic Use',
    content: 'Choose reusable bags, bottles, and containers to cut down on plastic waste.',
  },
  {
    title: 'Start Composting',
    content: 'Compost food scraps and yard waste to reduce landfill contributions and enrich your garden soil.',
  },
  {
    title: 'Donate Instead of Discarding',
    content: 'Give gently used items a second life by donating them to local charities or thrift shops.',
  },
];

const resources = [
  {
    title: 'Earth911 Recycling Search',
    link: 'https://earth911.com/recycling-center-search-guides/',
    description: 'Locate recycling centers and learn how to recycle various materials effectively.',
  },
  {
    title: 'EPA Recycling Basics',
    link: 'https://www.epa.gov/recycle/recycling-basics',
    description: 'Discover the fundamentals of recycling and how to get started in your community.',
  },
  {
    title: 'Composting Guide',
    link: 'https://www.compostguide.com/',
    description: 'A detailed guide to help you compost effectively at home.',
  },
];

const Tips = () => {
  return (
    <Container>
      <section className="tips-section">
        <Title order={2}>Tips for Effective Recycling</Title>
        <List>
          {tips.map((tip, index) => (
            <List.Item key={index}>
              <Title order={3}>{tip.title}</Title>
              <Text>{tip.content}</Text>
            </List.Item>
          ))}
        </List>
      </section>
      <section className="resources-section">
        <Title order={2}>Helpful Resources</Title>
        <List>
          {resources.map((resource, index) => (
            <List.Item key={index}>
              <Title order={3}>{resource.title}</Title>
              <Text>{resource.description}</Text>
              <Anchor href={resource.link} target="_blank" rel="noopener noreferrer">Learn More</Anchor>
            </List.Item>
          ))}
        </List>
      </section>
    </Container>
  );
};

export default Tips;
