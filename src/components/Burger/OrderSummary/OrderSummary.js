import React, { Component } from 'react';

import './OrderSummary.css';
import Auxilary from '../../../hoc/Auxilary';

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('[OrderSummary] WillUpdate');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingredientNameKey => {
                return (
                    <li key={ingredientNameKey}>
                        <span style={{ textTransform: 'capitalize' }}>
                            {ingredientNameKey}</span>: {this.props.ingredients[ingredientNameKey]}
                    </li>);
            });

        return (
            <Auxilary>
                <h3>Your Order</h3>
                <p>Selected Ingredients For your Burger Order:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <button
                    className="Button Danger"
                    onClick={this.props.purchaseCancelled}>
                    CANCEL
                </button>
                <button
                    className="Button Success"
                    onClick={this.props.purchaseContinued}>
                    CONTINUE
                </button>
            </Auxilary>
        );
    }
}

export default OrderSummary;