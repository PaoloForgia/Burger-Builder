import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingredientName,
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredientName,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
        // const existingIngredients = Object.keys(this.props.ingredients).filter(
        //   (type) => this.props.ingredients[type] > 0
        // );
        // let newPrice = BASE_PRICE;
        // existingIngredients.forEach(
        //   (type) => (newPrice += INGREDIENT_PRICES[type])
        // );
        // this.setState({ totalPrice: newPrice });
        // this.updatePurchaseState(this.props.ingredients);
      })
      .catch((error) => {
        console.error(error);
        dispatch(fetchIngredientsFailed());
      });
  };
};
