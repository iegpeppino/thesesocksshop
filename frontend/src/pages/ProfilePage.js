import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table} from 'react-bootstrap'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import ErrMessage from '../components/ErrMessage'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'

function ProfilePage({ history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errMessage, setErrMessage] = useState('')


    const dispatch = useDispatch()


    const userDetails = useSelector((state) => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        } else {
            if(!user || !user.name || success || userInfo._id !== user._id){
                dispatch({
                    type: 'USER_UPDATE_PROFILE_RESET'
                })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[history, userInfo, dispatch, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setErrMessage('Passwords do not match')
        }else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }))
            setErrMessage('')
        }
    }


    return (
        
        <Row>
            <Col md= {3} className='m-3' style={{boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)',
             backgroundColor:'rgba(255, 255, 255, 0.95)'}}>
                <h2 className='p-3'>User Profile</h2>
                {errMessage && <ErrMessage variant= 'danger'>{errMessage}</ErrMessage>}
                {error && <ErrMessage variant= 'danger'>{error}</ErrMessage>}
                {loading && <Loader />}
                <Form onSubmit= {submitHandler}>
                    <Form.Group controlId= 'name' className='mb-2'>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control 
                            type= 'name'
                            placeholder= 'Enter name'
                            value= {name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId= 'email' className='mb-2'>
                        <Form.Label>
                            Email Address
                        </Form.Label>
                        <Form.Control 
                            type= 'email'
                            placeholder= 'address@email.com'
                            value= {email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId= 'password' className='mb-2'>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control 
                            type= 'password'
                            placeholder= 'your password here'
                            value= {password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId= 'confirmPassword' className='mb-2'>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control 
                            type= 'password'
                            placeholder= 'Confirm password'
                            value= {confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='info' className= 'mt-3'>
                        Update Profile
                    </Button>
                </Form>
            </Col>

            <Col md= {6} className='m-3' style={{boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)',
             backgroundColor:'rgba(255, 255, 255, 0.95)'}}>
                <h2 className='p-3 '>My orders</h2>

                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <ErrMessage variant= 'danger'>{errorOrders}</ErrMessage>
                ) : (
                    <Table striped responsive className= 'table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key= {order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>$ {order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn btn-m' variant='info' >DETAILS</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>       
        </Row>
    )


}

export default ProfilePage