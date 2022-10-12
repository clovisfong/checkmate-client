import { Button, Container, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from "yup";
import React, { FC, useEffect, useState } from "react";
import { IUserDetails } from '../../Interface';
import { differenceInCalendarYears, format } from 'date-fns';
import { Box } from '@mui/system';



// const parseJwt = (token: string) => {
//     var base64Url = token.split(".")[1];
//     var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//     var jsonPayload = decodeURIComponent(
//         window
//             .atob(base64)
//             .split("")
//             .map(function (c) {
//                 return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//             })
//             .join("")
//     );
//     return JSON.parse(jsonPayload);
// };
// const token: any = sessionStorage.getItem('token')
// const userDetails: IUserDetails = parseJwt(token)

// const birthDate = new Date(userDetails.date_of_birth)
// const currentDate = new Date // use current date
// const currentAge = differenceInCalendarYears(currentDate, birthDate) // 24
// const yearsToExpectancy = userDetails.life_expectancy - currentAge

const freqOptions = ['Monthly', 'Annually']
const expenseOptions = ['Personal', 'Insurance', 'Travel', 'Big Purchase', 'Marriage', 'Others']
const statusOptions = ['Current', 'Future']
const durationOptions: number[] = [0]

for (let year = 1; year <= 100; year++) {
    durationOptions.push(year)
}





const ExpenseForm = ({ setSearchParams, setFinancialInfo, financialInfo }: any) => {

    const [disable, setDisable] = useState(false)


    const formik = useFormik({
        initialValues: {
            expense_type: "",
            amount: "",
            expense_name: "",
            frequency: "",
            expense_status: "",
            duration_months: "",
            start_date: "",
            inflation_rate: "",

        },
        validationSchema: Yup.object({
            expense_type: Yup.string().required("Required"),
            amount: Yup.number()
                .typeError("You must specify a number")
                .required("Required")
                .min(0),
            expense_name: Yup.string().required("Required").min(4, 'Too Short!').max(30, 'Too Long!'),
            frequency: Yup.string().required("Required"),
            expense_status: Yup.string().required("Required"),
            duration_months: Yup.number().required("Required"),
            start_date: Yup.date()
                .min(new Date(), "Please put future date"),
            inflation_rate: Yup.number()
                .typeError("You must specify a number")
        }),
        onSubmit: (values: any) => {

            if (values.expense_status === 'Current') {
                values.start_date = format(new Date(), "yyyy-MM-dd")
            }
            console.log(values);
            setSearchParams({ section: 'debts' })
            setFinancialInfo([...financialInfo, values])
            setDisable(true)
            setTimeout(() => {
                setDisable(false)
            }, 3000)
        },
    });

    console.log(financialInfo)

    const handleClick = () => {
        setSearchParams({ section: 'income' })
    }


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
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Type</Typography>
                            <FormControl sx={{ width: "100%" }}>
                                <Select
                                    value={formik.values.expense_type}
                                    id="expense_type"
                                    name="expense_type"
                                    onChange={(e) => formik.handleChange(e)}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                >
                                    {expenseOptions.map((option, i) => (
                                        <MenuItem key={i} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {formik.touched.expense_type && formik.errors.expense_type ? (
                                <div>{formik.errors.expense_type}</div>
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
                                id="expense_name"
                                autoComplete="off"
                                name="expense_name"
                                type='text'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.expense_name}
                            />
                            {formik.touched.expense_name &&
                                formik.errors.expense_name ? (
                                <div>{formik.errors.expense_name}</div>
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
                                    value={formik.values.expense_status}
                                    id="expense_status"
                                    name="expense_status"
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
                            {formik.touched.expense_status && formik.errors.expense_status ? (
                                <div>{formik.errors.expense_status}</div>
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
                                disabled={formik.values.expense_status === 'Future' ? false : true}
                                id="start_date"
                                autoComplete="off"
                                name="start_date"
                                type='date'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.expense_status === 'Future' ? formik.values.start_date : format(new Date(), "yyyy-MM-dd")}
                            />
                            {formik.touched.start_date && formik.errors.start_date ? (
                                <div>{formik.errors.start_date}</div>
                            ) : null}
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Inflation Rate (in %)</Typography>
                            <TextField
                                id="inflation_rate"
                                autoComplete="off"
                                name="inflation_rate"
                                type='number'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.inflation_rate}
                            />
                            {formik.touched.inflation_rate && formik.errors.inflation_rate ? (
                                <div>{formik.errors.inflation_rate}</div>
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

                        }}> Next: Debts
                        </Button>

                    </Grid>

                </form>
            </Grid >


        </Container>
    )
}

export default ExpenseForm