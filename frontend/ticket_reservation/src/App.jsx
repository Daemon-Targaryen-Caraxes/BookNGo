import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(10)

  return (
    <>
      <button onClick={() => setCount(count-1)}>Click me</button>
      <div>{count}</div>
    </>
  )
}

export default App
