import { useState } from 'react';

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const getRewardLevel = (score) => {
    if (score >= 8) return 'Planet Protector';
    if (score >= 5) return 'Eco Advocate';
    return 'Recycler';
  };

  return (
    <div>
      {showScore ? (
        <div>
          <div>You scored {score} out of {questions.length}</div>
          <div>Your reward level: {getRewardLevel(score)}</div>
        </div>
      ) : (
        <div>
          <div>{questions[currentQuestion].questionText}</div>
          <div>
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
