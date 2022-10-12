import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import DeleteAlert from '../DeleteEntry';

const IncomeEntries = () => {

    const incomeData = [
        {
            amount: 3000,
            created_at: "Mon, 10 Oct 2022 01:53:31 GMT",
            duration_months: 120,
            frequency: "Monthly",
            growth_rate: 1.5,
            id: 1,
            income_name: "Stocks",
            income_status: "Future",
            income_type: "Investment",
            start_date: "Thu, 10 Oct 2024 00:00:00 GMT",
            updated_at: "Mon, 10 Oct 2022 01:53:31 GMT"
        },
        {
            amount: 7000,
            created_at: "Mon, 10 Oct 2022 01:57:50 GMT",
            duration_months: 504,
            frequency: "Monthly",
            growth_rate: 2.0,
            id: 2,
            income_name: "Working Income",
            income_status: "Current",
            income_type: "Salary",
            start_date: "Mon, 10 Oct 2022 00:00:00 GMT",
            updated_at: "Mon, 10 Oct 2022 01:57:50 GMT"
        },
        {
            amount: 3000,
            created_at: "Mon, 10 Oct 2022 01:59:49 GMT",
            duration_months: 120,
            frequency: "Annually",
            growth_rate: 2.0,
            id: 4,
            income_name: "Year End Bonus",
            income_status: "Future",
            income_type: "Bonus",
            start_date: "Thu, 10 Oct 2024 00:00:00 GMT",
            updated_at: "Mon, 10 Oct 2022 01:59:49 GMT"
        }
    ]

    const handleEdit = () => {
        console.log('hi')
    }

    console.log()
    return (
        <Box>
            <TableContainer component={Box} sx={{}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Income Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Income Type</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                                <Button>+ Add</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {incomeData.map((income) =>
                            <React.Fragment key={income.id}>

                                {/* <Box sx={{ mt: '1rem' }}></Box> */}
                                <TableRow
                                    sx={{
                                        backgroundColor: '#F2F2F2',
                                        '&:last-child td, &:last-child th': { border: 0, borderRadius: '5' }
                                    }}>
                                    <TableCell sx={{ fontSize: '0.9rem' }}>{income.income_name}</TableCell>
                                    <TableCell sx={{ fontSize: '0.9rem' }}>{income.income_type}</TableCell>
                                    <TableCell sx={{ fontSize: '0.9rem' }}>{income.amount}</TableCell>
                                    <TableCell sx={{ fontSize: '0.9rem' }}>{income.income_status}</TableCell>
                                    <TableCell align="right" >
                                        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'end' }}>
                                            <CreateOutlinedIcon onClick={handleEdit} sx={{ color: '#2852A0', cursor: 'pointer' }} />
                                            {/* <RemoveCircleOutlineOutlinedIcon onClick={handleDelete} sx={{ color: '#2852A0', cursor: 'pointer' }} /> */}
                                            <DeleteAlert incomeName={income.income_name} />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        )}


                    </TableBody>
                </Table>

            </TableContainer>
        </Box >
    )
}

export default IncomeEntries