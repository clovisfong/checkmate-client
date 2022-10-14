import React, { FC, useContext, useEffect, useState } from "react";
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
import { IDebtData2 } from '../Interface';
import axios from 'axios';
import urlcat from 'urlcat';

import UserDetailsContext from "./contextStore/userdetails-context";

interface Props {
    update: () => void
}

interface FormProps {
    resetForm: () => IDebtData2
}


const DebtAddDialog = ({ update }: Props) => {
    const [open, setOpen] = useState(false);
    const [nextOpen, setNextOpen] = useState(false);
    const [disable, setDisable] = useState(false)
    const [response, setResponse] = useState('')


    const userContext = useContext(UserDetailsContext)
    const token: any = sessionStorage.getItem('token')

    const birthDate = new Date(userContext.date_of_birth)
    const currentDate = new Date // use current date
    const currentAge = differenceInCalendarYears(currentDate, birthDate)
    const yearsToExpectancy = userContext.life_expectancy - currentAge

    const debtOptions = ['Home', 'Personal', 'Car', 'Credit Card', 'Education', 'Others']
    const statusOptions = ['Current', 'Future', 'End']
    const commitmentPeriodOptions: number[] = [0]

    const yearLength = yearsToExpectancy <= 35 ? yearsToExpectancy : 35

    for (let year = 1; year <= yearLength; year++) {
        commitmentPeriodOptions.push(year)
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
            debt_type: '',
            loan_amount: '',
            debt_name: '',
            interest_rate: '',
            debt_status: '',
            commitment_period_months: '',
            start_date: '',
            monthly_commitment: '',

        },
        validationSchema: Yup.object({
            debt_type: Yup.string().required("Required"),
            loan_amount: Yup.number()
                .typeError("You must specify a number")
                .required("Required")
                .min(0),
            debt_name: Yup.string().required("Required").min(4, 'Too Short!').max(30, 'Too Long!'),
            interest_rate: Yup.number()
                .typeError("You must specify a number")
                .required("Required"),
            debt_status: Yup.string().required("Required"),
            commitment_period_months: Yup.number().required("Required"),
            start_date: Yup.date()
                .min(new Date(), "Please put future date"),
            monthly_commitment: Yup.number()
                .typeError("You must specify a number")
                .min(0),

        }),
        onSubmit: (values: any, { resetForm }: any) => {

            if (values.debt_status === 'Current') {
                values.start_date = format(new Date(), "yyyy-MM-dd")
            }


            if (values.monthly_commitment === '' || values.monthly_commitment === 0) {
                values.monthly_commitment = 0
                const monthlyInterestRate = values.interest_rate / 12 / 100
                const numerator = monthlyInterestRate * Math.pow((1 + monthlyInterestRate), (values.monthly_commitment * 12))
                const denominator = Math.pow((1 + monthlyInterestRate), (values.monthly_commitment * 12)) - 1
                const calculatedMonthlyRepayment = values.loan_amount * numerator / denominator
                values.monthly_commitment = calculatedMonthlyRepayment
            }

            const keys = {
                debt_name: "",
                debt_type: "",
                debt_status: "",
                loan_amount: 0,
                interest_rate: 0,
                commitment_period_months: 0,
                start_date: "",
                monthly_commitment: 0
            }


            const debtRequest = Object.assign(keys, values)

            const SERVER = import.meta.env.VITE_SERVER;
            const url = urlcat(SERVER, `/debt/`);


            const header = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            axios
                .post(url, debtRequest, header)
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



    return (
        <Box>
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
                    <Typography variant="h5" sx={{ mb: 5, textAlign: 'center' }}>Add Debt</Typography>

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
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Type*</Typography>
                                <FormControl sx={{ width: "100%" }}>
                                    <Select
                                        value={formik.values.debt_type}
                                        id="debt_type"
                                        name="debt_type"
                                        onChange={(e) => formik.handleChange(e)}
                                        onBlur={formik.handleBlur}
                                        sx={{ width: "100%" }}
                                    >
                                        {debtOptions.map((option, i) => (
                                            <MenuItem key={i} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {formik.touched.debt_type && formik.errors.debt_type ? (
                                    <div>{formik.errors.debt_type}</div>
                                ) : null}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Loan Amount*</Typography>

                                <TextField
                                    required
                                    id="loan_amount"
                                    autoComplete="off"
                                    name="loan_amount"
                                    type='number'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                    value={formik.values.loan_amount}
                                />
                                {formik.touched.loan_amount &&
                                    formik.errors.loan_amount ? (
                                    <div>{formik.errors.loan_amount}</div>
                                ) : null}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Name*</Typography>

                                <TextField
                                    required
                                    id="debt_name"
                                    autoComplete="off"
                                    name="debt_name"
                                    type='text'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                    value={formik.values.debt_name}
                                />
                                {formik.touched.debt_name &&
                                    formik.errors.debt_name ? (
                                    <div>{formik.errors.debt_name}</div>
                                ) : null}
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Interest Rate (in %)*</Typography>
                                <TextField
                                    id="interest_rate"
                                    autoComplete="off"
                                    name="interest_rate"
                                    type='number'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                    value={formik.values.interest_rate}
                                />
                                {formik.touched.interest_rate && formik.errors.interest_rate ? (
                                    <div>{formik.errors.interest_rate}</div>
                                ) : null}
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Status*</Typography>
                                <FormControl sx={{ width: "100%" }}>
                                    <Select
                                        value={formik.values.debt_status}
                                        id="debt_status"
                                        name="debt_status"
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
                                {formik.touched.debt_status && formik.errors.debt_status ? (
                                    <div>{formik.errors.debt_status}</div>
                                ) : null}
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Commitment Period (in years)*</Typography>
                                <FormControl sx={{ width: "100%" }}>
                                    <Select
                                        value={formik.values.commitment_period_months}
                                        id="commitment_period_months"
                                        name="commitment_period_months"
                                        onChange={(e) => formik.handleChange(e)}
                                        onBlur={formik.handleBlur}
                                        sx={{ width: "100%" }}
                                    >
                                        {commitmentPeriodOptions.map((option, i) => (
                                            <MenuItem key={i} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {formik.touched.commitment_period_months && formik.errors.commitment_period_months ? (
                                    <div>{formik.errors.commitment_period_months}</div>
                                ) : null}
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Start Date*</Typography>
                                <TextField
                                    required
                                    disabled={formik.values.debt_status === 'Future' ? false : true}
                                    id="start_date"
                                    autoComplete="off"
                                    name="start_date"
                                    type='date'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                    value={formik.values.debt_status === 'Future' ? formik.values.start_date : format(new Date(), "yyyy-MM-dd")}
                                />
                                {formik.touched.start_date && formik.errors.start_date ? (
                                    <div>{formik.errors.start_date}</div>
                                ) : null}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Monthly Commitment</Typography>

                                <TextField
                                    id="monthly_commitment"
                                    autoComplete="off"
                                    name="monthly_commitment"
                                    type='number'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                    value={formik.values.monthly_commitment}
                                />
                                {formik.touched.monthly_commitment &&
                                    formik.errors.monthly_commitment ? (
                                    <div>{formik.errors.monthly_commitment}</div>
                                ) : null}
                            </Grid>



                        </Grid>


                        <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>

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

export default DebtAddDialog