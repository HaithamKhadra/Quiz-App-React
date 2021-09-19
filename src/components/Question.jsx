import { useState , useEffect} from 'react';

const Question = ({ question, ID, IncrementCounter }) => {

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
      ? IncrementCounter()
      : console.log('incorrect');
      setTimeout(() => {
        sethide('hide')
      }, 2000);
  }

  const style = {
    'position': 'absolute',
    'top': '100px',
    'left': '50px',
    'backgroundColor': 'green',
    'color': 'yellow'
  }

  return (
    <div style={style} className={`${hide}`}>
      <div>{question.question}</div>

      <form id={`${ID}`}>
        <fieldset >
        {options
          .map((answer, key) => (
            <div  key={key}>
              <input onClick={onSubmitAnswer} type="radio" name={ID} value={answer} />
              <label >{answer}</label>
            </div>
            ))}      
         </fieldset>
       </form>
      <br />
    </div>
  )
}

export default Question;
