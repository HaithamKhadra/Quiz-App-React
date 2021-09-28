import { useState, useEffect } from 'react';
import React from "react";

// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';


// <FormControl component="fieldset">
//       <FormLabel component="legend">Gender</FormLabel>
//       <RadioGroup
//         aria-label="gender"
//         defaultValue="female"
//         name="radio-buttons-group"
//       >
//         <FormControlLabel value="female" control={<Radio />} label="Female" />
//         <FormControlLabel value="male" control={<Radio />} label="Male" />
//         <FormControlLabel value="other" control={<Radio />} label="Other" />
//       </RadioGroup>
//     </FormControl>

const Question = props => {

  const { question, ID, IncrementScore, IncrementClicksCounter } = props

  const [hide, sethide] = useState('')
  const [options, setOptions] = useState([])

  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  useEffect(() => {
    if (!question) {
      return;
    }
    let answers = [...question.incorrect_answers]
    answers.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer)

    setOptions(answers)
  }, [question])


  const onSubmitAnswer = (e) => {
    e.target.value === question.correct_answer
      ? IncrementScore()
      : console.log('incorrect');
    setTimeout(() => {
      sethide('hide');
      IncrementClicksCounter();
    }, 2000);
  }

  const style = {
    'position': 'absolute',
    'top': '100px',
    'left': '50px',
    'backgroundColor': 'green',
    'color': 'yellow',
    'height': '300px',
    'width': '500px'
  }


  if (question.question !== undefined) {
    const renderQuestion = React.createElement("div", { dangerouslySetInnerHTML: { __html: `<div>${question.question}</div>` } });
    return (
      <div style={style} className={`${hide}`}>
        
        {renderQuestion}

        <form id={`${ID}`}>
          <fieldset >
            {
              options
                .map((answer, key) => (
                  <div key={key} >
                    <input onClick={onSubmitAnswer} type="radio" name={ID} value={answer} />
                    <label >{answer}</label>
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
