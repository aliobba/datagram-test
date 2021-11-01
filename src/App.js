import React, { useState, useRef, useEffect } from 'react'
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Carts, Categories, Home, Login, Users } from './pages'
import { Header, ContentAndFooter, Drawer } from './components';
import { Typography } from '@mui/material';
import Products from './pages/Products';
import { useCookies } from 'react-cookie';

function App() {
  const [token, setToken] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  //const [openDrawer, setopenDrawer] = useState(false);

  useEffect(() => {
    if (cookies.token)
      setToken(cookies.token);

  })

  const ref = useRef(null);

  function HandleAuth(logged, token) {
    console.log({ logged, token });
    setCookie('token', token, { path: '/', maxAge: 3600 });
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
      {token ?
        <>
          <Header toogleDrawer={toogleDrawer} />
          <ContentAndFooter >
            {/* <Drawer openDrawer={openDrawer} ref={ref} toogleDrawer={toogleDrawer} /> */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/carts" component={Carts} />
              <Route exact path="/categories" component={Categories} />
              <Route exact path="/products" component={Products} />
              </Switch>
          </ContentAndFooter>
        </>
        :
        <Login HandleAuth={HandleAuth} />
      }
    </div>
  );
}

export default App;
