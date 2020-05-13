//Stateful Class [Main File]
import React, { Component } from 'react';

import Auxilary from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/OrderPopup/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import APIErrorHandler from '../../hoc/APIErrorHandler/APIErrorHandler';
import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        //Spinner when api is processing
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
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        //Copying the old state ingredients
        const updatedIngredients = { ...this.state.ingredients };
        // Increasing the count for that particular ingredient
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        //Copying old price
        const oldPrice = this.state.totalPrice;
        //Updating price for reassignng this variable
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        //Update the button to check if the burger is loaded or not
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        //Copying the old state ingredients
        const updatedIngredients = { ...this.state.ingredients };
        // Reducing the count for that particular ingredient
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        //Copying old price
        const oldPrice = this.state.totalPrice;
        //Deducting the pice for the item removed
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        //Update the button to check if the burger is loaded or not
        this.updatePurchaseState(updatedIngredients);
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
        //Sending ingredients in parameter URL
        // EX: LOCALHOST/checkout?bacon=1&cheese=2&meat=2&salad=2&price=5.3
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        //Join the array by &
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    //Dynamically getting the order - Runs after render method
    componentDidMount() {
        // console.log(this.props);
        // axios.get('https://projectapi-238001.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({ error: true });
        //     });
    }


    render() {
        //Put this under render to keep refreshing.
        //Making a copy
        const disabledInfo = { ...this.state.ingredients };
        // {salad: true, meat: false, ...}
        for (let key in disabledInfo) {
            //Here checking if any ingredient is <= 0, if true then disable the button
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        //If ingredients throw error
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        //If ingredients exists
        if (this.state.ingredients) {
            burger = (
                <Auxilary>
                    <h1 style={{ textAlign: "center" }}>Customize Your Burger</h1>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Auxilary>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
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
export default APIErrorHandler(BurgerBuilder, axios);