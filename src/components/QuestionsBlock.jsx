import { useState } from 'react';
import Question from "./Question.jsx";

const QuestionsBlock = props => {

  const {quizQs, showQuiz} = props

  const [counter, setCounter] = useState(0)

  const IncrementCounter = () => {
    setCounter(counter + 1)
  }

  return (
    <section className={`${showQuiz}`}>
      <h1>{counter}</h1>
      {
        quizQs.response_code === 0
        ? quizQs.results.map((qs, ID) => (
            <Question
              key={ID}
              ID={ID}
              question={qs}
              IncrementCounter={IncrementCounter}
              />
          ))
        : <div>Click to Start</div>
      }
    </section>
  )
}

export default QuestionsBlock;
