"use client"
import Link from 'next/link';
import './styles.css';
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
    Link: 'https://earth911.com/recycling-center-search-guides/',
    description: 'Find local recycling centers and learn how to recycle different materials.',
  },
  {
    title: 'EPA Recycling Basics',
    Link: 'https://www.epa.gov/recycle/recycling-basics',
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
    <div className="container">
      <section className="tips-section">
        <h2>Tips for Effective Recycling</h2>
        <ul>
          {tips.map((tip, index) => (
            <li key={index}>
              <h3>{tip.title}</h3>
              <p>{tip.content}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="resources-section">
        <h2>Helpful Resources</h2>
        <ul>
          {resources.map((resource, index) => (
            <li key={index}>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <a href={resource.link} target="_blank" rel="noopener noreferrer">Learn More</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Tips;
