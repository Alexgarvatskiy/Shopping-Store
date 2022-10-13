import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShopingCartContextProps = {
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
}

const ShopingCartContext = createContext({});

export function useShoppingCart() {
    return useContext(ShopingCartContext)
    const [] = useState();
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    return <ShopingCartContext.Provider value={{}} >
        {children}
    </ShopingCartContext.Provider>
}