import { Box, Container, Typography } from '@mui/material'
import { differenceInCalendarYears, getYear } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import urlcat from 'urlcat';
import { IDebtData } from '../Interface';
import DebtProjections from '../components/DebtProjections';
import DebtEntries from '../components/FinancialEntries/DebtEntries';


const DebtsDashboard = () => {

    const [refresh, setRefresh] = useState(false)
    const [debtData, setDebtData] = useState<IDebtData[]>([{
        commitment_period_months: 0,
        created_at: '',
        debt_name: '',
        debt_status: '',
        debt_type: '',
        id: 0,
        interest_rate: 0,
        loan_amount: 0,
        monthly_commitment: 0,
        start_date: '',
        updated_at: '',
        user_details_id: 0
    }])

    // Get Year
    const today = new Date
    const year = getYear(today)


    // Fetch Debt Details
    const SERVER = import.meta.env.VITE_SERVER;
    const url = urlcat(SERVER, "/debt/");
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
                console.log('debt check', res.data)
                setDebtData(res.data)
            })
            .catch((error) => console.log(error.response.data.error));

    }, [refresh])





    const update = () => {
        setRefresh(!refresh)
    }


    return (
        <Container maxWidth='lg'>
            <Typography variant='h3' sx={{ mb: '2rem', color: '#53565B', fontWeight: '700' }}>Debts</Typography>
            <DebtProjections debtData={debtData} />

            <Typography variant='h5' sx={{ mt: '5rem', mb: '0.5rem', color: '#53565B' }}>Types of Debts</Typography>

            <DebtEntries debtData={debtData} update={update} />
            <Box sx={{ mt: '10rem' }}></Box>
        </Container>
    )
}

export default DebtsDashboard