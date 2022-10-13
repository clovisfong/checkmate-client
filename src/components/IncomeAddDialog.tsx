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
import { IIncomeData, IIncomeData2, IUserDetails } from '../Interface';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import urlcat from 'urlcat';




interface Props {
    update: () => void
}

interface FormProps {
    resetForm: () => IIncomeData2
}

const IncomeAddDialog = ({ update }: Props) => {
    const [open, setOpen] = useState(false);
    const [nextOpen, setNextOpen] = useState(false);
    const [disable, setDisable] = useState(false)
    const [response, setResponse] = useState('')


    const token: any = sessionStorage.getItem('token')
    const userDetails: IUserDetails = jwt_decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWUiOiJnZ2ciLCJkYXRlX29mX2JpcnRoIjoiMTk5My0wMS0xMyIsImdlbmRlciI6IlByZWZlciBub3QgdG8gc2F5IiwiZW1haWwiOiJnZ2dAaG90bWFpbC5jb20iLCJyZXRpcmVtZW50X2FnZSI6NjMsInJldGlyZW1lbnRfbGlmZXN0eWxlIjoiTWFpbnRhaW4iLCJsZWdhY3lfYWxsb2NhdGlvbiI6MCwibGlmZV9leHBlY3RhbmN5Ijo4NH0.tVhbiKT3-NUsG5o_AnLxa4vhVu4HJMpeMReqft3DA4M")

    const birthDate = new Date(userDetails.date_of_birth)
    const currentDate = new Date // use current date
    const currentAge = differenceInCalendarYears(currentDate, birthDate)
    const yearsToExpectancy = userDetails.life_expectancy - currentAge

    const freqOptions = ['Monthly', 'Annually']
    const incomeOptions = ['Salary', 'Investment', 'Property', 'Business', 'Bonus', 'Other Sources']
    const statusOptions = ['Current', 'Future']
    const durationOptions: number[] = [0]

    for (let year = 1; year <= yearsToExpectancy; year++) {
        durationOptions.push(year)
    }


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
            income_name: '',
            income_type: '',
            income_status: '',
            amount: '',
            frequency: '',
            duration_months: '',
            start_date: '',
            growth_rate: ""

        },
        validationSchema: Yup.object({
            income_type: Yup.string().required("Required"),
            amount: Yup.number()
                .typeError("You must specify a number")
                .required("Required")
                .min(0),
            income_name: Yup.string().required("Required").min(4, 'Too Short!').max(30, 'Too Long!'),
            frequency: Yup.string().required("Required"),
            income_status: Yup.string().required("Required"),
            duration_months: Yup.number().required("Required"),
            start_date: Yup.date()
                .min(new Date(), "Please put future date"),
            growth_rate: Yup.number()
                .typeError("You must specify a number")
        }),
        onSubmit: (values: any, { resetForm }: any) => {

            if (values.income_status === 'Current') {
                values.start_date = format(new Date(), "yyyy-MM-dd")
            }

            values['duration_months'] = values['duration_months'] * 12


            const keys = {
                income_name: "",
                income_type: "",
                income_status: "",
                amount: 0,
                frequency: "",
                duration_months: 0,
                start_date: "",
                growth_rate: 0
            }

            const incomeRequest = Object.assign(keys, values)


            const SERVER = import.meta.env.VITE_SERVER;
            const url = urlcat(SERVER, `/income/`);

            const header = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            axios
                .post(url, incomeRequest, header)
                .then((res) => {
                    setResponse(res.data.msg)
                    setOpen(!open)
                    setNextOpen(!nextOpen)
                    update()
                    resetForm()

                })
                .catch((error) => console.log(error.response.data.error));

            setDisable(true)
            setTimeout(() => {
                setDisable(false)
            }, 3000)

        },
    });

    console.log(response)


    return (
        <Box >
            <Button onClick={handleClickOpen} sx={{
                background: '#white',
                color: '#2852A0',
                letterSpacing: '0.2rem',
                pl: '1rem',
                pr: '1rem',
                border: '0.1rem solid #2852A0',
                borderRadius: '0.7rem',
                '&:hover': {
                    backgroundColor: '#254D71',
                    color: "white"
                },

            }}>+ Add</Button>
            <Dialog onClose={handleClose} open={open} maxWidth='md' sx={{ width: '100%' }}>


                <Grid item xs={12} sx={{ p: '4rem' }} >
                    <Typography variant="h5" sx={{ mb: 5, textAlign: 'center' }}>Add Income</Typography>

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

                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Type</Typography>
                                <FormControl sx={{ width: "100%" }}>
                                    <Select
                                        value={formik.values.income_type}
                                        id="income_type"
                                        name="income_type"
                                        onChange={(e) => formik.handleChange(e)}
                                        onBlur={formik.handleBlur}
                                        sx={{ width: "100%" }}
                                    >
                                        {incomeOptions.map((option, i) => (
                                            <MenuItem key={i} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {formik.touched.income_type && formik.errors.income_type ? (
                                    <div>{formik.errors.income_type}</div>
                                ) : null}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Amount</Typography>

                                <TextField
                                    required
                                    id="amount"
                                    autoComplete="off"
                                    name="amount"
                                    type='number'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                    value={formik.values.amount}
                                />
                                {formik.touched.amount &&
                                    formik.errors.amount ? (
                                    <div>{formik.errors.amount}</div>
                                ) : null}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Name</Typography>

                                <TextField
                                    required
                                    id="income_name"
                                    autoComplete="off"
                                    name="income_name"
                                    type='text'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                    value={formik.values.income_name}
                                />
                                {formik.touched.income_name &&
                                    formik.errors.income_name ? (
                                    <div>{formik.errors.income_name}</div>
                                ) : null}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Frequency</Typography>
                                <FormControl sx={{ width: "100%" }}>
                                    <Select
                                        value={formik.values.frequency}
                                        id="frequency"
                                        name="frequency"
                                        onChange={(e) => formik.handleChange(e)}
                                        onBlur={formik.handleBlur}
                                        sx={{ width: "100%" }}
                                    >
                                        {freqOptions.map((option, i) => (
                                            <MenuItem key={i} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {formik.touched.frequency && formik.errors.frequency ? (
                                    <div>{formik.errors.frequency}</div>
                                ) : null}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Status</Typography>
                                <FormControl sx={{ width: "100%" }}>
                                    <Select
                                        value={formik.values.income_status}
                                        id="income_status"
                                        name="income_status"
                                        onChange={(e) => formik.handleChange(e)}
                                        onBlur={formik.handleBlur}
                                        sx={{ width: "100%" }}
                                    >
                                        {statusOptions.map((option, i) => (
                                            <MenuItem key={i} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {formik.touched.income_status && formik.errors.income_status ? (
                                    <div>{formik.errors.income_status}</div>
                                ) : null}
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Duration (in years)</Typography>
                                <FormControl sx={{ width: "100%" }}>
                                    <Select
                                        value={formik.values.duration_months}
                                        id="duration_months"
                                        name="duration_months"
                                        onChange={(e) => formik.handleChange(e)}
                                        onBlur={formik.handleBlur}
                                        sx={{ width: "100%" }}
                                    >
                                        {durationOptions.map((option, i) => (
                                            <MenuItem key={i} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {formik.touched.duration_months && formik.errors.duration_months ? (
                                    <div>{formik.errors.duration_months}</div>
                                ) : null}
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Start Date</Typography>
                                <TextField
                                    required
                                    disabled={formik.values.income_status === 'Future' ? false : true}
                                    id="start_date"
                                    autoComplete="off"
                                    name="start_date"
                                    type='date'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                    value={formik.values.income_status === 'Future' ? formik.values.start_date : format(new Date(), "yyyy-MM-dd")}
                                />
                                {formik.touched.start_date && formik.errors.start_date ? (
                                    <div>{formik.errors.start_date}</div>
                                ) : null}
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Growth Rate (in %)</Typography>
                                <TextField
                                    id="growth_rate"
                                    autoComplete="off"
                                    name="growth_rate"
                                    type='number'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                    value={formik.values.growth_rate}
                                />
                                {formik.touched.growth_rate && formik.errors.growth_rate ? (
                                    <div>{formik.errors.growth_rate}</div>
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
    );
}

export default IncomeAddDialog