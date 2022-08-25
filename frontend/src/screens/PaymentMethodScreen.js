import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../Components/CheckoutSteps';
import { Store } from '../store';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [accountname, setAccountName] = useState('');
  const [accountnumber, setAccountNumber] = useState('');
  const [bankpass, setBankPassword] = useState('');
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );
  let bankdata = {
    sender: accountname,
    reciever: 'fahim shah',
    password: bankpass,
    amount: '',
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping', { state: { bankdata } });
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder', { state: { bankdata } });
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>E-Bank Information</title>
        </Helmet>
        <h1 className="my-3">E-Bank Information</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="accountname">
            <Form.Label>Account Name</Form.Label>
            <Form.Control
              type="accountname"
              required
              onChange={(e) => setAccountName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="accountnumber">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="accountnumber"
              required
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bankpass">
            <Form.Label>Bank Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setBankPassword(e.target.value)}
            />
          </Form.Group>

          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
