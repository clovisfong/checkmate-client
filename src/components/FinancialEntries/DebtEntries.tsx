import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Container } from '@mui/system'
import React, { FC, useEffect, useState } from "react";
import DeleteDialog from '../DeleteDialog';
import { IDebtData } from '../../Interface';
import ExpenseAddDialog from '../ExpenseAddDialog';
import DebtEditDialog from '../DebtEditDialog';
import DebtAddDialog from '../DebtAddDialog';

interface Props {
  debtData: IDebtData[];
  update: () => void
}

const DebtEntries = ({ debtData, update }: Props) => {
  return (
    <Box>
      <TableContainer component={Box} sx={{}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Debt Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Debt Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Interest Rate</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Monthly Commitment</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Commitment Period</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                <DebtAddDialog update={update} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {debtData.map((debt: IDebtData) =>
              <React.Fragment key={debt.id}>

                <TableRow
                  sx={{
                    backgroundColor: '#F2F2F2',
                    '&:last-child td, &:last-child th': { border: 0, borderRadius: '5' }
                  }}>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{debt.debt_name}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{debt.debt_type}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{Number(debt.loan_amount).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'SGD',
                    maximumFractionDigits: 0,
                  })}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{debt.interest_rate}%</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{Number(debt.monthly_commitment).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'SGD',
                    maximumFractionDigits: 0,
                  })}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{debt.commitment_period_months / 12} years</TableCell>
                  <TableCell align="right" >
                    <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'end' }}>
                      <DebtEditDialog debtDetails={debt} update={update} />
                      <DeleteDialog financialEntry={debt.debt_name} financialId={debt.id} update={update} type='debt' />
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

export default DebtEntries