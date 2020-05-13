import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import Auxilary from '../../../hoc/Auxilary';
import './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <Auxilary>
            <div className='CenterDiv'>
                <h1>Your Order</h1>
            </div>
            {/* display the burger which was built */}
            <Burger ingredients={props.ingredients} />
            {/* Cancel or Continue Order Components */}
            <div className='CenterDiv'>
                <Button
                    btnType="Danger"
                    clicked={props.checkoutCancelled}>
                    CANCEL
                </Button>
                <Button
                    btnType="Success"
                    clicked={props.checkoutContinued}>
                    CONTINUE
                </Button>
            </div>
        </Auxilary>
    );
}

export default checkoutSummary;