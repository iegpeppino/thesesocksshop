import React, {useState, useEffect} from 'react'
import { Button, LinkContainer, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import ErrMessage from '../components/ErrMessage'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'


function PlaceOrderPage({ history }) {

    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, error, success } = orderCreate
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    // We map through the cart items and add the price to the accumulator , the acc starts at 0
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice >100 ? 0 : 10).toFixed(2)
    cart.taxPrice = (0.082) * cart.itemsPrice
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    /* If we refresh the page and there's no payment method selected
    we'll be redirected to the payment selection page*/
    if(!cart.paymentMethod){
        history.push('/payment')
    }

    useEffect(() =>{
        if(success){
            history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    },[success, history])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }



    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />

            <Row>
                <Col md= {8} >
                    <ListGroup style={{boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)'}}>
                        <ListGroup.Item>
                            <h2 className='border border-dark p-2'>Shipping</h2>
                            <p className='p-2'>
                                <strong>Shipping direction : </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                                {'   '}
                                PC:{cart.shippingAddress.postalCode},
                                {'   '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 className='border border-dark p-2'>Payment Method</h2>
                            <p className='p-2'>
                                <strong>Selected method :  </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 className='border border-dark p-2'>Items Ordered</h2>
                            {cart.cartItems.length === 0 ? 
                            <ErrMessage variant= 'info'>
                                Your cart is empty !
                            </ErrMessage> : (
                                <ListGroup variant= 'dark'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index} className='p-2'>
                                            <Row>
                                                <Col>
                                                    <Image src={item.image}  alt={item.name} fluid rounded/>
                                                </Col>

                                                <Col>
                                                    <Row className='mb-2'>
                                                        Product name :
                                                    </Row>
                                                    <Row>
                                                        <Link to= {`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Row>
                                                </Col>
                                                <Col md= {4}>
                                                    <Row className='mb-2'>
                                                        Qty x Item Price = Total Price
                                                    </Row>
                                                    <Row>
                                                        {/* with .toFixed(2) we only allow two decimals */}
                                                        {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md= {4}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                               {error && <ErrMessage variant= 'danger'>
                                        {error}
                                </ErrMessage>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type= 'button'
                                    className= 'btn-block'
                                    variant='outline-info'
                                    disabled= {cart.cartItems === 0}
                                    onClick= {placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderPage
