import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import Loader from '../components/Loader'
import ErrMessage from '../components/ErrMessage'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'


function UserEditPage( {match, history} ) {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
            }else{
            if(!user.name || Number(user._id) !== Number(userId)){
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
        }}
    },[userId, user])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id:user._id , name, email, isAdmin }))
    }

    return (
        <div>

            <Link to='/admin/userlist'>
                Go Back
            </Link>

            <FormContainer>

                <h1>Edit User</h1>

                {loadingUpdate && <Loader/>}
                {errorUpdate && <ErrMessage variant= 'danger'>{errorUpdate}</ErrMessage>}

                {loading ? <Loader/> : error ? <ErrMessage variant= 'danger'>{error}</ErrMessage>
                 : ( 
                    <Form onSubmit= {submitHandler}>
                        <Form.Group controlId= 'name'>
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
                        <Form.Group controlId= 'email'>
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
                        <Form.Group controlId= 'isadmin'>
                            <Form.Check
                                type= 'checkbox'
                                label= 'Is Admin'
                                value= {isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            >
                            </Form.Check>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}

                
            </FormContainer>
        </div>
        
    )
}

export default UserEditPage
