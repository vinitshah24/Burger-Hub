import React from 'react';

import './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import Auxilary from '../../hoc/Auxilary';

const burger = (props) => {
    // Using this will require {transformedIngredients} in return
    //Create a new array with # in the each ingredients 
    // and then using the name of ingredient as key to bind values by looping through the array.
    // The keys would be like salad0 bacon0 cheese0 meat0 for all items seleted 1 time
    //     let transformedIngredients = Object.keys(props.ingredients)
    //         .map(igName => {
    //             return [...Array(props.ingredients[igName])].map((_, i) => {
    //                 return <BurgerIngredient key={igName + i} type={igName} />;
    //             });
    //         })
    //         .reduce((arr, el) => {
    //             return arr.concat(el)
    //         }, []);
    //     if (transformedIngredients.length === 0) {
    //         transformedIngredients = <p>Please start adding ingredients!</p>;
    //     }

    // Using this will require {transformedIngredients()} in return
    let transformedIngredients = () => {
        let ingredientsJSON = props.ingredients;
        let IngredientsArr = [];
        for (let key in ingredientsJSON) {
            let currentIngredentNumber = ingredientsJSON[key]
            for (let i = 0; i < currentIngredentNumber; i++) {
                IngredientsArr.push(<BurgerIngredients key={key + i} type={key} />);
            }
        }
        return IngredientsArr;
    }

    var ingredientsArrOutput = transformedIngredients();
    if (ingredientsArrOutput.length === 0) {
        transformedIngredients = () => {
            return <p>Please start adding ingredients!</p>;
        }
    }

    return (
        <Auxilary>
            <div className='Burger'>
                <BurgerIngredients type="bread-top" />
                {transformedIngredients()}
                <BurgerIngredients type="bread-bottom" />
            </div>
        </Auxilary>
    );
};

export default burger;