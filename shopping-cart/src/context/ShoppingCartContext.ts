import { createContext, useContext, ReactNode } from "react"

type ShoppingCartProviderProps = {
    children: ReactNode
} 

const ShoppingCartContext = createContext({})

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}: ShoppingCartProviderProps) {
    return (
        <ShoppingCartContext.Provider value={{}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}