import { useState } from 'react'
import './App.css'
import slidingSound from './assets/sliding.mp3'

const sliding = new Audio(slidingSound)

function App() {
  const [display, setDisplay] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const [duration, setDuration] = useState(4)

  const appendValue = (value) => {
    if (display === '0') {
      setDisplay(value)
      return
    }
    setDisplay(display + value)
  }

  const clearDisplay = () => {
    setDisplay('0')
  }

  const calculateResult = () => {
    try {
      setDisplay(String(Function('return ' + display)()))
    } catch {
      setDisplay('Error')
    }
  }
  
  const playAudio = (audioFile) => {
    audioFile.currentTime = 0 
    audioFile.play().catch(err => console.log("Audio play blocked: ", err))
    
    if (!isSliding) {
      setIsSliding(true)
    } else {
      // If already sliding, make it go faster (decrease duration)
      setDuration(prevDuration => Math.max(0.15, prevDuration * 0.5))
    }
  }

  return (
    <main className="homepage">
      <section className="Main webpage">
        <div className="center-content">
          <h1>My website :D</h1>
          <p>maybe not for now</p>
        </div>
      </section>
      
      {/* Passing the dynamic duration down to CSS as a custom property */}
      <section 
        className={`calculator ${isSliding ? 'slide-animation' : ''}`}
        style={{ '--slide-duration': `${duration}s` }}
      >
        <h2>Calculator.. or is it..</h2>
        <div className="calculator-display">{display}</div>
        <div className="calculator-buttons">
          <button onClick={() => appendValue('7')}>7</button>
          <button onClick={() => appendValue('8')}>8</button>
          <button onClick={() => appendValue('9')}>9</button>
          <button onClick={() => appendValue('+')}>+</button><br />
          <button onClick={() => appendValue('4')}>4</button>
          <button onClick={() => appendValue('5')}>5</button>
          <button onClick={() => appendValue('6')}>6</button>
          <button onClick={() => appendValue('-')}>-</button><br />
          <button onClick={() => appendValue('1')}>1</button>
          <button onClick={() => appendValue('2')}>2</button>
          <button onClick={() => appendValue('3')}>3</button>
          <button onClick={() => appendValue('*')}>*</button><br />
          <button onClick={() => appendValue('0')}>0</button>
          <button onClick={calculateResult}>=</button>
          <button onClick={clearDisplay}>C</button>
          <button onClick={() => appendValue('/')}>/</button>
        </div>
      </section>
      <section className="button">
        {/* Dynamic button text */}
        <button onClick={() => playAudio(sliding)}>
          {isSliding ? 'press button to stop sliding' : 'Play something hmm'}
        </button>
      </section>
    </main>
  )
}

export default App