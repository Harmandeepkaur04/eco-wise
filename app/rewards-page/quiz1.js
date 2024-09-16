// pages/rewards/quiz1.js
import Quiz from './';

const quiz1Questions = [
  {
    questionText: 'What is recycling?',
    answerOptions: [
      { answerText: 'Reusing materials', isCorrect: true },
      { answerText: 'Throwing away trash', isCorrect: false },
      { answerText: 'Burning waste', isCorrect: false },
      { answerText: 'Burying garbage', isCorrect: false },
    ],
  },
  // Add more questions here
];

const Quiz1 = () => {
  return <Quiz questions={quiz1Questions} />;
};

export default Quiz1;
