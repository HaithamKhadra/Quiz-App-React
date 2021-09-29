import { useState, useEffect } from 'react';
import React from "react";

// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';


const Question = props => {

  const { question, IncrementScore, IncrementClicksCounter } = props;

  const [hide, sethide] = useState('');
  const [options, setOptions] = useState([]);

  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const decodeHTML = (html) => {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
  }

  // const encodedQuestions = useSelector((state) => state.questions)
  
  useEffect(() => {
    if (!question) {
      return;
    }


    // const decodedQuestions = encodedQuestions.map(q => {
    //   return {
    //     ...q,
    //     question: decodeHTML(q.question),
    //     correct_answer: decodeHTML(q.correct_answer),
    //     incorrect_answers: q.incorrect_answers.map(a => decodeHTML(a))
    //   }
    // })


    let answerss = [...question.incorrect_answers];
    answerss.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer);

    let answers = answerss.map(ans => {
      console.log(decodeHTML(ans));
      return decodeHTML(ans)
    })

    setOptions(answers);
  }, [question]);


  const onSubmitAnswer = (e) => {
    // e.target.value === question.correct_answer
    //   ? IncrementScore()
    //   : console.log('incorrect');
    console.log(e.target.dataset.value);
    if (e.target.dataset.value === question.correct_answer) {
      IncrementScore();
      e.target.style.background = 'green';
      console.log('if');
    } else {
      e.target.style.background = 'red';
      console.log('else');
    }
    setTimeout(() => {
      sethide('hide');
      IncrementClicksCounter();
    }, 2000);
  }

  if (question.question !== undefined) {

    const renderQuestion = React.createElement(
      "h2",
      {
        className: "question",
        dangerouslySetInnerHTML: { __html: `${question.question}` }
      }
    );

    return (
      <div className={`abs totest ${hide}`}>
        {renderQuestion}

        <form>
          <fieldset >
            {
              options
                .map((answer, key) => (
                  <div key={key} >
                    <div 
                      className="classss" 
                      onClick={onSubmitAnswer} 
                      data-value={answer}
                    >
                      {answer}
                    </div>
                  </div>
                ))
            }
          </fieldset>
        </form>
      </div>
    )
  }
}

export default Question;



// if (question.question !== undefined) {
  //   const renderQuestion = React.createElement("div", { dangerouslySetInnerHTML: { __html: `<div>${question.question}</div>` } });
  //   return (
//     <div style={style} className={`${hide}`}>

//       {renderQuestion}

//       <form id={`${ID}`}>
//         <fieldset >
//           {
//             options
//               .map((answer, key) => (
  //                 <div key={key} >
  //                   <input onClick={onSubmitAnswer} type="radio" name={ID} value={answer} />
  //                   <label >{answer}</label>
  //                 </div>
  //               ))
  //           }
  //         </fieldset>
//       </form>
//     </div>
//   )
// }



/* <FormControl component="fieldset">
  {renderQuestion}

  {
    options
      .map((answer, key) => (
        <div key={key}>
          <RadioGroup aria-label="anwser">
            {
              <FormControlLabel
                onClick={onSubmitAnswer}
                value={answer}
                control={<Radio />}
                label={`${answer}`}
              />
            }
          </RadioGroup>
        </div>
      ))
  }
</FormControl> */