import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Zook's Website</h1>
          <p>
            Somehow I managed to start working on this heh 
          </p>
        </div>
      </section>
      <section>
        <div className="content">
          <h2>Some content</h2>
          <p>Idk bro</p>
        </div>
      </section>
    </>
  )
}

export default App
