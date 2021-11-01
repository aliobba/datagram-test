import React from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText
} from "@mui/material";
/* import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail"; */
import { withRouter } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  drawer: {
    width: "1250px",
  }
});

const Drawer = props => {
  const { history } = props;
  const classes = useStyles();
  const itemsList = [
    {
      text: "Home",
      onClick: () => history.push("/")
    },
    {
      text: "About",
      onClick: () => history.push("/users")
    },
    {
      text: "Contact",
      onClick: () => history.push("/products")
    }
  ];
  return (
    <MUIDrawer variant="permanent" className={classes.drawer}>
      <List>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </MUIDrawer>
  );
};

export default withRouter(Drawer);


// import React, { useEffect, useImperativeHandle } from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

// export default function TemporaryDrawer({ props, ref }) {
//     const [state, setState] = React.useState({
//         left: false
//     });

//     /* useEffect(() => {

//         if (props.openDrawer) {
//             toggleDrawer('left', true);
//         }

//         return () => {
//             console.log(props.openDrawer);

//         }
//     }, [props.openDrawer]) */

//     //const { openDrawer } = props;

//     const toggleDrawer = (anchor, open) => (event) => {
//         if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//             return;
//         }

//         setState({ ...state, [anchor]: open });
//     };

//     const cleanValue = () => {
//         toggleDrawer('left', true);
//     };

//     useImperativeHandle(ref, () => {
//         return {
//             cleanValue: cleanValue
//         }
//     });

//     const list = (anchor) => (
//         <Box
//             sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//             role="presentation"
//             onClick={toggleDrawer(anchor, false)}
//             onKeyDown={toggleDrawer(anchor, false)}
//         >
//             <List>
//                 {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//                     <ListItem button key={text}>
//                         <ListItemIcon>
//                             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                         </ListItemIcon>
//                         <ListItemText primary={text} />
//                     </ListItem>
//                 ))}
//             </List>
//             <Divider />
//             <List>
//                 {['All mail', 'Trash', 'Spam'].map((text, index) => (
//                     <ListItem button key={text}>
//                         <ListItemIcon>
//                             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                         </ListItemIcon>
//                         <ListItemText primary={text} />
//                     </ListItem>
//                 ))}
//             </List>
//         </Box>
//     );

//     return (
//         <React.Fragment key={'left'}>
//             <Button onClick={toggleDrawer('left', true)}>{'left'}</Button>
//             <Drawer
//                 variant={'temporary'}
//                 anchor={'left'}
//                 open={state['left']}
//                 onClose={toggleDrawer('left', false)}
//             >
//                 {list('left')}
//             </Drawer>
//         </React.Fragment>
//     );
// }