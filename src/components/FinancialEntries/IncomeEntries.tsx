import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Container } from '@mui/system'
import React, { FC, useEffect, useState } from "react";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import DeleteDialog from '../DeleteDialog';
import IncomeEditDialog from '../IncomeEditDialog';
import { IIncomeData } from '../../Interface';
import IncomeAddDialog from '../IncomeAddDialog';

interface Props {
    incomeData: IIncomeData[];
    update: () => void
}

const IncomeEntries = ({ incomeData, update }: Props) => {



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
                                <IncomeAddDialog update={update} />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {incomeData.map((income: IIncomeData) =>
                            <React.Fragment key={income.id}>

                                {/* <Box sx={{ mt: '1rem' }}></Box> */}
                                <TableRow
                                    sx={{
                                        backgroundColor: '#F2F2F2',
                                        '&:last-child td, &:last-child th': { border: 0, borderRadius: '5' }
                                    }}>
                                    <TableCell sx={{ fontSize: '0.9rem' }}>{income.income_name}</TableCell>
                                    <TableCell sx={{ fontSize: '0.9rem' }}>{income.income_type}</TableCell>
                                    <TableCell sx={{ fontSize: '0.9rem' }}>{income.amount.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'SGD',
                                        maximumFractionDigits: 0,
                                    })}</TableCell>
                                    <TableCell sx={{ fontSize: '0.9rem' }}>{income.income_status}</TableCell>
                                    <TableCell align="right" >
                                        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'end' }}>
                                            <IncomeEditDialog incomeDetails={income} update={update} />
                                            <DeleteDialog financialEntry={income.income_name} financialId={income.id} update={update} type='income' />
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