//Stateful Class [Main File]
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxilary from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/OrderPopup/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import APIErrorHandler from '../../hoc/APIErrorHandler/APIErrorHandler';
import axios from '../../axios-orders';

import * as actions from '../../reduxStore/actions/index';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    //Open the popup and allow for purchase
    purchaseHandler = () => {
        //If not authenticated let the popup openup
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        }
        // Else rediret to the signup page
        else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    //Cancel Button - Close the Modal and cancel purchase
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    //Continue Button - Continue to checkout
    purchaseContinueHandler = () => {
        //Checkout.js
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        //Get from redux store
        const disabledInfo = { ...this.props.ings };
        // {salad: true, meat: false, ...}
        for (let key in disabledInfo) {
            //Here checking if any ingredient is <= 0, if true then disable the button
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        //If ingredients throw error
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        //If ingredients exists -> lookup in redux store
        if (this.props.ings) {
            burger = (
                <Auxilary>
                    <h1 style={{ textAlign: "center" }}>Customize Your Burger</h1>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        // Now call the method from the React store
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        // Check for the authentication to display controls
                        isAuth={this.props.isAuthenticated}

                    />
                </Auxilary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }

        return (
            <Auxilary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilary>
        )
    }
}

//Redux
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        // Only display the checkout- contact screen if authenticated
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        //Dispatched from the actions/burgerBuilder
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(APIErrorHandler(BurgerBuilder, axios));