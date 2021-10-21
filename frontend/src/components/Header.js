import React from 'react'
import { Navbar, Nav, Container, Row, NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

function Header(){

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
    
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout( ))
    }


    return (
            <header>
                <Navbar bg="info" variant="dark" expand="lg" collapseOnSelect>
                    <Container>
                        <LinkContainer to='/' className='justify-content-start'>
                            <Navbar.Brand id='nav-title' ><i className='fas fa-socks'></i>These Socks Shop</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                                <SearchBox  />
                            <Nav className="m-auto" >
                                <LinkContainer to='/cart' className= 'mx-3'>
                                    <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                                </LinkContainer>
                                {userInfo ? (
                                    <NavDropdown title= {userInfo.name} id= 'username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                                LogOut
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ):(
                                <LinkContainer  to='/login'>
                                    <Nav.Link><i className='fas fa-user'></i> Login</Nav.Link>
                                </LinkContainer>)}

                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown  variant='info' title= 'Admin' id= 'adminmenu'>
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item>
                                                Users
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        
                                        <LinkContainer to='/admin/productlist'>
                                            <NavDropdown.Item>
                                                Products
                                            </NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item>
                                                Orders
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>   
    )
}

export default Header
