import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, LinkContainer} from 'react-bootstrap'
import Loader from '../components/Loader'
import ErrMessage from '../components/ErrMessage'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

function RegisterPage( {location, history} ) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errMessage, setErrMessage] = useState('')


    const dispatch = useDispatch()

    
    const redirect = location.search ? location.search.split('=')[0] : '/'

    const userRegister = useSelector((state) => state.userRegister)

    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password != confirmPassword) {
            setErrMessage('Passwords do not match')
        }else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Register</h1>
            {errMessage && <ErrMessage variant= 'danger'>{errMessage}</ErrMessage>}
            {error && <ErrMessage variant= 'danger'>{error}</ErrMessage>}
            {loading && <Loader />}
            <Form onSubmit= {submitHandler}>
                <Form.Group controlId= 'name'>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control 
                        type= 'name'
                        placeholder= 'Enter name'
                        required
                        value= {name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId= 'email'>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control 
                        type= 'email'
                        placeholder= 'address@email.com'
                        required
                        value= {email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId= 'password'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control 
                        type= 'password'
                        placeholder= 'your password here'
                        required
                        value= {password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId= 'confirmPassword'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control 
                        type= 'password'
                        placeholder= 'Confirm password'
                        required
                        value= {confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
                </Button>

            </Form>

            <Row className= 'py-3'>
                <Col>
                    Already have account ? 
                    <Link to= {redirect ? `/login?redirect=${redirect}`: '/login'}>
                        Sign In
                    </Link>
                </Col>
            </Row>
        </FormContainer>
        
    )
}

export default RegisterPage
