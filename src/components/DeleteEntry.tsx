import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { Typography } from '@mui/material';
import urlcat from 'urlcat';
import axios from 'axios';

export default function DeleteAlert({ incomeName, incomeId }: any) {
    const [open, setOpen] = React.useState(false);



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        const token: any = sessionStorage.getItem("token");
        const SERVER = import.meta.env.VITE_SERVER;
        const deleteUrl = urlcat(SERVER, `/income/${incomeId}`);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        // axios
        //     .delete(deleteUrl, config)
        //     .then((res) => {
        //         console.log(res.data);
        //         setOpen(false);
        //     })
        //     .catch((err) => console.log(err));

    }


    return (
        <div>
            <RemoveCircleOutlineOutlinedIcon onClick={handleClickOpen} sx={{ color: '#2852A0', cursor: 'pointer' }} />


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    You're about to delete {incomeName}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete {incomeName} entry?
                        This process cannot be undone.
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
                    <Button onClick={handleDelete} sx={{
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

                    }}> Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
