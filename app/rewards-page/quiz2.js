// pages/rewards/quiz2.js
import Quiz from './quiz';

const quiz2Questions = [
  {
    questionText: 'Which of these can be recycled?',
    answerOptions: [
      { answerText: 'Plastic bottles', isCorrect: true },
      { answerText: 'Food waste', isCorrect: false },
      { answerText: 'Electronics', isCorrect: true },
      { answerText: 'All of the above', isCorrect: true },
    ],
  },
  // Add more questions here
];

const Quiz2 = () => {
  return <Quiz questions={quiz2Questions} />;
};

export default Quiz2;
