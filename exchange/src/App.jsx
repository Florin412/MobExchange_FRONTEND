import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './components/SignIn/SIgnInForm'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SignIn></SignIn>
    </>
  );
}

export default App;