import { useState, useEffect } from 'react'
import './App.css'
import slidingSound from './assets/sliding.mp3'

const sliding = new Audio(slidingSound)

function App() {
  const [display, setDisplay] = useState('0')
  const [isSliding, setIsSliding] = useState(false)
  const [buttonText, setButtonText] = useState('Play something hmm')
  const [duration, setDuration] = useState(8)

  const [digitMap, setDigitMap] = useState({
    0: '0', 1: '1', 2: '2', 3: '3', 4: '4',
    5: '5', 6: '6', 7: '7', 8: '8', 9: '9'
  })

  useEffect(() => {
    if (!isSliding) return

    const scramble = () => {
      const originalDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      const shuffled = [...originalDigits].sort(() => Math.random() - 0.5)
      
      setDigitMap({
        0: shuffled[0], 1: shuffled[1], 2: shuffled[2], 3: shuffled[3], 4: shuffled[4],
        5: shuffled[5], 6: shuffled[6], 7: shuffled[7], 8: shuffled[8], 9: shuffled[9]
      })
    }

    const interval = setInterval(scramble, 1000)
    return () => clearInterval(interval)
  }, [isSliding])

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
    if (!isSliding) {
      audioFile.currentTime = 0 
      audioFile.play().catch(err => console.log("Audio play blocked: ", err))
      setIsSliding(true)
      
      setTimeout(() => {
        setButtonText('press button to stop sliding')
      }, 1000)
    } else {
      setDuration(prevDuration => Math.max(0.15, prevDuration * 0.5))
    }
  }

  const resetSliding = () => {
    setIsSliding(false)
    setDuration(4)
    setButtonText('Play something hmm')
    setDigitMap({
      0: '0', 1: '1', 2: '2', 3: '3', 4: '4',
      5: '5', 6: '6', 7: '7', 8: '8', 9: '9'
    })
  }

  return (
    <main className="homepage">
      <section className="Main webpage">
        <div className="center-content">
          <h1>My website :D</h1>
          <p>maybe not for now</p>
        </div>
      </section>
      <section 
        className={`calculator ${isSliding ? 'slide-animation' : ''}`}
        style={{ '--slide-duration': `${duration}s` }}
      >
        <h2>Calculator.. or is it..</h2>
        <div className="calculator-display">{display}</div>
        <div className="calculator-buttons">
          <button onClick={() => appendValue(digitMap[7])}>{digitMap[7]}</button>
          <button onClick={() => appendValue(digitMap[8])}>{digitMap[8]}</button>
          <button onClick={() => appendValue(digitMap[9])}>{digitMap[9]}</button>
          <button onClick={() => appendValue('+')}>+</button><br />
          <button onClick={() => appendValue(digitMap[4])}>{digitMap[4]}</button>
          <button onClick={() => appendValue(digitMap[5])}>{digitMap[5]}</button>
          <button onClick={() => appendValue(digitMap[6])}>{digitMap[6]}</button>
          <button onClick={() => appendValue('-')}>-</button><br />
          <button onClick={() => appendValue(digitMap[1])}>{digitMap[1]}</button>
          <button onClick={() => appendValue(digitMap[2])}>{digitMap[2]}</button>
          <button onClick={() => appendValue(digitMap[3])}>{digitMap[3]}</button>
          <button onClick={() => appendValue('*')}>*</button><br />
          <button onClick={() => appendValue(digitMap[0])}>{digitMap[0]}</button>
          <button onClick={calculateResult}>=</button>
          <button onClick={clearDisplay}>C</button>
          <button onClick={() => appendValue('/')}>/</button>
        </div>
      </section>
      <section className="button">
        <button onClick={() => playAudio(sliding)}>{buttonText}</button>
        <button className="hidden-reset-btn" onClick={resetSliding}>Super Hidden Stop Button</button>
      </section>
    </main>
  )
}

export default App