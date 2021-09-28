import './App.css';
import { useState } from 'react';
import Form from "./components/Form.jsx";
import QuestionsBlock from "./components/QuestionsBlock.jsx";

const App = () => {
  
  const [showQuiz, setShowQuiz] = useState('hide')
  const [quizQs, setQuizQs] = useState('');
  
  const setQuizQsfn = (data) => {
    setQuizQs(data)
  }

  const showQuizFn = () => {
    setShowQuiz('show')
  }

  return (
      <>
        
        <Form showQuizFn={showQuizFn} setQuizQsfn={setQuizQsfn}/>

        <QuestionsBlock showQuiz={showQuiz} quizQs={quizQs}/>
    
      </>
  );
}


export default App;
