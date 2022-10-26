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
import Home from './pages/Home';
import NavBarWithLogin from './components/NavBarWithLogin';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NavBarWithLogin />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='/login' element={<Login />} />


        <Route path='/' element={<Navbar />}>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/form' element={<PrivateRoute outlet={<WelcomeForm />} />} />
          <Route path='/form/new' element={<PrivateRoute outlet={<FormSet />} />} />
        </Route>



        <Route path='/' element={<MenuDrawer />}>
          <Route path='/dashboard/overview' element={<PrivateRoute outlet={<DashboardOverview />} />} />
          <Route path='/dashboard/income' element={<PrivateRoute outlet={<IncomeDashboard />} />} />
          <Route path='/dashboard/expenses' element={<PrivateRoute outlet={<ExpensesDashboard />} />} />
          <Route path='/dashboard/debts' element={<PrivateRoute outlet={<DebtsDashboard />} />} />
          <Route path='/dashboard/assets' element={<PrivateRoute outlet={<AssetsDashboard />} />} />
          <Route path='/profile' element={<PrivateRoute outlet={<Profile />} />} />

        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App
