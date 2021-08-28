import { useState } from 'react';
// import { useEffect } from 'react';

const Question = ({ question, ID, IncrementCounter }) => {

  const [hide, sethide] = useState('')
  const [checked, setChecked] = useState('')

  const answersAll = [...question.incorrect_answers, question.correct_answer]

  // shuffling of the array from stackoverflow answer by superluminary (https://stackoverflow.com/a/46545530)
  
  // useEffect(() => {
  //   const shuffled = answersAll
  //   .map((value) => ({ value, sort: Math.random() }))
  //   .sort((a, b) => a.sort - b.sort)
  //   .map(({ value }) => value)
  //   // return () => {
  //   //   shuffled
  //   // }
  // }, [])

  // const onSubmitAnswer = (e) => {
  //   e.preventDefault();
  //   // const ans = document.querySelector(`input[name="${ID}"]:checked`).value;
  //   const form = document.getElementById(`${ID}`);
  //   console.log(form.elements[`${ID}`]);
  //   const ans = form.elements[`${ID}`].value;
  //   console.log(ans + '...' + question.correct_answer)
  //   if (ans === question.correct_answer) {
  //     // IncrementCounter();
  //     console.log('correct');
  //   } else {
  //     console.log('incorrect');
  //   }
  // }
  const onSubmitAnswer = (e) => {
    e.preventDefault();
    console.log(checked);
    console.log(checked + '...' + question.correct_answer)
    if (checked === question.correct_answer) {
      // IncrementCounter();
      console.log('correct');
    } else {
      console.log('incorrect');
    }
  }

  const handleChecked = (e) => {
    setChecked(e.target.value)
  }

  const onClick = () => {
      sethide('hide')
  }

  return (
    <div className={`${hide}`}>
      <div>{question.question}</div>

      <form id={`${ID}`} onSubmit={onSubmitAnswer}>

        {answersAll.map((answer, key) => (
          <fieldset onChange={(e) => handleChecked(e)} key={key}>
            <input onClick={() => console.log(answer)} type="radio" name={ID} value={answer} />
            <label>{answer}</label>
          </fieldset>
        ))}

        <button onClick={onClick} type='submit'>Submit Answer</button>
      </form>
      <br />
      <br />
    </div>
  )
}

export default Question;
