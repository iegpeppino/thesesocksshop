import React, {useState, useEffect} from 'react'
import { Form, Button, LinkContainer, Col, Row, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

function PaymentPage({ history }) {

    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if(!shippingAddress.address){
        history.push('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <FormContainer>
                
                <Card className='p-3'>
                    <Form onSubmit= {submitHandler}>
                        <Form.Group>
                            <Form.Label as= 'legend'>
                                Select Payment Method
                            </Form.Label>
                            <Col>
                                <Form.Check
                                    type= 'radio'
                                    label= 'PayPal or Credit Card'
                                    id= 'paypal'
                                    name= 'paymentMethod'
                                    checked
                                    onChange= {(e) => setPaymentMethod(e.target.value)}
                                >
            
                                </Form.Check>
                            </Col>
                        </Form.Group>
            
                        <Button type= 'submit' variant= 'outline-info' className='mt-3'>
                            Save Payment Method
                        </Button>
            
                    </Form>
                </Card>
            </FormContainer>
        </div>
    )
}

export default PaymentPage
