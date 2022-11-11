import axios from 'axios';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import FormContainer from "../Components/FormContainer/FormContainer";
import { savePaymentMethod } from "../actions/cartActions.js";
import CheckoutSteps from "../Components/CheckoutSteps/CheckoutSteps";

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  //payment
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };

    const headers = {
      "Content-Type": "application/json"
    }
    
    axios.post('http://localhost:8282/payment', {
      
      headers,
      body: JSON.stringify(body)
    }).then(res => {
      console.log(res)
      const { status } = res;
      console.log(status)
    }).catch(err => console.log(err))
  } 

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>

            <Col className="mt-4">
              <Form.Check
                type="radio"
                label="Paypal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>

              {/* Stripe Payment */}
              <Form.Control>
                <StripeCheckout
                  stripeKey="pk_test_51M2ZZ1SEnBqVwV4rzpygirQlWfYm4GwfgZI6n72M24DWYmh8qjH0U4HZPhw6D2NFEphvtQmX4F7c5Bm7mYLZ5ZJ9009ZnVra5p"
                  token={makePayment}
                  name="Buy React"
                  amount={product.price * 100}
                />
              </Form.Control>

              <Form.Check
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-2">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
