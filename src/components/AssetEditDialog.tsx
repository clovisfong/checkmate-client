import React, { FC, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Box } from '@mui/system';
import { FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { differenceInCalendarYears, format } from 'date-fns';
import { IAssetData, IIncomeData, IUserDetails } from '../Interface';
import axios from 'axios';
import urlcat from 'urlcat';
import jwt_decode from 'jwt-decode';


interface Props {
    assetDetails: IAssetData;
    update: () => void
}

const AssetEditDialog = ({ assetDetails, update }: Props) => {
    const [open, setOpen] = useState(false);
    const [nextOpen, setNextOpen] = useState(false);
    const [disable, setDisable] = useState(false)
    const [response, setResponse] = useState('')


    const token: any = sessionStorage.getItem('token')
    const userDetails: IUserDetails = jwt_decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWUiOiJnZ2ciLCJkYXRlX29mX2JpcnRoIjoiMTk5My0wMS0xMyIsImdlbmRlciI6IlByZWZlciBub3QgdG8gc2F5IiwiZW1haWwiOiJnZ2dAaG90bWFpbC5jb20iLCJyZXRpcmVtZW50X2FnZSI6NjMsInJldGlyZW1lbnRfbGlmZXN0eWxlIjoiTWFpbnRhaW4iLCJsZWdhY3lfYWxsb2NhdGlvbiI6MCwibGlmZV9leHBlY3RhbmN5Ijo4NH0.tVhbiKT3-NUsG5o_AnLxa4vhVu4HJMpeMReqft3DA4M")
    const assetOptions = ['Property', 'Car', 'Savings', 'Other Assets & Investments']


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNextClose = () => {
        setNextOpen(false);
    };



    const formik = useFormik({
        initialValues: {
            asset_type: assetDetails.asset_type,
            current_value: assetDetails.current_value,
            asset_name: assetDetails.asset_name,

        },
        validationSchema: Yup.object({
            asset_type: Yup.string().required("Required"),
            current_value: Yup.number()
                .typeError("You must specify a number")
                .required("Required")
                .min(0),
            asset_name: Yup.string().required("Required").min(4, 'Too Short!').max(30, 'Too Long!'),

        }),
        onSubmit: (values: any) => {

            const keys = {
                asset_name: "",
                asset_type: "",
                current_value: 0
            }
            console.log(values);

            const assetRequest = Object.assign(keys, values)


            const SERVER = import.meta.env.VITE_SERVER;
            const url = urlcat(SERVER, `/asset/${assetDetails.id}`);
            console.log(url)
            const header = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            axios
                .put(url, assetRequest, header)
                .then((res) => {
                    setResponse(res.data.msg)
                    setOpen(!open)
                    setNextOpen(!nextOpen)
                    update()

                })
                .catch((error) => console.log(error.response.data.error));


            setDisable(true)
            setTimeout(() => {
                setDisable(false)
            }, 3000)

        },
    });

    return (
        <Box>
            <CreateOutlinedIcon onClick={handleClickOpen} sx={{ color: '#2852A0', cursor: 'pointer' }} />

            <Dialog onClose={handleClose} open={open} maxWidth='md' sx={{ width: '100%' }}>

                <Grid item xs={12} sx={{ p: '4rem' }} >
                    <Typography variant="h5" sx={{ mb: 5, textAlign: 'center' }}>Edit {assetDetails.asset_name}</Typography>

                    <form onSubmit={formik.handleSubmit}>
                        <Grid
                            container
                            spacing={5}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >

                            <Grid item xs={12} >
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Type*</Typography>
                                <FormControl sx={{ width: "100%" }}>
                                    <Select
                                        value={formik.values.asset_type}
                                        id="asset_type"
                                        name="asset_type"
                                        onChange={(e) => formik.handleChange(e)}
                                        onBlur={formik.handleBlur}
                                        sx={{ width: "100%" }}
                                    >
                                        {assetOptions.map((option, i) => (
                                            <MenuItem key={i} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {formik.touched.asset_type && formik.errors.asset_type ? (
                                    <div>{formik.errors.asset_type}</div>
                                ) : null}
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Current Value*</Typography>

                                <TextField
                                    required
                                    id="current_value"
                                    autoComplete="off"
                                    name="current_value"
                                    type='number'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                    value={formik.values.current_value}
                                />
                                {formik.touched.current_value &&
                                    formik.errors.current_value ? (
                                    <div>{formik.errors.current_value}</div>
                                ) : null}
                            </Grid>

                            <Grid item xs={12} >
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Name*</Typography>

                                <TextField
                                    required
                                    id="asset_name"
                                    autoComplete="off"
                                    name="asset_name"
                                    type='text'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                    value={formik.values.asset_name}
                                />
                                {formik.touched.asset_name &&
                                    formik.errors.asset_name ? (
                                    <div>{formik.errors.asset_name}</div>
                                ) : null}
                            </Grid>

                        </Grid>


                        <Grid item sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <Button disabled={disable} onClick={handleClose} sx={{
                                background: '#white',
                                color: '#2852A0',
                                letterSpacing: '0.2rem',
                                mt: '3rem',
                                pl: '3rem',
                                pr: '3rem',
                                mb: '0.5rem',
                                border: '0.1rem solid #2852A0',
                                borderRadius: '0.7rem',
                                '&:hover': {
                                    backgroundColor: '#254D71',
                                    color: "white"
                                },

                            }}> Back
                            </Button>
                            <Button disabled={disable} type="submit" sx={{
                                background: '#2852A0',
                                color: '#FFFBF0',
                                letterSpacing: '0.2rem',
                                mt: '3rem',
                                pl: '3rem',
                                pr: '3rem',
                                mb: '0.5rem',
                                borderRadius: '0.7rem',
                                border: '0.1rem solid #2852A0',
                                '&:hover': {
                                    backgroundColor: '#254D71',
                                },

                            }}> Submit
                            </Button>
                        </Grid>

                    </form>
                </Grid >

            </Dialog>

            <Dialog onClose={handleNextClose} open={nextOpen} maxWidth='md' sx={{ width: '100%' }}>
                <Box sx={{ p: '3rem' }}>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>{response}</Typography>
                </Box>
            </Dialog>


        </Box>
    )
}

export default AssetEditDialog