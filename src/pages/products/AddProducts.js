import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@mui/material/CircularProgress';

///import { v4 as uuidv4 } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import { Input } from '@mui/material';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

function AddProducts(props) {
  const classes = useStyles()

  // const [inputFields, setInputFields] = useState([
  //   { id: uuidv4(), title: '', price: '' , category: '' ,description: '',image:''},
  // ]);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    /* var formData = new FormData()

 formData.append("title", title);
 formData.append("price", price);
 formData.append("category", category);
 formData.append("description", description);
 formData.append("image", image); */

    setLoading(true)
    axios.post('https://fakestoreapi.com/products', {
      title: title,
      price: parseFloat(price),
      description: description,
      image: image,
      category: category,
    })
      .then(result => {
        //console.log("InputFields", formData);
        //console.log({ result });
        if (result.status === 200) {
          setLoading(false)
          alert('Ajout effectué avec succès')
        }

        props.history.push("/products");
      }).catch(err => {


        setLoading(false)
        // console.log(err);
        alert(err)
      })
  };

  // const handleChangeInput = (id, event) => {
  //   const newInputFields = inputFields.map(i => {
  //     if(id === i.id) {
  //       i[event.target.name] = event.target.value
  //     }
  //     return i;
  //   })

  //   setInputFields(newInputFields);
  // }



  return (
    <Container>
      <h1>Add New Product</h1>
      <form className={classes.root} onSubmit={handleSubmit}>

        <div>
          <TextField
            name="title"
            label="title"
            variant="filled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /><br />
          <TextField
            name="price"
            label="price"
            variant="filled"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <TextField
            name="category"
            label="category"
            variant="filled"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          /><br />
          <TextField
            name="description"
            label="description"
            variant="filled"
            multiline

            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /><br />
          <TextField
            name="image"
            label="Image URL"
            variant="filled"
            multiline

            value={image}
            onChange={(e) => setImage(e.target.value)}
          /><br />
          {/* <Input accept="image/jpg, image/jpeg, image/png" type="file"  name="image" onChange={(e) => setSelectedFile(e.target.files[0]) }  /> */}
        </div>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"

          onClick={handleSubmit}
        >{loading ? <CircularProgress color="inherit" /> : 'Save'}</Button>

        {loading ? null : <Button
          className={classes.button}
          variant="contained"
          color="default"
          type="submit"

          onClick={handleSubmit}
        >Cancel</Button>}
      </form>
    </Container>
  );
}

export default AddProducts;