import React, { useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CssBaseline, Typography,makeStyles,InputAdornment ,Input} from "@mui/material"
import axios from 'axios';
import { SearchBar } from "@mui/icons-material";



export default function Users() {
 

  const baseUrl='https://fakestoreapi.com/users'
  const [users, setUsers] = useState([]);
  const [searched, setSearched] = useState([]);
  
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
  return (
    <>
     <CssBaseline />
            <Typography variant="h2" component="h1" gutterBottom>
                Users list 
            </Typography>
            <Typography>
            <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
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
          {users.map((row,id) => (
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name.firstname}  {row.name.lastname} 
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.address.city} {row.address.city} {row.address.street} {row.address.number}   </TableCell>
         
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
