import React, { useState, useEffect } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {
  Grid,
  Card,
  CardContent} from "@material-ui/core/";
import { CssBaseline, IconButton, Typography } from "@mui/material"
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Products() {

const [prod, setProds] = useState([]);
  useEffect(() => {
       let unmounted = false;
       console.log("Running effect to fetch data");
    
       setTimeout(() => {
         console.log("Data loaded for page");
    
         if (!unmounted) {
          axios.get('https://fakestoreapi.com/products').then(result => {
            setProds(result.data);
            console.log(result.data);
           
           
        })
          
         }
       }, 4);
    
       return () => {
         unmounted = true;
       };
     }, []);
     return (
      <>
    <CssBaseline />
            <Typography variant="h2" component="h1" gutterBottom>
                Products list 
            </Typography>
      <IconButton color="primary" aria-label="upload picture" component="span">
       <Link to={`/AddProducts`} className="btn btn-success">
       <AddIcon/> 
                               </Link>
                             
  </IconButton>
 <br/>
 <TableContainer component={Paper}>
          <Grid
           
            container
            spacing={2}
            direction="row"
           //justifyContent="flex-start"
           //alignItems="flex-stat"
          >
            {prod.map((row) => (
              <Grid item xs={3} key={row.id}>
              <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="img"
        height="auto"
        image={row.image}
      />
      <CardContent>
        <Typography gutterBottom variant="p" component="div">
        {row.title}
        </Typography>
       
        <Typography variant="body2" color="text.secondary">
        {row.price}$
        </Typography>
      </CardContent>
      <CardActions>
     
    
     
       <IconButton color="primary" aria-label="upload picture" component="span">
       <Link to={`/edit/${row.id}`} className="btn btn-success">
       <ModeEditOutlineIcon />
                               </Link>

  </IconButton>
  <IconButton color="primary" aria-label="upload picture" component="span">
       <Link to={`/Delete/${row.id}`} className="btn btn-success">
       <DeleteIcon />    
                               </Link>
 
  </IconButton>
  <IconButton color="primary" aria-label="upload picture" component="span">
       <Link to={`/more/${row.id}`} className="btn btn-success">
       <MoreHorizIcon/> 
                               </Link>
                             
  </IconButton>
 
     
      </CardActions>
    </Card>
              </Grid>
            ))}
          </Grid>
          </TableContainer>
      
      </>
    );
  }
  