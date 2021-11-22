import React, { useState, useEffect } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Button, CardContent, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Products() {

  const [open, setOpen] = React.useState(false);
  const [prod, setProds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idTodelete, setIdTodelete] = useState(null);

  useEffect(() => {
    setLoading(true)
    axios.get('https://fakestoreapi.com/products').then(result => {
      setProds(result.data);
      setLoading(false);

    })
      .catch((err) => {
        setLoading(false)
        alert('error loading product data')
      })

  }, []);

  const handleClickOpen = (id) => {
    setOpen(true);
    setIdTodelete(id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitDelete = () => {

    handleClose();
    setLoading(true);
    axios.delete('https://fakestoreapi.com/products/' + idTodelete).then(result => {
      //setProds(result.data);
      console.log(result);
      setLoading(false);
      alert('Product with ' + idTodelete + ' was deleted');
    })
      .catch((err) => {
        setLoading(false)
        alert('error loading product data')
      })
  }


  return (
    <div>
      {/* <CssBaseline /> */}
      <Typography variant="h2" component="h1" gutterBottom>
        Products list
      </Typography>
      <IconButton color="primary" aria-label="upload picture" component="span">
        <Link to={`/AddProducts`} className="btn btn-success">
          <AddIcon />
        </Link>

      </IconButton>
      <br />
      {loading ? <CircularProgress /> :
        <Grid container spacing={1} direction="row">

          {prod.map((row) => (
            <Grid item xs={4} key={row.id}>
              <Card>
                <CardMedia
                  component="img"
                  alt="img"
                  height="194"
                  image={row.image}
                />
                <CardContent>
                  <Typography noWrap gutterBottom variant="p" component="div">
                    {row.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {row.price}$
                  </Typography>
                </CardContent>
                <CardActions>



                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <Link to={{
                      pathname: '/EditProduct',
                      state: row
                    }} /* to={`/EditProduct`} params={{ user: row }} */ className="btn btn-success">
                      <ModeEditOutlineIcon />
                    </Link>

                  </IconButton>
                  <IconButton onClick={() => handleClickOpen(row.id)} color="primary" aria-label="upload picture" component="span">
                    {/* <Link to={`/Delete/${row.id}`} className="btn btn-success"> */}
                    <DeleteIcon />
                    {/* </Link> */}

                  </IconButton>
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <Link to={`/more/${row.id}`} className="btn btn-success">
                      <MoreHorizIcon />
                    </Link>

                  </IconButton>


                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

      }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to delete this product"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this product
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => submitDelete()} >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}
