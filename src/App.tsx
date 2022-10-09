import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import ExpenseGraph from './components/ExpenseGraph';
import IncomeGraph from './components/IncomeGraph';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/overview' element={<Dashboard />} />
        <Route path='/income' element={<IncomeGraph />} />
        <Route path='/expense' element={<ExpenseGraph />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
