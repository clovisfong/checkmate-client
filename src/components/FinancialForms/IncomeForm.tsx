import { Button, Container, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from "yup";
import React, { FC, useEffect, useState } from "react";
import { IIncomeData2, IIncomeFill, IUserDetails } from '../../Interface';
import { differenceInCalendarYears, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';



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
const incomeOptions = ['Salary', 'Investment', 'Property', 'Business', 'Bonus', 'Other Sources']
const statusOptions = ['Current', 'Future']
const durationOptions: number[] = [0]

for (let year = 1; year <= 100; year++) {
    durationOptions.push(year)
}





const IncomeForm = ({ setSearchParams, setFinancialInfo, financialInfo }: any) => {

    const [disable, setDisable] = useState(false)
    const [incomeDetails, setIncomeDetails] = useState(
        {
            income_type: "",
            amount: "",
            income_name: "",
            frequency: "",
            income_status: "",
            duration_months: "",
            start_date: "",
            growth_rate: ""
        }
    )

    const navigateToSurvey = useNavigate()



    const formik = useFormik({
        initialValues: {
            income_type: incomeDetails.income_type,
            amount: incomeDetails.amount,
            income_name: incomeDetails.income_name,
            frequency: incomeDetails.frequency,
            income_status: incomeDetails.income_status,
            duration_months: incomeDetails.duration_months,
            start_date: incomeDetails.start_date,
            growth_rate: incomeDetails.growth_rate,

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
        onSubmit: (values: any) => {

            if (values.income_status === 'Current') {
                values.start_date = format(new Date(), "yyyy-MM-dd")
            }
            console.log(values);
            setSearchParams({ section: 'expenses' })
            setFinancialInfo([values])
            setDisable(true)
            setTimeout(() => {
                setDisable(false)
            }, 3000)

        },
    });

    const handleClick = () => {
        navigateToSurvey('/survey')
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

                        }}> Next: Expenses
                        </Button>
                    </Grid>

                </form>
            </Grid >


        </Container>
    )
}

export default IncomeForm