import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import urlcat from 'urlcat'
import UserDetailsContext from './contextStore/userdetails-context'
import DeleteAccountDialog from './DeleteAccountDialog'
import LogOutDialog from './LogOutDialog'

const AccountSettings = () => {


    return (
        <Container maxWidth='md' sx={{ width: '80%' }}>
            <Typography variant='h5' sx={{ mt: '2rem', mb: '0.5rem', color: '#53565B' }}>Account Settings</Typography>
            <Divider sx={{ mt: '1rem', mb: '2rem' }}></Divider>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>

                <LogOutDialog />
                <DeleteAccountDialog />

            </Box>

        </Container>
    )
}

export default AccountSettings