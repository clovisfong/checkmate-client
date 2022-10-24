import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import DebtProjections from './components/DebtProjections';
import ExpenseProjections from './components/ExpenseProjections';
import FinanceStepper from './components/FinanceStepper';
import IncomeForm from './components/FinancialForms/IncomeForm';
import IncomeProjections from './components/IncomeProjections';
import MenuDrawer from './components/MenuDrawer';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import DashboardOverview from './pages/OverviewDashboard';
import FormSet from './pages/FormSet';
import Login from './pages/Login';
import IncomeDashboard from './pages/IncomeDashboard';
import SignUp from './pages/SignUp';
import ExpensesDashboard from './pages/ExpensesDashboard';
import DebtsDashboard from './pages/DebtsDashboard';
import AssetsDashboard from './pages/AssetsDashboard';
import WelcomeForm from './pages/WelcomeForm';
import Profile from './pages/Profile';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/form' element={<WelcomeForm />} />
          <Route path='/form/new' element={<FormSet />} />
        </Route>
        <Route path='/' element={<MenuDrawer />}>
          <Route path='/dashboard/overview' element={<DashboardOverview />} />
          <Route path='/dashboard/income' element={<IncomeDashboard />} />
          <Route path='/dashboard/expenses' element={<ExpensesDashboard />} />
          <Route path='/dashboard/debts' element={<DebtsDashboard />} />
          <Route path='/dashboard/assets' element={<AssetsDashboard />} />
          <Route path='/profile' element={<Profile />} />

        </Route>
        <Route path='/login' element={<Login />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
