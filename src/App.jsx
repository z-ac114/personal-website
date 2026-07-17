import { useState, useEffect } from 'react'
import './App.css'
import slidingSound from './assets/sliding.mp3'

const sliding = new Audio(slidingSound)

function App() {
  const [display, setDisplay] = useState('0')
  const [isSliding, setIsSliding] = useState(false)
  const [buttonText, setButtonText] = useState('Play something hmm')
  const [duration, setDuration] = useState(8)
  
  const [nameInput, setNameInput] = useState('')
  const [nameMessage, setNameMessage] = useState('')
  const [isColorMode, setIsColorMode] = useState(false)

  const [digitMap, setDigitMap] = useState({
    0: '0', 1: '1', 2: '2', 3: '3', 4: '4',
    5: '5', 6: '6', 7: '7', 8: '8', 9: '9'
  })

  useEffect(() => {
    const baseDigits = isColorMode 
      ? ['0', 'sqrt(2)', 'e', 'pi', 'sqrt(17)', 'sqrt(26)', 'tau', 'sqrt(50)', 'sqrt(65)', 'sqrt(82)']
      : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    if (!isSliding) {
      setDigitMap({
        0: baseDigits[0], 1: baseDigits[1], 2: baseDigits[2], 3: baseDigits[3], 4: baseDigits[4],
        5: baseDigits[5], 6: baseDigits[6], 7: baseDigits[7], 8: baseDigits[8], 9: baseDigits[9]
      })
      return
    }

    const scramble = () => {
      const shuffled = [...baseDigits].sort(() => Math.random() - 0.5)
      setDigitMap({
        0: shuffled[0], 1: shuffled[1], 2: shuffled[2], 3: shuffled[3], 4: shuffled[4],
        5: shuffled[5], 6: shuffled[6], 7: shuffled[7], 8: shuffled[8], 9: shuffled[9]
      })
    }

    const interval = setInterval(scramble, 1000)
    return () => clearInterval(interval)
  }, [isColorMode, isSliding])

  const handleNameSubmit = (e) => {
    e.preventDefault()
    const val = nameInput.trim()
    
    if (val.toLowerCase().includes('a')) {
      setIsColorMode(true)
      setNameMessage('nice! goog luck...')
    } else if (val !== '') {
      setIsColorMode(false)
      setNameMessage('really? i guess then.')
    } else {
      setIsColorMode(false)
      setNameMessage('')
    }
  }

  const appendValue = (value) => {
    if (display === '0' || display === 'Error') {
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
      let formatStr = display

      if (isColorMode) {
        formatStr = formatStr
          .replace(/\)\s*(?=sqrt\()/g, ')*')
          .replace(/([0-9epi])\s*(?=sqrt\()/g, '$1*')
          .replace(/(\))\s*(?=[0-9epias])/g, '$1*')
          .replace(/e\s*(?=pi|tau)/g, 'e*')
          .replace(/pi\s*(?=e|tau)/g, 'pi*')
          .replace(/tau\s*(?=e|pi)/g, 'tau*')
          .replace(/([0-9])\s*(?=e|pi|tau)/g, '$1*')
          .replace(/(e|pi|tau)\s*(?=[0-9])/g, '$1*')
      }

      const evalStr = formatStr
        .replace(/e/g, 'Math.E')
        .replace(/pi/g, 'Math.PI')
        .replace(/tau/g, '(Math.PI * 2)')
        .replace(/sqrt\(2\)/g, 'Math.SQRT2')
        .replace(/sqrt\(17\)/g, 'Math.sqrt(17)')
        .replace(/sqrt\(26\)/g, 'Math.sqrt(26)')
        .replace(/sqrt\(50\)/g, 'Math.sqrt(50)')
        .replace(/sqrt\(65\)/g, 'Math.sqrt(65)')
        .replace(/sqrt\(82\)/g, 'Math.sqrt(82)')

      const rawResult = Function('return ' + evalStr)()
      
      if (typeof rawResult === 'number' && !isNaN(rawResult)) {
        if (Number.isInteger(rawResult)) {
          setDisplay(String(rawResult).slice(0, 8))
        } else {
          let formatted = rawResult.toPrecision(8)
          formatted = parseFloat(formatted).toString()
          setDisplay(formatted.slice(0, 8))
        }
      } else {
        setDisplay(String(rawResult))
      }
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
    setDuration(8)
    setButtonText('Play something hmm')
  }

  return (
    <div className={`page ${isColorMode ? 'color-mode' : ''}`}>
      <main className="page-main homepage">
        <section className="center-content">
          <h1>A calculator!</h1>
          {isSliding ? (
            <p>i guess it moves... [Song name: Jamiroquai - Virtual Insanity]</p>
          ) : (
            <p>Stays still forever..?</p>
          )}
          
          <form onSubmit={handleNameSubmit} className="name-section">
            <div className="input-group">
              <input 
                type="text" 
                placeholder="what's your name?" 
                value={nameInput} 
                onChange={(e) => setNameInput(e.target.value)} 
                className="name-input"
              />
              <button type="submit" className="submit-btn">Go</button>
            </div>
            {nameMessage && <p className="name-message">{nameMessage}</p>}
          </form>
        </section>
        
        <section 
          className={`calculator ${isSliding ? 'slide-animation' : ''} ${isColorMode ? 'color-expanded' : ''}`}
          style={{ '--slide-duration': `${duration}s` }}
        >
          <h2>Calculator.. or is it..</h2>
          <div className="calculator-display">{display}</div>
          <div className="calculator-buttons">
            <button onClick={() => appendValue(digitMap[7])}>{digitMap[7]}</button>
            <button onClick={() => appendValue(digitMap[8])}>{digitMap[8]}</button>
            <button onClick={() => appendValue(digitMap[9])}>{digitMap[9]}</button>
            <button onClick={() => appendValue('+')}>+</button>
            <button onClick={() => appendValue(digitMap[4])}>{digitMap[4]}</button>
            <button onClick={() => appendValue(digitMap[5])}>{digitMap[5]}</button>
            <button onClick={() => appendValue(digitMap[6])}>{digitMap[6]}</button>
            <button onClick={() => appendValue('-')}>-</button>
            <button onClick={() => appendValue(digitMap[1])}>{digitMap[1]}</button>
            <button onClick={() => appendValue(digitMap[2])}>{digitMap[2]}</button>
            <button onClick={() => appendValue(digitMap[3])}>{digitMap[3]}</button>
            <button onClick={() => appendValue('*')}>*</button>
            <button onClick={() => appendValue(digitMap[0])}>{digitMap[0]}</button>
            <button onClick={calculateResult}>=</button>
            <button onClick={clearDisplay}>C</button>
            <button onClick={() => appendValue('/')}>/</button>
          </div>
        </section>
        
        <section className="button">
          <button onClick={() => playAudio(sliding)}>{buttonText}</button>
          <button className="hidden-reset-btn" onClick={resetSliding}>reset</button>
        </section>
      </main>
    </div>
  )
}

export default App