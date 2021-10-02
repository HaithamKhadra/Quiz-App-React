import { useState, useEffect } from 'react';
import React from "react";

const Question = props => {

  const { question, IncrementScore, IncrementClicksCounter } = props;

  const [hide, sethide] = useState('');
  const [options, setOptions] = useState([]);

  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }


  useEffect(() => {
    if (!question) {
      return;
    }

    let answerss = [...question.incorrect_answers];
    answerss.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer);

    let answers = answerss.map(ans => {
      console.log(decodeHTML(ans));
      return decodeHTML(ans);
    })

    setOptions(answers);
  }, [question]);


  const onSubmitAnswer = (e) => {
    // e.target.value === question.correct_answer
    //   ? IncrementScore()
    //   : console.log('incorrect');
    if (e.target.dataset.value === question.correct_answer) {
      IncrementScore();
      e.target.style.background = '#00ff00';
      e.target.style.color = '#fff'
      // console.log('if');
    } else {
      e.target.style.background = '#ff0000';
      e.target.style.color = '#fff'
      // console.log('else');
    }
    setTimeout(() => {
      sethide('hide');
      IncrementClicksCounter();
    }, 1000);
  }

  if (question.question !== undefined) {

    const renderQuestion = React.createElement(
      "p",
      {
        className: "qs-card__question",
        dangerouslySetInnerHTML: { __html: `${question.question}` }
      }
    );

    return (
      <div className={`qs-card ${hide}`}>
        {renderQuestion}

        {
          options
            .map((answer, key) => (
              <div
                key={key}
                className="qs-card__answer"
                onClick={onSubmitAnswer}
                data-value={answer}
              >
                {answer}
              </div>
            ))
        }

      </div>
    )
  }
}

export default Question;