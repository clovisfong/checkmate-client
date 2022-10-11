import { Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import AssetForm from '../components/FinancialForms/AssetForm'
import DebtForm from '../components/FinancialForms/DebtForm'
import ExpenseForm from '../components/FinancialForms/ExpenseForm'
import IncomeForm from '../components/FinancialForms/IncomeForm'

const FormSet = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [financialInfo, setFinancialInfo] = useState([])


    const financeSection = searchParams.get("section")

    const buttonColor = { color: '#2852A0', width: '30px', height: '30px', backgroundColor: 'white', p: '10px', borderRadius: '50%', textAlign: 'center', border: '3px solid #2852A0' }
    const activeButtonColor = { color: 'white', width: '30px', height: '30px', backgroundColor: '#2852A0', p: '10px', borderRadius: '50%', textAlign: 'center', border: '3px solid #2852A0' }

    const displayForm =
        financeSection === 'income' ? <IncomeForm setSearchParams={setSearchParams} setFinancialInfo={setFinancialInfo} financialInfo={financialInfo} /> :
            financeSection === 'expenses' ? <ExpenseForm setSearchParams={setSearchParams} setFinancialInfo={setFinancialInfo} financialInfo={financialInfo} /> :
                financeSection === 'debts' ? <DebtForm setSearchParams={setSearchParams} setFinancialInfo={setFinancialInfo} financialInfo={financialInfo} /> :
                    financeSection === 'assets' ? <AssetForm setSearchParams={setSearchParams} setFinancialInfo={setFinancialInfo} financialInfo={financialInfo} /> : null


    return (
        <>
            <Container maxWidth='sm' sx={{
                mt: '3rem',
                mb: '5rem',


            }}>

                <Grid container sx={{ backgroundColor: '#EDEEF1', p: '1.5rem', borderRadius: '1rem' }}>

                    <Grid item xs={3} sx={{}}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant='h3' sx={financeSection === 'income' ? activeButtonColor : buttonColor} >1</Typography>
                        </Box>
                        <Typography variant='body1' sx={{ textAlign: 'center', mt: '0.5rem', fontWeight: '700' }}>Income</Typography>
                    </Grid>

                    <Grid item xs={3} sx={{}}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant='h3' sx={financeSection === 'expenses' ? activeButtonColor : buttonColor} >2</Typography>
                        </Box>
                        <Typography variant='body1' sx={{ textAlign: 'center', mt: '0.5rem', fontWeight: '700' }}>Expenses</Typography>
                    </Grid>

                    <Grid item xs={3} sx={{}}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant='h3' sx={financeSection === 'debts' ? activeButtonColor : buttonColor} >3</Typography>
                        </Box>
                        <Typography variant='body1' sx={{ textAlign: 'center', mt: '0.5rem', fontWeight: '700' }}>Debts</Typography>
                    </Grid>

                    <Grid item xs={3} sx={{}}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant='h3' sx={financeSection === 'assets' ? activeButtonColor : buttonColor} >4</Typography>
                        </Box>
                        <Typography variant='body1' sx={{ textAlign: 'center', mt: '0.5rem', fontWeight: '700' }}>Assets</Typography>
                    </Grid>

                </Grid>

            </Container>

            {displayForm}
        </>
    )
}

export default FormSet