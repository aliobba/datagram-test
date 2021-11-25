import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CssBaseline, Typography } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {  IconButton } from "@mui/material"
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
export default function Carts() {
  const [prod, setProds] = useState([]);
  const [loading, setLoading] = useState(false);
 useEffect(() => {
  setLoading(true)
        axios.get('https://fakestoreapi.com/carts').then(response => {
            setProds(response.data);
            setLoading(false);
           
           
        }).catch(error => {
          setLoading(false)
          alert('error loading product data')
          })
    }, []);


    const searchFilterFunction = event => {
      //text it contains the selected category
           var text = event.target.value;
           
           console.log(text)
    
           
       if (text === ""){
    
        console.log(text)
    
       
        axios.get((`https://fakestoreapi.com/carts?sort=desc`)).then(response => {
          setProds(response.data);
          setLoading(false);
            console.log('lol',response.data)
           
           
           
        });
    
    
       }
           else{
    
           console.log(text)
            axios.get((`https://fakestoreapi.com/products/category/${text}`)).then(response => {
              setProds(response.data);
                console.log('ines',response.data);
               
               
            });
    
           }
          
       
         
    
    };

  return (
    <>

     <CssBaseline />
            <Typography variant="h2" component="h1" gutterBottom>
                Carts list 
            </Typography>


          <select className="form-control" name="categorie" onChange={(val) => searchFilterFunction(val)}   aria-label="Default select example">
                          
                          
                          <option value=""> filtre by desc</option>
                          <option value=""> filtre by desc</option>
                       
             
                        
</select>
            {loading ? <CircularProgress /> :
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
                 
              <IconButton color="primary" aria-label="upload picture" component="span">
                  

                  <Link to={{
                      pathname: '/Morecart',
                      state: row
                    }} >
                                
                                   <MoreHorizIcon/>    </Link>
                  </IconButton>
              </TableCell>
           
         
            </TableRow>
          ))}
        </TableBody>
    
      </Table>
    </TableContainer>}
    </>
  );
}
