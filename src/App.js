import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Carts, Categories, Home, Login, Users,Products } from './pages'
import AddProducts from './pages/products/AddProducts'
import { Header, ContentAndFooter } from './components';

import { useCookies } from 'react-cookie';

function App() {
  const [token, setToken] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    if (cookies.token)
      setToken(cookies.token);

  }, [cookies.token])

  function HandleAuth(logged, token) {
   // console.log({ logged, token });
    setCookie('token', token, { path: '/', maxAge: 3600 });
    setToken(token)
  }

  function logout() {
    setToken(null);
    removeCookie('token');
  }

  return (
    <div className="App">
      {token ?
        <>
          <Header logout={logout} />
          <ContentAndFooter >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/carts" component={Carts} />
              <Route exact path="/categories" component={Categories} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/AddProducts" component={AddProducts} />
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
