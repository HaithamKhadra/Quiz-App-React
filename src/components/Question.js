import { useState , useEffect} from 'react';

const Question = ({ question, ID, IncrementCounter }) => {

  const [hide, sethide] = useState('')
  const [options, setOptions] = useState([])

  // const answersAll = [...question.incorrect_answers, question.correct_answer]

  // shuffling of the array from stackoverflow answer by superluminary (https://stackoverflow.com/a/46545530)  
  // const choices = answersAll
  //   .map((value) => ({ value, sort: Math.random() }))
  //   .sort((a, b) => a.sort - b.sort)
  //   .map(({ value }) => value)

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
  }

  const onClick = () => {
    setTimeout(() => {
      sethide('hide')
    }, 2000);
  }

  return (
    <div className={`${hide}`}>
      <div>{question.question}</div>

      <form id={`${ID}`}>
        <fieldset onClick={onClick}  >
        {options
          .map((answer, key) => (
            <div key={key}>
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
