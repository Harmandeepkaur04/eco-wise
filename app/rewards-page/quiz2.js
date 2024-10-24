const wasteManagementQuestions = [
  {
    questionText: 'What is the main goal of waste management?',
    answerOptions: [
      { answerText: 'Reduce waste', isCorrect: true },
      { answerText: 'Increase landfill', isCorrect: false },
      { answerText: 'Burn waste', isCorrect: false },
      { answerText: 'Export waste', isCorrect: false },
    ],
    fact: 'The goal is to minimize waste and manage it responsibly.',
  },
  {
    questionText: 'What is a common method of waste disposal?',
    answerOptions: [
      { answerText: 'Recycling', isCorrect: true },
      { answerText: 'Composting', isCorrect: true },
      { answerText: 'Incineration', isCorrect: true },
      { answerText: 'All of the above', isCorrect: true },
    ],
    fact: 'All are methods of waste disposal.',
  },
  {
    questionText: 'Which type of waste is considered hazardous?',
    answerOptions: [
      { answerText: 'Plastic bottles', isCorrect: false },
      { answerText: 'Food waste', isCorrect: false },
      { answerText: 'Batteries', isCorrect: true },
      { answerText: 'Paper', isCorrect: false },
    ],
    fact: 'Batteries contain harmful chemicals.',
  },
  {
    questionText: 'What process converts waste into new materials?',
    answerOptions: [
      { answerText: 'Landfilling', isCorrect: false },
      { answerText: 'Recycling', isCorrect: true },
      { answerText: 'Incineration', isCorrect: false },
      { answerText: 'Composting', isCorrect: false },
    ],
    fact: 'Recycling turns waste into new products.',
  },
  {
    questionText: 'What is a key benefit of composting waste?',
    answerOptions: [
      { answerText: 'Reduces landfill', isCorrect: true },
      { answerText: 'Produces methane', isCorrect: false },
      { answerText: 'Increases pollution', isCorrect: false },
      { answerText: 'All of the above', isCorrect: false },
    ],
    fact: 'Composting creates nutrient-rich soil.',
  },
  {
    questionText: 'What does e-waste refer to?',
    answerOptions: [
      { answerText: 'Electronic waste', isCorrect: true },
      { answerText: 'Environmental waste', isCorrect: false },
      { answerText: 'Energy waste', isCorrect: false },
      { answerText: 'Economic waste', isCorrect: false },
    ],
    fact: 'E-waste is discarded electronics.',
  },
  {
    questionText: 'Which item can be composted easily?',
    answerOptions: [
      { answerText: 'Plastic bags', isCorrect: false },
      { answerText: 'Glass bottles', isCorrect: false },
      { answerText: 'Fruit peels', isCorrect: true },
      { answerText: 'Metal cans', isCorrect: false },
    ],
    fact: 'Organic materials like fruit peels can be composted.',
  },
  {
    questionText: 'What is biodegradable waste made of?',
    answerOptions: [
      { answerText: 'Non-biodegradable', isCorrect: false },
      { answerText: 'Biodegradable', isCorrect: true },
      { answerText: 'Hazardous', isCorrect: false },
      { answerText: 'Recyclable', isCorrect: false },
    ],
    fact: 'Biodegradable waste breaks down naturally.',
  },
  {
    questionText: 'What is a common method for hazardous waste?',
    answerOptions: [
      { answerText: 'Landfilling', isCorrect: false },
      { answerText: 'Recycling', isCorrect: false },
      { answerText: 'Incineration', isCorrect: true },
      { answerText: 'Composting', isCorrect: false },
    ],
    fact: 'Incineration disposes of hazardous waste.',
  },
  {
    questionText: 'What is the main purpose of a landfill?',
    answerOptions: [
      { answerText: 'Recycle waste', isCorrect: false },
      { answerText: 'Compost waste', isCorrect: false },
      { answerText: 'Store waste', isCorrect: true },
      { answerText: 'Incinerate waste', isCorrect: false },
    ],
    fact: 'Landfills store waste in a controlled way.',
  },
];

export default wasteManagementQuestions;
