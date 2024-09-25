"use client";
import { Title, Text, List, Anchor, Container } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

const tips = [
  {
    title: 'Know What to Recycle',
    content: 'Familiarize yourself with your local recycling guidelines. Not all materials are recyclable in every area.',
  },
  {
    title: 'Clean Your Recyclables',
    content: 'Rinse out containers to remove food residue. Dirty recyclables can contaminate other materials.',
  },
  {
    title: 'Reduce Plastic Use',
    content: 'Opt for reusable bags, bottles, and containers to minimize plastic waste.',
  },
  {
    title: 'Compost Organic Waste',
    content: 'Composting food scraps and yard waste reduces landfill waste and creates nutrient-rich soil.',
  },
  {
    title: 'Donate Unwanted Items',
    content: 'Give gently used items a second life by donating them to charities or thrift stores.',
  },
];

const resources = [
  {
    title: 'Earth911 Recycling Search',
    link: 'https://earth911.com/recycling-center-search-guides/',
    description: 'Find local recycling centers and learn how to recycle different materials.',
  },
  {
    title: 'EPA Recycling Basics',
    link: 'https://www.epa.gov/recycle/recycling-basics',
    description: 'Learn the basics of recycling and how to get started.',
  },
  {
    title: 'Compost Guide',
    link: 'https://www.compostguide.com/',
    description: 'A comprehensive guide to composting at home.',
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
