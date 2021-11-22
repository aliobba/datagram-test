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

import moment from 'moment';


export default function Carts() {
  const [prod, setProds] = useState([]);
  
 useEffect(() => {
        axios.get('https://fakestoreapi.com/carts').then(response => {
            setProds(response.data);
           // console.log(response.data);
           
           
        }).catch(error => {
          //console.log('Error getting fake data: ' + error);
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
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Count </TableCell>
            <TableCell align="center">Action </TableCell>
      
  
          
          </TableRow>
        </TableHead>
        <TableBody>
          {prod.map((row,id) => (
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
             
              { moment(row.date).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell component="th" scope="row" align="center">

            { row.products.length}
          

              </TableCell>
            
              <TableCell component="th" scope="row" align="center">
                more
              </TableCell>
           
         
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
