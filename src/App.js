import logo from './logo.svg'
import './App.css'
import { useNavigate, Navigate, Route, Routes, Outlet } from 'react-router-dom'

import Home from './pages/Home/Home'
import Nav from './widgets/Nav/Nav'

function App() {
  return (
    <div className="App">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
