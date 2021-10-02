import { useState } from 'react';
import Question from "./Question.jsx";
import FinalScore from "./FinalScore.jsx";


const QuestionsBlock = props => {

  const { quizQs, showQuiz } = props

  const [score, setScore] = useState(0)
  const [clicksCounter, setClicksCounter] = useState(0)

  const IncrementScore = () => {
    setScore(score + 1)
  }

  const IncrementClicksCounter = () => {
    setClicksCounter(clicksCounter + 1)
  }

  return (
    <section className={`${showQuiz}`}>

      {
        quizQs.response_code === 0 && quizQs.results.length && clicksCounter !== quizQs.results.length
        ? <h1 className="progress">Progress: {score} / {quizQs.results.length}</h1>
        : null
      }

      {
        quizQs.response_code === 0
          ? quizQs.results.map((qs, ID) => (
            <Question
              key={ID}
              ID={ID}
              question={qs}
              IncrementScore={IncrementScore}
              IncrementClicksCounter={IncrementClicksCounter}
            />
          ))
          : <div className='circle loader'></div>
      }
      {
        quizQs.response_code === 0

          ? clicksCounter === quizQs.results.length
            ? <section className={`${showQuiz}`}>
              {
                quizQs.response_code === 0
                  ? <FinalScore amount={quizQs.results.length} counter={score} />
                  : null
              }
            </section>
            : null
          : null
      }
    </section>
  )
}

export default QuestionsBlock;
