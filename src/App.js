import React, { useState, useRef } from 'react'
import logo from './logo.svg';
import './App.css';
import { Login } from './pages'
import { Header, ContentAndFooter, Drawer } from './components';
import { Typography } from '@mui/material';

function App() {
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState(null);
  const [openDrawer, setopenDrawer] = useState(false);

  const ref = useRef(null);

  function HandleAuth(logged, token) {
    console.log({ logged, token });
    setLogged(logged)
    setToken(token)
  }

  function toogleDrawer(openDrawer) {
    /* console.log('header');
    console.log(openDrawer); */
    //setopenDrawer(openDrawer)
    ref.current.cleanValue()
  }

  return (
    <div className="App">
      {logged && token ?
        <>
          <Header toogleDrawer={toogleDrawer}/>
          <ContentAndFooter >
            <Drawer openDrawer={openDrawer} ref={ref}  toogleDrawer={toogleDrawer} />
          </ContentAndFooter>
        </>
        :
        <Login HandleAuth={HandleAuth} />
      }
    </div>
  );
}

export default App;
