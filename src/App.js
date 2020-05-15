import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Authentication/Authentication';
import Logout from './containers/Authentication/Logout/Logout';
import * as actions from './reduxStore/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

//Components which can be loaded asynchronously
const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Authentication/Authentication');
});


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {

    // Default routes available for unauthenticated users
    let routes = (
      <Switch>
        {/* <Route path="/auth" component={Auth} /> */}
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    // Routes available for authenticated users
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          {/* <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} /> */}
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          {/* <Route path="/auth" component={Auth} /> */}
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

// Protecting orders and other IMP pages from unauthorized access
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
