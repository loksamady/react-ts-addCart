import { createContext, useState, type ReactNode } from "react";
import ShoppingCarts from "../components/ShoppingCarts";
import { useLocalStorage } from "../hooks/useLocalStorage";
// Define cart item type
type CartItem = {
  id: number;
  quantity: number;
};

// Define context type
type ShoppingCartContextType = {
  cartItems: CartItem[];
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

// Define provider props type
type ShoppingCartProviderProps = {
  children: ReactNode;
};

// Create context with proper typing
export const ShoppingCartContext = createContext<
  ShoppingCartContextType | undefined
>(undefined);

// Shopping cart provider component
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  // Calculate total quantity in cart
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  // Get quantity of specific item
  function getItemQuantity(id: number): number {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  // Increase quantity of item
  function increaseCartQuantity(id: number): void {
    setCartItems((currItems) => {
      const existingItem = currItems.find((item) => item.id === id);
      if (existingItem == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
    });
  }
  // Decrease quantity of item
  function decreaseCartQuantity(id: number): void {
    setCartItems((currItems) => {
      const existingItem = currItems.find((item) => item.id === id);
      if (existingItem?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  }
  // Remove item completely from cart
  function removeFromCart(id: number): void {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  }
  // Clear entire cart
  function clearCart(): void {
    setCartItems([]);
  }
  // Context value to be provided
  const value: ShoppingCartContextType = {
    cartItems,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    cartQuantity,
    clearCart,
    openCart,
    closeCart,
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
      <ShoppingCarts isOpen={isOpen} onClose={closeCart} />
    </ShoppingCartContext.Provider>
  );
}
