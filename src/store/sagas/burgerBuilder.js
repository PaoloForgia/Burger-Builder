import { put } from "redux-saga/effects";
import axios from "../../axios-order";

import * as actions from "../actions/";

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get("/ingredients.json");
    yield put(actions.setIngredients(response.data));
    // const existingIngredients = Object.keys(this.props.ingredients).filter(
    //   (type) => this.props.ingredients[type] > 0
    // );
    // let newPrice = BASE_PRICE;
    // existingIngredients.forEach(
    //   (type) => (newPrice += INGREDIENT_PRICES[type])
    // );
    // this.setState({ totalPrice: newPrice });
    // this.updatePurchaseState(this.props.ingredients);
  } catch (error) {
    console.error(error);
    yield put(actions.fetchIngredientsFailed());
  }
}
