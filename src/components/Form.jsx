import { useState } from "react";


const Form = props => {

  const { showQuizFn, setQuizQsfn } = props

  const [hideForm, sethideForm] = useState('')
  
  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState(10);
  const [difficulty, setDifficulty] = useState('easy');
  const [type, setType] = useState('multiple');

  const onClickbtn = () => {
    sethideForm('hide');
    showQuizFn();
  }

  const handleAmount = (e) => {
    setAmount(e.target.value);
  }
  const handleCat = (e) => {
    setCategory(e.target.value);
  }
  const handleType = (e) => {
    setType(e.target.value);
  }
  const handleDif = (e) => {
    setDifficulty(e.target.value);
  }

  const getSearch = (e) => {
    e.preventDefault();
    setAmount('');
    setCategory('');
    setType('');
    setDifficulty('');

    const getQuestions = async () => {
      
      const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
      const data = await response.json();
      setQuizQsfn(data);
    }
    getQuestions();
  }

  return (
    <form className={`search-form ${hideForm}`} onSubmit={getSearch} action="" method="get">
      <input className="search-bar" type="text" onChange={handleAmount} placeholder='Search Amount' value={amount} name="q"/>
      <input className="search-bar" type="text" onChange={handleCat} placeholder='Search Cat' value={category} name="q"/>
      <input className="search-bar" type="text" onChange={handleType} placeholder='Search Type' value={type} name="q"/>
      <input className="search-bar" type="text" onChange={handleDif} placeholder='Search diff' value={difficulty} name="q"/>
      <button onClick={onClickbtn} className="search-button" type="submit">
        filter quiz
      </button>
    </form> 
  )
}

export default Form;
