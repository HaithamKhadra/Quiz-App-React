import Button from '@mui/material/Button';

const FinalScore = props => {

  const {counter, amount} = props

  const tryAgain = () => {
    return window.location.reload();
  }

  return (
    <div className="final-score">
      <p className="final-score__txt">FINAL SCORE:</p> 
      <p className="final-score__correct">
        <strong>{counter} <span>correct</span></strong> 
        <strong><span>out of</span> {amount}</strong>
      </p>  
      <Button className="final-score__btn" onClick={tryAgain} variant="contained">
          TRY AGAIN!
      </Button>    
    </div>
  )
}

export default FinalScore
