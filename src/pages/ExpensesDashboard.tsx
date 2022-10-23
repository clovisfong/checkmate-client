import { Container, Grid, Typography } from '@mui/material'
import { differenceInCalendarYears, getYear } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import urlcat from 'urlcat';
import { IExpenseData, IUserDetails } from '../Interface';
import ExpenseEntries from '../components/FinancialEntries/ExpenseEntries';
import jwt_decode from 'jwt-decode';
import UserDetailsContext from '../components/contextStore/userdetails-context';
import ExpenseProjections from '../components/ExpenseProjections';

const ExpensesDashboard = () => {

    const [refresh, setRefresh] = useState(false)
    const [expensesData, setExpensesData] = useState<IExpenseData[]>([{
        amount: 0,
        created_at: '',
        duration_months: 0,
        frequency: '',
        inflation_rate: 0,
        id: 0,
        expense_name: '',
        expense_status: '',
        expense_type: '',
        start_date: '',
        updated_at: '',
        user_details_id: 0,
    }])

    // Get Year
    const today = new Date
    const year = getYear(today)

    // Get User Details
    const userContext = useContext(UserDetailsContext)

    // General details: Current age, retirement age, life-expectancy age
    const birthDate = new Date(userContext.date_of_birth)
    const currentDate = new Date // use current date
    const currentAge = differenceInCalendarYears(currentDate, birthDate) // 24
    const yearsToRetirement = userContext.retirement_age - currentAge //42
    const yearsToLifeExpectancy = userContext.life_expectancy - currentAge //66

    // Fetch Expense Details
    const SERVER = import.meta.env.VITE_SERVER;
    const url = urlcat(SERVER, "/expense/");
    const token = sessionStorage.getItem('token')
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    useEffect(() => {
        axios
            .get(url, header)
            .then((res) => {
                setExpensesData(res.data)
            })
            .catch((error) => console.log(error.response.data.error));

    }, [refresh])




    const update = () => {
        setRefresh(!refresh)
    }

    return (
        <Container maxWidth='lg'>
            <Typography variant='h3' sx={{ mb: '2rem', color: '#53565B', fontWeight: '700' }}>Expenses</Typography>
            <ExpenseProjections expenseData={expensesData} />
            <Typography variant='h4' sx={{ mb: '0.5rem', color: '#53565B' }}>Overview for Year {year}</Typography>

            <ExpenseEntries expensesData={expensesData} update={update} />
        </Container>
    )
}

export default ExpensesDashboard