import { Button, Container, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from "yup";
import React, { FC, useContext, useEffect, useState } from "react";
import { IUserDetails } from '../../Interface';
import { differenceInCalendarYears, format } from 'date-fns';
import { Box } from '@mui/system';
import UserDetailsContext from '../contextStore/userdetails-context';




const DebtForm = ({ setSearchParams, setFinancialInfo, financialInfo }: any) => {

    const [disable, setDisable] = useState(false)

    const userContext = useContext(UserDetailsContext)
    const token: any = sessionStorage.getItem('token')

    const birthDate = new Date(userContext.date_of_birth)
    const currentDate = new Date // use current date
    const currentAge = differenceInCalendarYears(currentDate, birthDate)
    const yearsToExpectancy = userContext.life_expectancy - currentAge


    const debtOptions = ['Home', 'Personal', 'Car', 'Credit Card', 'Education', 'Others']
    const statusOptions = ['Current', 'Future']
    const commitmentPeriodOptions: number[] = [0]

    const yearLength = yearsToExpectancy <= 35 ? yearsToExpectancy : 35


    for (let year = 1; year <= yearLength; year++) {
        commitmentPeriodOptions.push(year)
    }




    const formik = useFormik({
        initialValues: {
            debt_type: "",
            loan_amount: "",
            debt_name: "",
            interest_rate: "",
            debt_status: "",
            commitment_period_months: "",
            start_date: "",
            monthly_commitment: "",

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
            start_date: Yup.date().required("Required")
                .test("date-future", "Date must be in future", (date: any, context): boolean => {
                    if (context.parent.debt_status === 'Future' && date <= currentDate) {
                        return false
                    } else {
                        return true
                    }
                })
                .test("date-current", "Date must be today or earlier", (date: any, context): boolean => {
                    if (context.parent.debt_status === 'Current' && date > currentDate) {
                        return false
                    } else {
                        return true
                    }
                }),
            monthly_commitment: Yup.number()
                .typeError("You must specify a number")
                .min(0),

        }),
        onSubmit: (values: any) => {


            if (values.monthly_commitment === '') {
                const monthlyInterestRate = values.interest_rate / 12 / 100
                const numerator = monthlyInterestRate * Math.pow((1 + monthlyInterestRate), (values.commitment_period_months * 12))
                const denominator = Math.pow((1 + monthlyInterestRate), (values.commitment_period_months * 12)) - 1
                const calculatedMonthlyRepayment = values.loan_amount * numerator / denominator
                values.monthly_commitment = calculatedMonthlyRepayment.toFixed(2)
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


            if (financialInfo[2] === undefined) {
                setFinancialInfo([...financialInfo, debtRequest])
            } else {
                const financialArr = financialInfo.map((info: any, i: number) => {
                    if (i === 2) {
                        return info = debtRequest
                    } else {
                        return info
                    }
                })
                setFinancialInfo(financialArr)
            }

            setSearchParams({ section: 'assets' })
            setDisable(true)
            setTimeout(() => {
                setDisable(false)
            }, 3000)

        },
    });



    const handleClick = () => {
        setSearchParams({ section: 'expenses' })
    }

    console.log('debt side', financialInfo)


    return (
        <Container maxWidth='md' sx={{ width: '100%' }}>
            <Grid item xs={12} >
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
                                id="start_date"
                                autoComplete="off"
                                name="start_date"
                                type='date'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.start_date}
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

                        <Button disabled={disable} onClick={handleClick} sx={{
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

                        }}> Next: Assets
                        </Button>

                    </Grid>

                </form>
            </Grid >


        </Container>
    )
}

export default DebtForm