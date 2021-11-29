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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';





export default function Users() {


  const baseUrl = 'https://fakestoreapi.com/users'
  const [users, setUsers] = useState([]);
  const [searched, setSearched] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get(baseUrl).then(result => {
      setUsers(result.data);
      // console.log('test',result.data);


    })
  }, []);

  const requestSearch = (searchedVal: string) => {
    const filteredRows = users.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setUsers(filteredRows);
  };

  
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const requestSort = () => {
    if (sortOrder === 'asc') {
      setSortOrder('desc');
      users.sort((a, b) => (a.name.firstname > b.name.firstname) ? 1 : -1);
    } else {
      setSortOrder('asc');
      users.sort((a, b) => (b.name.firstname > a.name.firstname) ? 1 : -1);
    }
  };

  const requestSortEmail = () => {
    if (sortOrder === 'asc') {
      setSortOrder('desc');
      users.sort((a, b) => (a.email > b.email) ? 1 : -1);
    } else {
      setSortOrder('asc');
      users.sort((a, b) => (b.email > a.email) ? 1 : -1);
    }
  };


  return (
    <>
      <CssBaseline />
      <Typography variant="h2" component="h1" gutterBottom>
        Users list
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
              <TableCell sortDirection={users} >
                <TableSortLabel
                  active={true}
                  direction={sortOrder}
                  onClick={() => requestSort()}
                >
                  Full Name
                </TableSortLabel>
              </TableCell>
              <TableCell  sortDirection={users} align="center">
              
               <TableSortLabel
                  active={true}
                  direction={sortOrder}
                  onClick={() =>requestSortEmail()}
                  
                >
                Email
                </TableSortLabel> 
                </TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Action</TableCell>
       


            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, id) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name.firstname}  {row.name.lastname}
                </TableCell>
                <TableCell align="center" >{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.address.city} {row.address.city} {row.address.street} {row.address.number}   </TableCell>
                <TableCell align="center">
                <Link to={{
                      pathname: '/MoreUser',
                      state: row
                    }} >
                                
                                <MoreHorizIcon/>        </Link>
                
                  </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
