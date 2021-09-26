
const FinalScore = props => {


  const {counter, amount} = props

  const style = {
    'position': 'absolute',
    'top': '100px',
    'left': '5px',
    'zIndex': '-999'
  }

  return (
    <div style={style}>
      <h1>YOUR FINAL SCORE IS: {counter} OUT OF {amount}</h1>      
    </div>
  )
}

export default FinalScore
