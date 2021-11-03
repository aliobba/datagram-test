import React, { useState, useEffect } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import {
  Grid,
  Card,
  CardContent} from "@material-ui/core/";
import { CssBaseline, IconButton, Typography } from "@mui/material"
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MediaCard() {

const [prod, setProds] = useState([]);
  
  useEffect(() => {
         axios.get('https://fakestoreapi.com/products').then(result => {
             setProds(result.data);
             console.log(result.data);
            
            
         })
     }, []);
     return (
      <div >
       
      <CssBaseline />
      <IconButton color="primary" aria-label="upload picture" component="span">
       <Link to={`/AddProducts`} className="btn btn-success">
       <AddIcon/> 
                               </Link>
                             
  </IconButton>
 <br/>
          
          <Grid
           
            container
            spacing={2}
            direction="row"
           // justifyContent="flex-start"
           // alignItems="flex-stat"
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
      
      </div>
    );
  }
  