import React from 'react';
import ReactDOM from 'react-dom';
import Products from './components/products';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch} from 'react-router-dom';
import { Route } from 'react-router-dom';
import NavigationBar from './components/navigationBar';

ReactDOM.render(
    <BrowserRouter>
        <NavigationBar />
        <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
          <Switch>
        <Route exact path="/products" component={Products} />
        </Switch>
        </div>
        <Footer />
    </BrowserRouter>,
    document.getElementById('root')
);