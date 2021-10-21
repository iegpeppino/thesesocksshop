import React, {useState, useEffect} from 'react'
import { Form, Button, LinkContainer, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingPage({ history }) {

    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const[address, setAddress] = useState(shippingAddress.address)
    const[city, setCity] = useState(shippingAddress.city)
    const[postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const[country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (    
        
        <div>
            <CheckoutSteps/>
            <div >
                <FormContainer className='shp-card'>
                    <div id='sc-title'>
                        <h1 style={{fontSize:"2.5rem" ,color:"#121212", textAlign:'center'}}>Shipping</h1>
                    </div>
                    <Form onSubmit= {submitHandler} className='shipping-form'>
                        <Form.Group controlId= 'address'>
                            <Form.Label>
                                Address
                            </Form.Label>
                            <Form.Control
                                type= 'text'
                                placeholder= 'Enter address'
                                value= {address ? address : ''}
                                onChange={(e) => setAddress(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId= 'city'  className='mt-3'> 
                            <Form.Label >
                                City
                            </Form.Label>
                            <Form.Control
                                type= 'text'
                                placeholder= 'Enter city'
                                value= {city ? city : ''}
                                onChange={(e) => setCity(e.target.value)}
                                
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId= 'postalCode'  className='mt-3'>
                            <Form.Label>
                                Postal Code
                            </Form.Label>
                            <Form.Control
                                type= 'text'
                                placeholder= 'Enter Postal Code'
                                value= {postalCode ? postalCode : ''}
                                onChange={(e) => setPostalCode(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId= 'country'  className='mt-3'>
                            <Form.Label>
                                Country
                            </Form.Label>
                            <Form.Control
                                type= 'text'
                                placeholder= 'Enter country'
                                value= {country ? country : ''}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Button type= 'submit' variant= 'outline-info' className='my-3'>
                            Confirm Shipping
                        </Button>
                    </Form>
                </FormContainer>
            </div>
        </div>
    )
}

export default ShippingPage