import React from "react";
import classes from "./Order.css";

const order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredients
    .filter((ingredient) => {
      return ingredient.amount > 0;
    })
    .map((ingredient) => {
      return (
        <span key={ingredient.name} className={classes.Ingredient}>
          {ingredient.name} ({ingredient.amount})
        </span>
      );
    });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
