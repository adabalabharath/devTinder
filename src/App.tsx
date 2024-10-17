import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import { Route, Routes } from 'react-router-dom'
import Feed from './components/Feed'
import Login from './components/Login'
import Test from './components/Profile'
import Profile from './components/Profile'
import Connections from './components/Connections'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ResponsiveAppBar/>
      <Routes>
        <Route path='/' element={<Feed/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/connections' element={<Connections/>}/>
      </Routes>
    </>
  )
}

export default App
