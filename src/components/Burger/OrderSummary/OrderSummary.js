import React, { Component } from 'react';

import Button from '../../UI/Button/Button';
import Auxilary from '../../../hoc/Auxilary';

class OrderSummary extends Component {
    // componentWillUpdate() {
    //     console.log('[OrderSummary] WillUpdate');
    // }

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
                <Button
                    btnType="Danger"
                    clicked={this.props.purchaseCancelled}>
                    CANCEL
                </Button>
                <Button
                    btnType="Success"
                    clicked={this.props.purchaseContinued}>
                    CONTINUE
                    </Button>
            </Auxilary>
        );
    }
}

export default OrderSummary;