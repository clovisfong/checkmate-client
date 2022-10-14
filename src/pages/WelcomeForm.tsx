import { Button, Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserDetailsContext from '../components/contextStore/userdetails-context'

const WelcomeForm = () => {

    const navigateToIncome = useNavigate()
    const userContext = useContext(UserDetailsContext)

    const handleClick = () => {
        navigateToIncome('/form/new?section=income')
    }

    console.log(userContext.retirement_age)

    console.log('welcome',)
    return (
        <Container maxWidth='sm' sx={{
            mt: '3rem',
            mb: '5rem',


        }}>
            <Grid container sx={{ mt: '5rem' }}>
                <Grid item xs={12} sx={{ textAlign: 'center', mb: '2rem' }}>
                    <Typography variant='h3' >Welcome Mate!</Typography>
                </Grid>

                <Grid item xs={12} sx={{ textAlign: 'center', mb: '3rem', display: 'flex', justifyContent: 'center' }}>
                    <Typography variant='body1' sx={{ width: '70%' }}>YAYYYY! You have successfully create an account! Next, we will need some figures to project your financials!</Typography>
                </Grid>


                <Grid container sx={{ backgroundColor: '#EDEEF1', p: '1.5rem', borderRadius: '1rem' }}>

                    <Grid item xs={3} sx={{}}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant='h3' sx={{ color: '#2852A0', width: '30px', height: '30px', backgroundColor: 'white', p: '10px', borderRadius: '50%', textAlign: 'center', border: '3px solid #2852A0' }} >1</Typography>
                        </Box>
                        <Typography variant='body1' sx={{ textAlign: 'center', mt: '0.5rem' }}>Income</Typography>
                    </Grid>

                    <Grid item xs={3} sx={{}}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant='h3' sx={{ color: '#2852A0', width: '30px', height: '30px', backgroundColor: 'white', p: '10px', borderRadius: '50%', textAlign: 'center', border: '3px solid #2852A0' }} >2</Typography>
                        </Box>
                        <Typography variant='body1' sx={{ textAlign: 'center', mt: '0.5rem' }}>Expenses</Typography>
                    </Grid>

                    <Grid item xs={3} sx={{}}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant='h3' sx={{ color: '#2852A0', width: '30px', height: '30px', backgroundColor: 'white', p: '10px', borderRadius: '50%', textAlign: 'center', border: '3px solid #2852A0' }} >3</Typography>
                        </Box>
                        <Typography variant='body1' sx={{ textAlign: 'center', mt: '0.5rem' }}>Debts</Typography>
                    </Grid>

                    <Grid item xs={3} sx={{}}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant='h3' sx={{ color: '#2852A0', width: '30px', height: '30px', backgroundColor: 'white', p: '10px', borderRadius: '50%', textAlign: 'center', border: '3px solid #2852A0' }} >4</Typography>
                        </Box>
                        <Typography variant='body1' sx={{ textAlign: 'center', mt: '0.5rem' }}>Assets</Typography>
                    </Grid>

                </Grid>

                <Grid item xs={12} sx={{ textAlign: 'center', mb: '1rem' }}>
                    <Button onClick={handleClick} sx={{
                        background: '#2852A0',
                        color: '#FFFBF0',
                        letterSpacing: '0.2rem',
                        mt: '3rem',
                        pl: '2rem',
                        pr: '2rem',
                        mb: '0.5rem',
                        border: '0.1rem solid #2852A0',
                        borderRadius: '0.7rem',
                        '&:hover': {
                            backgroundColor: '#254D71',
                        }
                    }}> Start planning now!
                    </Button>
                </Grid>

                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Link to="/dashboard/overview"><Typography variant='body2' >Skip</Typography></Link>
                </Grid>

            </Grid>

        </Container>

    )
}

export default WelcomeForm