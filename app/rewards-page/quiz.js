import { useState } from 'react';

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerOptionClick = (isCorrect, answerText) => {
    setSelectedAnswer(answerText);
    setShowAnswer(true);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setShowAnswer(false);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setShowAnswer(false);
    setSelectedAnswer(null);
  };

  const getRewardLevel = (score) => {
    if (score >= 8) return 'Planet Protector';
    if (score >= 5) return 'Eco Advocate';
    return 'Recycler';
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz">
      {showScore ? (
        <div className="score-card">
          <div>You scored {score} out of {questions.length}</div>
          <div>Your reward level: {getRewardLevel(score)}</div>
          <button onClick={handleRetakeQuiz}>Retake Quiz</button>
        </div>
      ) : (
        <div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="question-card">{questions[currentQuestion].questionText}</div>
          <div>
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect, answerOption.answerText)}>
                {answerOption.answerText}
              </button>
            ))}
          </div>
          {showAnswer && (
            <div className="feedback">
              <div>Correct Answer: {questions[currentQuestion].answerOptions.find(option => option.isCorrect).answerText}</div>
              <div>Fact: {questions[currentQuestion].fact}</div>
              <button onClick={handleNextQuestion}>Next Question</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
