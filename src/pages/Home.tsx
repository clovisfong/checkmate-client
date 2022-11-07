import { Button, Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import axios from 'axios';
import urlcat from 'urlcat';

const Home = () => {

    const navigateToLogin = useNavigate()
    const SERVER = import.meta.env.VITE_SERVER;
    const homeurl = urlcat(SERVER, '/')


    useEffect(() => {
        axios.get(homeurl)
            .then((res) => console.log(res.data))

    }, [])

    const handleClick = () => {
        navigateToLogin('/login')
    }
    return (
        <>
            <Container maxWidth='lg' sx={{
                mt: '3rem',
                justifyContent: { xs: 'center', md: 'left' },
            }}>
                <Container sx={{ background: '#E0E2E7', mt: '5rem', mb: '5rem', pt: '5rem', pb: '5rem', textAlign: { xs: 'center', sm: 'left' } }}>
                    <Box sx={{ ml: { xs: '0rem', sm: '3rem' } }}>
                        <Typography variant='h3' sx={{ mb: '1rem', color: '#53565B', fontWeight: '700', }}>A financial milestone buddy</Typography>
                        <Typography variant='body1' sx={{ mb: '2rem', color: '#53565B' }}>Financial planning made easy for all</Typography>
                        <Button onClick={handleClick} sx={{
                            background: '#2852A0',
                            color: '#FFFBF0',
                            letterSpacing: '0.2rem',
                            pl: '3rem',
                            pr: '3rem',
                            border: '0.1rem solid #2852A0',
                            borderRadius: '0.7rem',
                            '&:hover': {
                                backgroundColor: '#254D71',
                            },

                        }}> Plan Now
                        </Button>
                    </Box>
                </Container>


                <Container sx={{ border: '3px solid #2852A0', borderRadius: '1rem', mt: '5rem', mb: '3rem', pt: '5rem', pb: '5rem', pr: '3rem', pl: '3rem' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant='h5' sx={{ color: '#53565B', fontWeight: '600', textAlign: 'center', width: { xs: '100%', sm: '80%', md: '50%' }, lineHeight: 1.7 }}>Checkmate is a financial planning app that helps users project their future finances so that they can better plan and manage their savings over the long term. </Typography>
                    </Box>
                </Container>


                <Container sx={{ pt: '3rem', pb: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <Typography variant='h4' sx={{ mb: '2rem', color: '#53565B', fontWeight: '700' }}>Kickstart in just 5 minutes</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: { xs: '100%', sm: '60%', md: '40%' } }}>
                        <Typography variant='body1' sx={{ color: '#53565B', textAlign: 'center' }}> Planning for finances can be a tedious and boring process. Checkmate makes it simple to use and easy to understand. </Typography>
                    </Box>
                </Container>



                <Grid container sx={{ background: '#FBF6E9', mb: '5rem', display: 'flex', alignItems: 'center', p: { xs: '2rem', sm: '3rem', md: '4rem' } }}>

                    <Grid item xs={12} sm={6} sx={{ pr: { xs: '0rem', sm: '3rem' }, mb: { xs: '2rem', sm: 0 }, display: 'flex', flexDirection: 'column', gap: '2rem' }} >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Typography variant='h4' sx={{ color: 'white', width: { xs: '10px', md: '20px' }, height: { xs: '10px', md: '20px' }, backgroundColor: '#2852A0', p: '10px', borderRadius: '50%', border: '3px solid #2852A0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</Typography>
                            <Typography variant='h3' sx={{ color: '#53565B', fontWeight: '700', }}>Fill the financial forms</Typography>
                        </Box>
                        <Box>
                            <Typography variant='body1' sx={{ color: '#53565B' }}>Financial forms consist of income, expense, debt and asset. You only require to fill in one entry for each form at the start. </Typography>
                        </Box>
                    </Grid>


                    <Grid item xs={12} sm={6} >
                        <Box >
                            <img
                                src="https://imgur.com/52YXsLa.jpg"
                                alt='Financial Forms'
                                style={{
                                    maxWidth: '100%',
                                    border: '3px solid #2852A0',


                                }}
                            />
                        </Box>
                    </Grid>

                </Grid>


                <Grid container sx={{ background: '#FBF6E9', mb: '5rem', display: 'flex', alignItems: 'center', p: { xs: '2rem', sm: '3rem', md: '4rem' } }}>

                    <Grid item xs={12} sm={6} sx={{ pr: { xs: '0rem', sm: '3rem' }, mb: { xs: '2rem', sm: 0 }, display: 'flex', flexDirection: 'column', gap: '2rem' }} >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Typography variant='h4' sx={{ color: 'white', width: { xs: '10px', md: '20px' }, height: { xs: '10px', md: '20px' }, backgroundColor: '#2852A0', p: '10px', borderRadius: '50%', border: '3px solid #2852A0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</Typography>
                            <Typography variant='h3' sx={{ color: '#53565B', fontWeight: '700', }}>Enjoy the financial projections</Typography>
                        </Box>
                        <Box>
                            <Typography variant='body1' sx={{ color: '#53565B' }}>The projections offer many great insights. It allows you to include both current and future finances, and also adjust for inflation and growth rate.</Typography>
                        </Box>
                    </Grid>


                    <Grid item xs={12} sm={6} >
                        <Box >
                            <img
                                src="https://imgur.com/RvzzdYN.jpg"
                                alt='Financial Projections'
                                style={{
                                    maxWidth: '100%',
                                    border: '3px solid #2852A0',


                                }}
                            />
                        </Box>
                    </Grid>

                </Grid>


                <Grid container sx={{ background: '#FBF6E9', mb: '5rem', display: 'flex', alignItems: 'center', p: { xs: '2rem', sm: '3rem', md: '4rem' } }}>

                    <Grid item xs={12} sm={6} sx={{ pr: { xs: '0rem', sm: '3rem' }, mb: { xs: '2rem', sm: 0 }, display: 'flex', flexDirection: 'column', gap: '2rem' }} >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Typography variant='h4' sx={{ color: 'white', width: { xs: '10px', md: '20px' }, height: { xs: '10px', md: '20px' }, backgroundColor: '#2852A0', p: '10px', borderRadius: '50%', border: '3px solid #2852A0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</Typography>
                            <Typography variant='h3' sx={{ color: '#53565B', fontWeight: '700', }}>Plan and manage finances</Typography>
                        </Box>
                        <Box>
                            <Typography variant='body1' sx={{ color: '#53565B' }}>The financials update real time whenever there are changes. You can also track individual entry and make adjustments to improve accuracy. </Typography>
                        </Box>
                    </Grid>


                    <Grid item xs={12} sm={6} >
                        <Box >
                            <img
                                src="https://imgur.com/BRAumuQ.jpg"
                                alt='Plan Finances'
                                style={{
                                    maxWidth: '100%',
                                    border: '3px solid #2852A0',


                                }}
                            />
                        </Box>
                    </Grid>

                </Grid>








                <Container sx={{ background: '#BCC7DB', mt: '5rem', mb: '5rem', pt: '5rem', pb: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <Typography variant='h3' sx={{ mb: '3rem', color: '#53565B', fontWeight: '700' }}>A taste of financial magic</Typography>


                    <Grid container sx={{ textAlign: 'center' }}>

                        <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <TrendingUpOutlinedIcon sx={{ color: '#53565B', fontSize: '6rem' }} />
                            <Typography variant='h5' sx={{ mt: '1rem', mb: '1.5rem', color: '#53565B' }}>Financial Projections</Typography>
                            <Box sx={{ width: { xs: '100%', sm: '80%', md: '60%' } }} >
                                <Typography variant='body1' sx={{ mb: '2rem', color: '#53565B' }}>Project a lifetime of income and expenses to track savings at every milestones.</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <SavingsOutlinedIcon sx={{ color: '#53565B', fontSize: '6rem' }} />
                            <Typography variant='h5' sx={{ mt: '1rem', mb: '1.5rem', color: '#53565B' }}>Retirement Planning</Typography>
                            <Box sx={{ width: { xs: '100%', sm: '80%', md: '60%' } }} >
                                <Typography variant='body1' sx={{ mb: '2rem', color: '#53565B' }}>Get an estimate of your estate savings and monthly expenses budget during retirement. </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <CalculateOutlinedIcon sx={{ color: '#53565B', fontSize: '6rem' }} />
                            <Typography variant='h5' sx={{ mt: '1rem', mb: '1.5rem', color: '#53565B' }}>Loan Calculation</Typography>
                            <Box sx={{ width: { xs: '100%', sm: '80%', md: '60%' } }} >
                                <Typography variant='body1' sx={{ mb: '2rem', color: '#53565B' }}>Fill in basic loan details to calculate monthly repayment and interests.</Typography>
                            </Box>
                        </Grid>

                    </Grid>
                </Container>



                <Container sx={{ background: '#FBF6E9', mt: '5rem', mb: '5rem', pt: '5rem', pb: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <Typography variant='h4' sx={{ mb: '2rem', color: '#53565B', fontWeight: '700' }}>Start planning your finances today! </Typography>
                    <Button onClick={handleClick} sx={{
                        background: '#2852A0',
                        color: '#FFFBF0',
                        letterSpacing: '0.2rem',
                        pl: '3rem',
                        pr: '3rem',
                        border: '0.1rem solid #2852A0',
                        borderRadius: '0.7rem',
                        '&:hover': {
                            backgroundColor: '#254D71',
                        },

                    }}> Plan Now
                    </Button>
                </Container>


                <Box sx={{ mt: '10rem' }}></Box>

            </Container>

        </>
    )
}

export default Home