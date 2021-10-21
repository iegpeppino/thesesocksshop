import React, { useState, useEffect } from 'react'
import { Button, LinkContainer, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ErrMessage from '../components/ErrMessage'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

function OrderDetailPage({ match, history }) {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, error, loading } = orderDetails
    
    const orderPay = useSelector((state) => state.orderPay)
    const {loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const {loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    // We only calculate the order item price if we have an order
    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = "https://www.paypal.com/sdk/js?client-id=AdYMM-p3IKOo9VIN1QQb_3IAStuJmW-wXoLOFq9h-pvl0_SYo-IN6TQtIUtoxuh3Xclhmr43BobfYtfG"
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }  

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

// PayPal client ID
// AdYMM-p3IKOo9VIN1QQb_3IAStuJmW-wXoLOFq9h-pvl0_SYo-IN6TQtIUtoxuh3Xclhmr43BobfYtfG

    useEffect(() =>{
        if(!userInfo){
            history.push('/login')
        }
        if(!order || successPay || order._id !== Number(orderId) || successDeliver){
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))    
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
        
    },[successPay, dispatch, order, orderId, successDeliver])

    return loading ? (
        <Loader />
    ): error ? ( 
        <ErrMessage variant= 'danger'>
            {error}
        </ErrMessage>) : (


        
        <div>
            <h1> Order: {order._id} </h1>
            <Row>
                <Col md= {8}>
                    <ListGroup style={{boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)'}}>
                        <ListGroup.Item>
                            <h2 className='border border-dark p-2'>Shipping</h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},
                                {'   '}
                                PC:{order.shippingAddress.postalCode},
                                {'   '}
                                {order.shippingAddress.country}
                            </p>

                            {order.isDelivered ? (
                                    <ErrMessage variant= 'success'>Delivered on {order.deliveredAt}</ErrMessage>
                             ) : (
                                    <ErrMessage variant= 'warning'>Not delivered</ErrMessage>
                             )}

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 className='border border-dark p-2'>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            <p><strong>Payment status:</strong></p>
                            {order.isPaid ? (
                                    <ErrMessage variant= 'success'>Paid on {order.paidAt}</ErrMessage>
                             ) : (
                                    <ErrMessage variant= 'warning'>Not paid</ErrMessage>
                             )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 className='border border-dark p-2'>Items Ordered</h2>
                            {order.orderItems.length === 0 ? 
                            <ErrMessage variant= 'info'>
                                Order is empty !
                            </ErrMessage> : (
                                <ListGroup variant= 'dark'>
                                    {order.orderItems.map((item, index) => (
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
                                    <Col>{order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>


                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton 
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}


                            <ListGroup.Item>
                               {error && <ErrMessage variant= 'danger'>
                                        {error}
                                </ErrMessage>}
                            </ListGroup.Item>

                        </ListGroup>
                                    
                        {loadingDeliver && <Loader/>}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                type= 'button'
                                className= 'btn btn-block'
                                onClick= {deliverHandler}>
                                    Mark as delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderDetailPage
