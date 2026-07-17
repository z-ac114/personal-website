import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState(0)

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

  return (
    <main className="homepage">
      <section className="Main webpage">
        <div className="center-content">
          <h1>My website :D</h1>
        </div>
      </section>
      <section className="calculator">
        <h2>Calculator.. or is it..</h2>
        <div className="calculator-display">{display}</div>
        <div className="calculator-buttons">
          <button onClick={clearDisplay}>C</button>
          <button onClick={() => appendValue('/')}>/</button>
          <button onClick={() => appendValue('*')}>*</button>
          <button onClick={() => appendValue('-')}>-</button>
          <button onClick={() => appendValue('7')}>7</button>
          <button onClick={() => appendValue('8')}>8</button>
          <button onClick={() => appendValue('9')}>9</button>
          <button onClick={() => appendValue('+')}>+</button>
          <button onClick={() => appendValue('4')}>4</button>
          <button onClick={() => appendValue('5')}>5</button>
          <button onClick={() => appendValue('6')}>6</button>
          <button onClick={calculateResult}>=</button>
          <button onClick={() => appendValue('1')}>1</button>
          <button onClick={() => appendValue('2')}>2</button>
          <button onClick={() => appendValue('3')}>3</button>
          <button onClick={() => appendValue('0')}>0</button>
        </div>
        </section>
    </main>
  )
}

export default App
