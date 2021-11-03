import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CssBaseline, Typography } from "@mui/material"
import axios from 'axios';




export default function Carts() {
  const [prod, setProds] = useState([]);
  
 useEffect(() => {
        axios.get('https://fakestoreapi.com/carts').then(result => {
            setProds(result.data);
            console.log(result.data);
           
           
        })
    }, []);
  return (
    <>
     <CssBaseline />
            <Typography variant="h2" component="h1" gutterBottom>
                Carts list 
            </Typography>
    <TableContainer component={Paper}>
    
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Full_Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Address</TableCell>
  
          
          </TableRow>
        </TableHead>
        <TableBody>
          {prod.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date} 
              </TableCell>

           
         
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
