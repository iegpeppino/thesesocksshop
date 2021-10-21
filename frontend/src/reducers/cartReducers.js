import { CART_ADD_ITEM,
       CART_REMOVE_ITEM,
       CART_SAVE_SHIPPING_ADDRESS,
       CART_SAVE_PAYMENT_METHOD,
       CART_CLEAR_ITEMS, } from '../constants/cartConstants'

export const cartReducer = ( state = { cartItems:[] , shippingAddress: {} }, action ) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find((x) => x.product === item.product)

            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x)
                }
            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems, item],
                }
            }

        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload )
            }   
             
        case CART_SAVE_SHIPPING_ADDRESS:
            return{ 
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }    
        
        case CART_CLEAR_ITEMS:
            return{
                ...state,
                cartItems: [],
            }
            
        default:
            return state
    }
}


// export const cartReducer = (
//     state= { cartItems: [] },
//     action
//     ) => {
//     switch(action.type){
//         // We check if the product we send back in the payload exists in our carItems array
//         case CART_ADD_ITEM:
//             const item = action.payload
//             // x.product points to the id of the product
//             const existItem = state.cartItems.find((x) => x.product === item.product )

//             if (existItem){
//                 return{
//                     ...state,
//                     cartItems: state.cartItems.map(x => 
//                         x.product === existItem.product ? item : x),
//                     //if a cart product matches our new added item, we replace it with the new item
//                     //otherwise we return the previous item
//                 }
//             }else{
//                 return{
//                     ...state,
//                     cartItems:[...state.cartItems, item]
//                     //returns the cart with the new item added
//                 } 
//             }
//         default: return state
//     }
// }