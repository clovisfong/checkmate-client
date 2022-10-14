import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Container } from '@mui/system'
import React, { FC, useEffect, useState } from "react";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import DeleteDialog from '../DeleteDialog';
import IncomeEditDialog from '../IncomeEditDialog';
import { IAssetData } from '../../Interface';
import IncomeAddDialog from '../IncomeAddDialog';
import AssetEditDialog from '../AssetEditDialog';
import AssetAddDialog from '../AssetAddDialog';

interface Props {
    assetData: IAssetData[];
    update: () => void
}

const AssetEntries = ({ assetData, update }: Props) => {


    return (
        <Box>
            <TableContainer component={Box} sx={{}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Asset Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Asset Type</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Current Value</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                                <AssetAddDialog update={update} />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {assetData.map((asset: IAssetData) =>
                            <React.Fragment key={asset.id}>

                                {/* <Box sx={{ mt: '1rem' }}></Box> */}
                                <TableRow
                                    sx={{
                                        backgroundColor: '#F2F2F2',
                                        '&:last-child td, &:last-child th': { border: 0, borderRadius: '5' }
                                    }}>
                                    <TableCell sx={{ fontSize: '0.9rem' }}>{asset.asset_name}</TableCell>
                                    <TableCell sx={{ fontSize: '0.9rem' }}>{asset.asset_type}</TableCell>
                                    <TableCell sx={{ fontSize: '0.9rem' }}>{asset.current_value.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'SGD',
                                        maximumFractionDigits: 0,
                                    })}</TableCell>

                                    <TableCell align="right" >
                                        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'end' }}>
                                            <AssetEditDialog assetDetails={asset} update={update} />
                                            <DeleteDialog financialEntry={asset.asset_name} financialId={asset.id} update={update} type='asset' />
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

export default AssetEntries