
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";

export default function Header(props) {
  //const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    //setOpen(!open);
    props.toogleDrawer(true)
  };

  const displayDesktop = () => {
    return (
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HOME
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
}