import './App.css';
import { useState } from 'react';
// import { useEffect } from 'react';
import Question from "./components/Question.js";

const App = () => {
  
  const [hideForm, sethideForm] = useState('')
  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState(10);
  const [difficulty, setDifficulty] = useState('easy');
  const [type, setType] = useState('multiple');
  
  const [counter, setCounter] = useState(0)
  const [quizQs, setQuizQs] = useState('');
  
  const IncrementCounter = () => {
    setCounter(counter + 1)
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
      console.log(data);
      setQuizQs(data);
    }
    getQuestions();
  }

  // const onSubmitAnswer = (e, id, a) => {
  //   e.preventDefault();
  //   // const ans = document.querySelector(`input[name="${ID}"]:checked`).value;
  //   const form = document.getElementById(`${id}`);
  //   console.log(form.elements[`${id}`]);
  //   const ans = form.elements[`${id}`].value;
  //   console.log(ans + '...' + a)
  //   if (ans === a) {
  //     // IncrementCounter();
  //     console.log('correct');
  //   } else {
  //     console.log('incorrect');
  //   }
  // }
  const onClickbtn = () => {
    sethideForm('hide')
  }

  return (
      <div className="App">

        <form className={`search-form ${hideForm}`} onSubmit={getSearch} action="" method="get">
          <input className="search-bar" type="text" onChange={handleAmount} placeholder='Search Amount' value={amount} name="q"/>
          <input className="search-bar" type="text" onChange={handleCat} placeholder='Search Cat' value={category} name="q"/>
          <input className="search-bar" type="text" onChange={handleType} placeholder='Search Type' value={type} name="q"/>
          <input className="search-bar" type="text" onChange={handleDif} placeholder='Search diff' value={difficulty} name="q"/>
          <button onClick={onClickbtn} className="search-button" type="submit">
            filter quiz
          </button>
        </form> 

        <h1>{counter}</h1>
      
        {quizQs.response_code === 0         
        ? quizQs.results.map((qs, ID) => (
            <Question 
              key={ID} 
              ID={ID} 
              question={qs} 
              IncrementCounter={IncrementCounter}
              // onSubmitAnswer={onSubmitAnswer}
              />
            )) 
            : <div>Click to Start</div>}

      </div>
  );
}


export default App;
