import { createContext, ReactNode, useContext, useState } from "react";
import { ShopingCart } from "../Components/ShopingCart";
import { useLocalStorage } from "../hooks/useLocalStorage"

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShopingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const ShopingCartContext = createContext({} as ShopingCartContext);

export function useShoppingCart() {
    return useContext(ShopingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);


    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    // Add to cart function
    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    // the function to reduce the product from the shopping cart 
    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    // remove cart function
    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id);
        })
    }

    return <ShopingCartContext.Provider
        value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            openCart,
            closeCart,
            cartItems,
            cartQuantity
        }}
    >
        {children}
        <ShopingCart isOpen={isOpen} />
    </ShopingCartContext.Provider>
}