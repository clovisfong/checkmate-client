import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import DebtGraph from './components/DebtGraph';
import ExpenseGraph from './components/ExpenseGraph';
import FinanceStepper from './components/FinanceStepper';
import IncomeForm from './components/IncomeForm';
import IncomeGraph from './components/IncomeGraph';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import FormSet from './pages/FormSet';
import Login from './pages/Login';
import Overview from './pages/Overview';
import SignUp from './pages/SignUp';
import Survey from './pages/Survey';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/survey' element={<Survey />} />
          <Route path='/survey/new' element={<FormSet />} />
        </Route>
        <Route path='/overview' element={<Overview />} />
        <Route path='/login' element={<Login />} />
        <Route path='/overview' element={<Dashboard />} />
        <Route path='/income' element={<IncomeGraph />} />
        <Route path='/login' element={<Login />} />
        <Route path='/expense' element={<ExpenseGraph />} />
        <Route path='/debt' element={<DebtGraph />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
