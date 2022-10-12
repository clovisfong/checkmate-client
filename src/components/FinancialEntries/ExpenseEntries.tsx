import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Container } from '@mui/system'
import React, { FC, useEffect, useState } from "react";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import DeleteDialog from '../DeleteDialog';
import IncomeEditDialog from '../IncomeEditDialog';
import { IExpenseData, IIncomeData } from '../../Interface';
import IncomeAddDialog from '../IncomeAddDialog';
import ExpenseEditDialog from '../ExpenseEditDialog';
import ExpenseAddDialog from '../ExpenseAddDialog';

interface Props {
    expensesData: IExpenseData[];
    update: () => void
}

const ExpenseEntries = ({ expensesData, update }: Props) => {




    return (
        <Box>
            <TableContainer component={Box} sx={{}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Expense Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Expense Type</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                                <ExpenseAddDialog update={update} />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {expensesData.map((expense: IExpenseData) =>
                            <React.Fragment key={expense.id}>

                                {/* <Box sx={{ mt: '1rem' }}></Box> */}
                                <TableRow
                                    sx={{
                                        backgroundColor: '#F2F2F2',
                                        '&:last-child td, &:last-child th': { border: 0, borderRadius: '5' }
                                    }}>
                                    <TableCell sx={{ fontSize: '0.9rem' }}>{expense.expense_name}</TableCell>
                                    <TableCell sx={{ fontSize: '0.9rem' }}>{expense.expense_type}</TableCell>
                                    <TableCell sx={{ fontSize: '0.9rem' }}>{expense.amount}</TableCell>
                                    <TableCell sx={{ fontSize: '0.9rem' }}>{expense.expense_status}</TableCell>
                                    <TableCell align="right" >
                                        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'end' }}>
                                            <ExpenseEditDialog expenseDetails={expense} update={update} />
                                            <DeleteDialog financialEntry={expense.expense_name} financialId={expense.id} update={update} type='expense' />
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

export default ExpenseEntries