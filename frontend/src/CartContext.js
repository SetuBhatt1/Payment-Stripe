import { createContext, useState } from "react";
import { prodArray, getProductById } from "./productStore";

// we have functions with no logic
// means we are going to have a function 'getProductQuantity'
// define function -> pass it to provider
export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {}
});

export function CartProvider({children}) {
    // making state specific to our provider
    const [cartProducts, setCartProducts] = useState([]);
    
    // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]

    function getProductQuantity(id) {
        // if product exists, then only we are going to find quantity, else not
        const quantity = cartProducts.find(product => product.id === id)?.quantity;
        
        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(id) {
        // firstly, we will get the quantity of product with that 'id'
        const quantity = getProductQuantity(id);

        if (quantity === 0) { // product is not in cart
            // [{id : 1, quantity : 2}] -> [{id : 1, quantity : 2},{id : 2, quantity : 1}]
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id: id,
                        quantity: 1
                    }
                ]
            )
        } else { // product is in cart
            // [{id : 1, quantity : 2}] -> [{id : 1, quantity : 3}]
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id                                // if condition
                    ? { ...product, quantity: product.quantity + 1 } // if statement is true
                    : product                                        // if statement is false
                )
            )
        }
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if(quantity == 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id                                // if condition
                    ? { ...product, quantity: product.quantity - 1 } // if statement is true
                    : product                                        // if statement is false
                )
            )
        }
    }

    function deleteFromCart(id) {
        // [] if an object meets a condition, add the object to array
        // [product1, product2, product3]
        // [product1, product3]
        setCartProducts(
            cartProducts =>
            cartProducts.filter(currentProduct => {
                return currentProduct.id != id;
            })  
        )
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            const productData = getProductById(cartItem.id);
            totalCost += (productData.price * cartItem.quantity);
        });
        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

// Context -> cart, AddToCart, RemoveFromCart
// Provider -> gives ur react app access to all the things in your context
