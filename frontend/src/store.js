import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {productDetailsReducer,
        productListReducer,
        productDeleteReducer,
        productCreateReducer,
        productUpdateReducer,
        productReviewCreateReducer,
        topRatedProductReducer, } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {userLoginReducer,
        userRegisterReducer,
        userDetailsReducer,
        userUpdateProfileReducer,
        userListReducer,
        userDeleteReducer,
        userUpdateReducer,} from './reducers/userReducers'
import { orderCreateReducer,
        orderDetailsReducer,
        orderListMyReducer,
        orderListReducer,
        orderPayReducer,
        orderDeliverReducer, } from './reducers/orderReducers';


const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    productDelete : productDeleteReducer,
    productCreate : productCreateReducer,
    productUpdate : productUpdateReducer,
    productReviewCreate : productReviewCreateReducer,
    productTopRated : topRatedProductReducer,
    cart : cartReducer,

    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    userList : userListReducer,
    userDelete : userDeleteReducer,
    userUpdate : userUpdateReducer,
    
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    orderDeliver : orderDeliverReducer,
    orderListMy : orderListMyReducer,
    orderList : orderListReducer,
})

const cartItemsFromStorage = (localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : [] ) 

const userInfoFromStorage = (localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null ) 

const shippingAddressFromStorage = (localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {} )     

const initialState = {
    cart: {cartItems: cartItemsFromStorage,
           shippingAddress: shippingAddressFromStorage},
    userLogin: {userInfo: userInfoFromStorage},
}

// const cartItemsFromStorage = localStorage.getItem('cartItems') ?
//     JSON.parse(localStorage.getItem('carItems')) : []
//     //if the cart items don't exist it returns an empty array

// const initialState = {
//     cart:{
//         cartItems: cartItemsFromStorage,
//     }
// }

const middleware = [thunk]

// So you can use the chromeDevTools plugin
const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))


export default store