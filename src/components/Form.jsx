import { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';


const Form = props => {

  const { showQuizFn, setQuizQsfn } = props

  const [hideForm, sethideForm] = useState('')

  const [amount, setAmount] = useState('');

  const [options, setOptions] = useState(null);
  const [questionCategory, setQuestionCategory] = useState('');

  const [typeOfQuestions, setTypeOfQuestions] = useState('');

  const [difficulty, setDifficulty] = useState('')

  const onAmountChange = e => {
    setAmount(e.target.value)
  }

  const onDifficultyChange = e => {
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

    const getQuestions = async () => {

      const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${questionCategory}&difficulty=${difficulty}&type=${typeOfQuestions}`)
      const data = await response.json();
      setQuizQsfn(data);
    }
    getQuestions();
  }

  return (
    <form className={`${hideForm}`} onSubmit={getSearch} action="" method="get">

      <FormControl sx={{ m: 1, width: 300 }}>

        <TextField
          onChange={onAmountChange} value={amount}

          id="filled-number"
          label="Amount of Questions"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputProps: {
              max: 50, min: 5
            }
          }}
          sx={{ m: 1, width: 300 }}
          variant="filled"
          placeholder="From 1 to 50 only!"
        />

        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
          <Select label="Category" value={questionCategory} onChange={handleCategoryChange}>
            {options ?
              options.map((option) => (
                <MenuItem value={option.id} key={option.id}>
                  {option.name}
                </MenuItem>
              )) : null}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 300 }} >
          <InputLabel id="demo-simple-select-helper-label">Type of Questions</InputLabel>
          <Select value={typeOfQuestions} onChange={onTypeChange} label="Type of Questions">
            <MenuItem value="">All types</MenuItem>
            <MenuItem value="multiple">Multiple Choice</MenuItem>
            <MenuItem value="boolean">True/False</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-simple-select-helper-label">Difficulty</InputLabel>
          <Select value={difficulty} onChange={onDifficultyChange} label="Difficulty">
            <MenuItem value="">All Difficulties</MenuItem>
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>

        <Button onClick={onClickbtn} type="submit" sx={{ m: 1, width: 300 }} variant="contained">
          START QUIZ
        </Button>

      </FormControl>

    </form>
  )
}

export default Form;
