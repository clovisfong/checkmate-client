import { Container, Grid, Typography } from '@mui/material'
import { differenceInCalendarYears, getYear } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import IncomeEntries from '../components/FinancialEntries/IncomeEntries'
import axios from 'axios';
import urlcat from 'urlcat';
import { IIncomeData, IUserDetails } from '../Interface';
import CalculateIncome from '../components/Calculations/CalculateIncome';
import IncomeProjections from '../components/IncomeProjections';
import jwt_decode from 'jwt-decode';
import UserDetailsContext from '../components/contextStore/userdetails-context';
import { Box } from '@mui/system';


const IncomeDashboard = () => {

    const [refresh, setRefresh] = useState(false)
    const [incomeData, setIncomeData] = useState<IIncomeData[]>([{
        amount: 0,
        created_at: '',
        duration_months: 0,
        frequency: '',
        growth_rate: 0,
        id: 0,
        income_name: '',
        income_status: '',
        income_type: '',
        start_date: '',
        updated_at: '',
        user_details_id: 0,
    }])

    // Get Year
    const today = new Date
    const year = getYear(today)


    // Fetch Income Details
    const SERVER = import.meta.env.VITE_SERVER;
    const url = urlcat(SERVER, "/income/");
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
                setIncomeData(res.data)
            })
            .catch((error) => console.log(error.response.data.error));

    }, [refresh])



    const update = () => {
        setRefresh(!refresh)
    }


    return (
        <Container maxWidth='lg'>

            <Typography variant='h3' sx={{ mb: '2rem', color: '#53565B', fontWeight: '700' }}>Income</Typography>
            <IncomeProjections incomeData={incomeData} />
            <Typography variant='h5' sx={{ mt: '5rem', mb: '0.5rem', color: '#53565B' }}>Types of Income</Typography>

            <IncomeEntries incomeData={incomeData} update={update} />
            <Box sx={{ mt: '10rem' }}></Box>
        </Container>
    )
}

export default IncomeDashboard