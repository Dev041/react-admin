import React from 'react';
import { Card, CardHeader, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';

const CardTable = () => {
  const tableData = [
    ['Sales', [1, 194.58], [11, 418.29]],
    ['Advertising', [6, 879.02], [9, 271.36]],
    ['Inventory', [4, 692.26], [9, 768.09]],
    ['Entertainment', [0.00], [0.00]],
    ['Product', [4, 652.10], [2, 529.90]],
  ];
  return (
    <Card elevation={3} sx={{ m: 2, height: "100%" }}>
      <CardHeader
        titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
        title="Account watchlist"
      />
      <Divider />
      <TableContainer component={Paper} sx={{mb: 2}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'grey' }}>Account</TableCell>
              <TableCell sx={{ color: 'grey' }}>This Month</TableCell>
              <TableCell sx={{ color: 'grey' }}>YTD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                {/* <TableCell>{row[0]}</TableCell> */}
                <TableCell>
                    <Typography fontWeight="bold">
                        {row[0]}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography fontWeight="bold">
                        {row[1].join(', ')}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography fontWeight="bold">
                        {row[2].join(', ')}
                    </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default CardTable;
