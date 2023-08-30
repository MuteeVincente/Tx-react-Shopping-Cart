import { createContext, useContext, useState, ReactNode } from "react"; // Don't forget to import ReactNode
import {ShoppingCart} from '../components/ShoppingCart';
// Define props for the ShoppingCartProvider component
type ShoppingCartProviderProps = {
    children: ReactNode;
};

// Define the structure of a cart item
type CartItem = {
    id: number;
    quantity: number;
};

// Define the structure of the shopping cart context methods
type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void 
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartQuantity: number
    cartItems: CartItem[]

};

// Create a context for the shopping cart
const ShoppingCartContextObj = createContext<ShoppingCartContext | undefined>(undefined);

// Custom hook to use the shopping cart context
export function useShoppingCart() {
    const context = useContext(ShoppingCartContextObj);
    if (!context) {
        throw new Error("useShoppingCart must be used within a ShoppingCartProvider");
    }
    return context;
}

// Provider component to wrap around components needing access to the shopping cart context
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    // State to manage the cart items
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    
    const cartQuantity =  cartItems.reduce((quantity,item) => item.quantity + quantity,0)


    // Function to get the quantity of an item in the cart

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    // Function to increase the quantity of an item in the cart
    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            const existingItem = currItems.find(item => item.id === id);
            if (!existingItem) {
                return [...currItems, { id, quantity: 1 }];
            }
            return currItems.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
        });
    }

    // Function to decrease the quantity of an item in the cart
    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            const existingItem = currItems.find(item => item.id === id);
            if (!existingItem) {
                return currItems;
            }
            if (existingItem.quantity === 1) {
                return currItems.filter(item => item.id !== id);
            }
            return currItems.map(item => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
        });
    }

    // Function to remove an item from the cart
    function removeFromCart(id: number) {
        setCartItems(currItems => currItems.filter(item => item.id !== id));
    }

    // Provide the context's methods and data to children
    const contextValue: ShoppingCartContext = {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,closeCart,
        cartItems,
        cartQuantity,
    };
    return (
        <ShoppingCartContextObj.Provider value={contextValue}>
            {children}
           <ShoppingCart isOpen ={isOpen} />

        </ShoppingCartContextObj.Provider>
    );
}
