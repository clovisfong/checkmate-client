import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import DebtGraph from './components/DebtGraph';
import ExpenseGraph from './components/ExpenseGraph';
import FinanceStepper from './components/FinanceStepper';
import IncomeForm from './components/FinancialForms/IncomeForm';
import IncomeGraph from './components/IncomeGraph';
import MenuDrawer from './components/MenuDrawer';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import DashboardOverview from './pages/OverviewDashboard';
import FormSet from './pages/FormSet';
import Login from './pages/Login';
import IncomeDashboard from './pages/IncomeDashboard';
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
        <Route path='/' element={<MenuDrawer />}>
          <Route path='/dashboard/overview' element={<DashboardOverview />} />
          <Route path='/dashboard/income' element={<IncomeDashboard />} />

        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/income' element={<IncomeGraph />} />
        <Route path='/login' element={<Login />} />
        <Route path='/expense' element={<ExpenseGraph />} />
        <Route path='/debt' element={<DebtGraph />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
