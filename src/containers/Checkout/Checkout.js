import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Billing from './Billing/Billing';


class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    // Get the praameter values for ingredients from "Build page" and setting the state
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                // ['salad', '1']
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: price });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/billing');
    }

    render() {
        console.log(this.state);

        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.path + '/billing'}
                    // component={Billing}
                    render={
                        (props) => (
                            <Billing
                                ingredients={this.state.ingredients}
                                price={this.state.totalPrice}
                                {...props} />
                        )
                    }
                />
            </div>
        );
    }
}

export default Checkout;