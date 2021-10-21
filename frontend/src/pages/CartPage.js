import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import  ErrMessage  from '../components/ErrMessage'
import { addToCart, removeFromCart } from '../actions/cartActions'


function CartPage({match, location, history}){
    const productId = match.params.id
    // qty is equals to the value represented on the URL  ex:http://shop.com/?qty=3 ,
    // if theres no value it is equals to 1
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    
    // We only want to fire our "addToCart" when we have a productId value and a qty value
    const dispatch = useDispatch()
    
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart 
    
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/shipping')
        // history.push('/login?redirect=shipping') didn't work
    }

    return (
        <Row>
            <div id='sc-title'>
                <h1 style={{fontSize:"2.5rem" ,color:"#1d1d1d", textAlign:'center'}}>Shopping Cart</h1>
            </div>
            <Col md={8}>
                
                {cartItems.length === 0 ? (
                    <ErrMessage variant='info'>
                        Your cart is empty <Link to='/'> Go Back </Link>
                    </ErrMessage>
                ): (
                    <ListGroup variant='dark' id='my-cart'>
                        <ListGroup.Item>
                            <Row className='text-center'>
                                <Col md={4}>
                                    <p>Product :</p>
                                </Col>
                                <Col md={3}>
                                    <p>Price :</p>
                                </Col>
                                <Col md={3}>
                                    <p>Quantity :</p>
                                </Col>
                                <Col md={1}>
                                    <p>Remove?</p>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row className='align-items-center text-center p-2'>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col md={2}>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                    <Col md={3} className='pl-2'>
                                        ${item.price}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control 
                                                as='select'
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {
                                                        [...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                { x + 1 }
                                                            </option>
                                                        ))
                                                    }
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                        type= 'button'
                                        variant= 'light'
                                        className='align-item-center'
                                        onClick={() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )
                }
            </Col>
            <Col md= {4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2> SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items </h2>
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)} 
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup.Item>
                            <Button
                            type= 'button'
                            className= 'btn-block'
                            variant='outline-info'
                            disabled= {cartItems.length === 0}
                            onClick= {checkoutHandler}>
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </Card>
                </Col>
        </Row>
    )
}

export default CartPage
