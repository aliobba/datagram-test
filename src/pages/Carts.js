import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { CssBaseline, Typography } from "@mui/material"
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';




export default function Users() {


  const baseUrl = 'https://fakestoreapi.com/carts'
  const [carts, setCarts] = useState([]);
  const [searched, setSearched] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get(baseUrl).then(result => {
      setCarts(result.data);
      console.log('test',result.data);


    })
  }, []);

  const requestSearch = (searchedVal: string) => {
    const filteredRows = carts.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setCarts(filteredRows);
  };

  
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };


  const requestSort = () => {
    if (sortOrder === 'asc') {
      setSortOrder('desc');
      carts.sort((a, b) => (a.date> b.date) ? 1 : -1);
    } else {
      setSortOrder('asc');
      carts.sort((a, b) => (b.date > a.date) ? 1 : -1);
    }
  };

  const requestSortEmail = () => {
    if (sortOrder === 'asc') {
      setSortOrder('desc');
      carts.sort((a, b) => (a.products.length > b.products.length) ? 1 : -1);
    } else {
      setSortOrder('asc');
      carts.sort((a, b) => (b.products.length > a.products.length) ? 1 : -1);
    }
  };


  return (
    <>
      <CssBaseline />
      <Typography variant="h2" component="h1" gutterBottom>
      Carts list
      </Typography>
      {/* <Typography>
            <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
                </Typography> */}
      <TableContainer component={Paper}>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sortDirection={carts} >
                <TableSortLabel
                  active={true}
                  direction={sortOrder}
                  onClick={() => requestSort()}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell  sortDirection={carts} align="center">
              
               <TableSortLabel
                  active={true}
                  direction={sortOrder}
                  onClick={() =>requestSortEmail()}
                  
                >
                Count
                </TableSortLabel> 
                </TableCell>
             
              <TableCell align="center">Action</TableCell>
       


            </TableRow>
          </TableHead>
          <TableBody>
            {carts.map((row, id) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                { moment(row.date).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="center" >   { row.products.length}</TableCell>
               
                <TableCell align="center">
                <Link to={{
                      pathname: '/Morecart',
                      state: row
                    }} >
                                
                  <MoreHorizIcon/>      
                    </Link>
                
                  </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
