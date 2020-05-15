import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    // ingredients: {
    //     salad: 0,
    //     bacon: 0,
    //     cheese: 0,
    //     meat: 0
    // },
    // totalPrice: 2
    ingredients: null,
    totalPrice: 2,
    error: false,
    //If user was not logged and got redirected to signin, save the burger builds
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case actionTypes.ADD_INGREDIENT:
//             //Increment the ingredient
//             return {
//                 ...state,
//                 ingredients: {
//                     ...state.ingredients,
//                     [action.ingredientName]: state.ingredients[action.ingredientName] + 1
//                 },
//                 totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
//             };
//         case actionTypes.REMOVE_INGREDIENT:
//             //Decrement the ingredient
//             return {
//                 ...state,
//                 ingredients: {
//                     ...state.ingredients,
//                     [action.ingredientName]: state.ingredients[action.ingredientName] - 1
//                 },
//                 totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
//             };

//         case actionTypes.SET_INGREDIENTS:
//             return {
//                 ...state,
//                 ingredients: {
//                     salad: action.ingredients.salad,
//                     bacon: action.ingredients.bacon,
//                     cheese: action.ingredients.cheese,
//                     meat: action.ingredients.meat
//                 },
//                 error: false
//             }
//         case actionTypes.FETCH_INGREDIENTS_FAILED:
//             return {
//                 ...state,
//                 error: true
//             };
//         default:
//             return state;
//     }
// };


const addIngredient = ( state, action ) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject( state, updatedState );
};

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject( state.ingredients, updatedIng );
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject( state, updatedSt );
};

const setIngredients = (state, action) => {
    return updateObject( state, {
        //Manually setting the burger layers
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 2,
        error: false,
        //Reload page -> so just started from scratch at this point
        building: false
    } );
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT: return addIngredient( state, action );
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);    
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

export default reducer;