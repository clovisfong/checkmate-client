import { useContext, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { differenceInCalendarYears, format } from 'date-fns';
import axios from 'axios';
import urlcat from 'urlcat';
import UserDetailsContext from "./contextStore/userdetails-context";




interface Props {
    update: () => void
}



const ExpenseAddDialog = ({ update }: Props) => {
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

    const freqOptions = ['Monthly', 'Annually']
    const expenseOptions = ['Personal', 'Insurance', 'Travel', 'Big Purchase', 'Marriage', 'Others']
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
            expense_type: '',
            amount: '',
            expense_name: '',
            frequency: '',
            expense_status: '',
            duration_months: '',
            start_date: '',
            inflation_rate: '',

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
                .test("date-future", "Date must be in future", (date: any, context): boolean => {
                    if (context.parent.expense_status === 'Future' && date <= currentDate) {
                        return false
                    } else {
                        return true
                    }
                }),
            inflation_rate: Yup.number()
                .typeError("You must specify a number")
        }),
        onSubmit: (values: any, { resetForm }: any) => {

            if (values.expense_status === 'Current') {
                values.start_date = format(new Date(), "yyyy-MM-dd")
            }

            if (values.inflation_rate === '') {
                values.inflation_rate = 0
            }

            const keys = {
                expense_name: "",
                expense_type: "",
                expense_status: "",
                amount: 0,
                frequency: "",
                duration_months: 0,
                start_date: "",
                inflation_rate: 0
            }

            const expenseRequest = Object.assign(keys, values)

            const SERVER = import.meta.env.VITE_SERVER;
            const url = urlcat(SERVER, `/expense/`);

            const header = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            axios
                .post(url, expenseRequest, header)
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
                    <Typography variant="h5" sx={{ mb: 5, textAlign: 'center' }}>Add Expense</Typography>
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
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Amount*</Typography>

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
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Name*</Typography>

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
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Frequency*</Typography>
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
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Status*</Typography>
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
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Duration (in years)*</Typography>
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
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Start Date*</Typography>
                                <TextField
                                    required
                                    disabled={formik.values.expense_status === 'Current' ? true : false}
                                    id="start_date"
                                    autoComplete="off"
                                    name="start_date"
                                    type='date'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                    value={formik.values.expense_status === 'Current' ? format(new Date(), "yyyy-MM-dd") : formik.values.start_date}
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

export default ExpenseAddDialog