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

import * as actionTypes from '../../reduxStore/actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        //Only UI state variables
        purchasing: false,
        loading: false,
        error: false
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
        this.setState({ purchasing: true });
    }

    //Cancel Button - Close the Modal and cancel purchase
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    //Continue Button - Continue to checkout
    purchaseContinueHandler = () => {
        //Checkout.js
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
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

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
                    />
                </Auxilary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }

        //Loading Spinner
        if (this.state.loading) {
            orderSummary = <Spinner />;
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
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(
            { type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }
        ),
        onIngredientRemoved: (ingName) => dispatch(
            { type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(APIErrorHandler(BurgerBuilder, axios));