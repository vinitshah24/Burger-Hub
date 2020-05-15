import React from 'react';

import './BuildControls.css';
import Controllers from './Controllers/Controllers';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className="BuildControls">
        <h2>Total: ${props.price.toFixed(2)}</h2>
        {controls.map(ctrl => (
            <Controllers
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button
            className="OrderButton"
            onClick={props.ordered}
            disabled={!props.purchasable}>
            {/* Change the name of the submit buton if not authenticated */}
            {props.isAuth ? 'Order Now' : 'SignUp to Order'}
        </button>
    </div>
);

export default buildControls;