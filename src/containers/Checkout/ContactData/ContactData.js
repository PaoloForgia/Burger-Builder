import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input, {
  inputProperties,
  selectProperties,
} from "../../../components/UI/Input/Input";
import axios from "../../../axios-order";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions";
import { updateObject, checkValidity } from "../../../shared/utility";

const DELIVERY_OPTIONS = [
  { value: "fastest", displayValue: "Fastest" },
  { value: "cheapest", displayValue: "Cheapest" },
];

const contactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: inputProperties("input", "text", "Your Name", { required: true }),
    street: inputProperties("input", "text", "Your Street", {
      required: true,
    }),
    zipCode: inputProperties("input", "text", "Your CAP", {
      required: true,
      minLength: 4,
      maxLength: 6,
    }),
    country: inputProperties("input", "text", "Your Country", {
      required: true,
    }),
    email: inputProperties("input", "email", "Your Email", {
      required: true,
    }),
    deliveryMethod: selectProperties(
      "select",
      DELIVERY_OPTIONS,
      DELIVERY_OPTIONS[0].value
    ),
  });

  const [isFormValid, setFormValid] = useState(false);

  const orderHandler = event => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true,
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    });
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let isFormValid = true;

    for (let inputIdentifier in updatedOrderForm) {
      isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid;
    }

    setOrderForm(updatedOrderForm);
    setFormValid(isFormValid);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button buttonType="Success" disabled={!isFormValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (order, token) =>
      dispatch(actions.purchaseBurger(order, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(contactData, axios));
