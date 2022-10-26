import React, { FC, useContext, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from '@mui/material';
import urlcat from 'urlcat';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import UserDetailsContext from "./contextStore/userdetails-context";


const LogOutDialog = () => {
    const [open, setOpen] = useState(false);
    const [nextOpen, setNextOpen] = useState(false);
    const [disable, setDisable] = useState(false)
    const [response, setResponse] = useState('')

    const navigateToHome = useNavigate()
    const userContext = useContext(UserDetailsContext)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNextClose = () => {
        setNextOpen(false);
    };

    const handleLogOut = () => {
        navigateToHome('/login')
        sessionStorage.clear();

        setDisable(true)
        setTimeout(() => {
            setDisable(false)
        }, 3000)
    }


    return (
        <Box>
            <Button onClick={handleClickOpen} sx={{
                background: '#2852A0',
                color: '#FFFBF0',
                letterSpacing: '0.2rem',
                mt: '1rem',
                mb: '1rem',
                pl: '2rem',
                pr: '2rem',
                border: '0.1rem solid #2852A0',
                flexGrow: { xs: 1, sm: 0 },
                borderRadius: '0.7rem',
                '&:hover': {
                    backgroundColor: '#254D71',
                },
            }}> Log Out
            </Button>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <Box sx={{ p: '1rem' }}>
                    <DialogTitle id="alert-dialog-title">
                        Are you sure you would like to log out?
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Hope you have a great time planning your finances. See you again on your next financial milestone!

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={handleClose} sx={{
                            display: 'block',
                            background: '#white',
                            color: '#2852A0',
                            letterSpacing: '0.2rem',
                            pl: '1rem',
                            pr: '1rem',
                            mb: '0.5rem',
                            border: '0.1rem solid #2852A0',
                            borderRadius: '0.7rem',
                            '&:hover': {
                                backgroundColor: '#254D71',
                                color: "white"
                            },

                        }}> Cancel
                        </Button>
                        <Button onClick={handleLogOut} sx={{
                            display: 'block',
                            background: '#2852A0',
                            color: '#FFFBF0',
                            letterSpacing: '0.2rem',
                            mr: '1.5rem',
                            pl: '1rem',
                            pr: '1rem',
                            mb: '0.5rem',
                            border: '0.1rem solid #2852A0',
                            borderRadius: '0.7rem',
                            '&:hover': {
                                backgroundColor: '#254D71',
                            },

                        }}> Log Out
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <Dialog onClose={handleNextClose} open={nextOpen} maxWidth='md' sx={{ width: '100%' }}>
                <Box sx={{ p: '3rem' }}>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>{response}</Typography>
                </Box>
            </Dialog>
        </Box>
    );
}


export default LogOutDialog