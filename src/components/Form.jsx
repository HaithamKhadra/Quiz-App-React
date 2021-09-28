import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Form = props => {

  const { showQuizFn, setQuizQsfn } = props

  const [hideForm, sethideForm] = useState('')
  
  const [amount, setAmount] = useState(5);
  
  const [options, setOptions] = useState(null);
  const [questionCategory, setQuestionCategory] = useState('');

  const [typeOfQuestions, setTypeOfQuestions] = useState('');
  
  const [difficulty, setDifficulty] = useState('')

  const onAmountChange = e =>{
    setAmount(e.target.value)
  }

  const onDifficultyChange = e =>{
    setDifficulty(e.target.value)
  }
  
  const handleCategoryChange = e => {
    setQuestionCategory(e.target.value)
  }
  
  const onTypeChange = e => {
    setTypeOfQuestions(e.target.value);
  }
  
  const onClickbtn = () => {
    sethideForm('hide');
    showQuizFn();
  }

  useEffect(() => {

    fetch('https://opentdb.com/api_category.php')
      .then(res => res.json())
      .then(data => {
        setOptions(data.trivia_categories)
      })
    
  }, [questionCategory])

  const getSearch = (e) => {
    e.preventDefault();
    // setAmount('');
    // setType('');
    // setDifficulty('');

    const getQuestions = async () => {
      
      const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${questionCategory}&difficulty=${difficulty}&type=${typeOfQuestions}`)
      const data = await response.json();
      setQuizQsfn(data);
    }
    getQuestions();
  }

  return (
    <form className={`${hideForm}`} onSubmit={getSearch} action="" method="get">

      <h2>Amount of Questions:</h2>
      <input type="number" max='50' min='1' step='1' onChange={onAmountChange} value={amount}/>
      
      <div>
        <h2>Category:</h2>
        <select value={questionCategory} onChange={handleCategoryChange}>
          {options ?
            options.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            )) : null}
        </select>
      </div>

      <div>
        <h2>Type of Questions:</h2>
        <select value={typeOfQuestions} onChange={onTypeChange}>
          <option value="" disabled>Choose Type of Questions</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True/False</option>
        </select>
      </div>

      <div>
        <h2>Difficulty:</h2>
        <select value={difficulty} onChange={onDifficultyChange}>
          <option value="" disabled>All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <Button variant="contained" onClick={onClickbtn} type="submit">START QUIZ</Button>
      {/* <Button>START QUIZ</Button> */}

    </form> 
  )
}

export default Form;
