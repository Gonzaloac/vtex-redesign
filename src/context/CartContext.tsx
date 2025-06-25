import React, { createContext, useContext, useState, useEffect } from 'react';

// Definir tipos para los productos y el carrito
export interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku?: string; // Para compatibilidad con VTEX
  seller?: string; // Para compatibilidad con VTEX
  sellingPrice?: number; // Para compatibilidad con VTEX
  listPrice?: number; // Para compatibilidad con VTEX
}

interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
  totalItems: number;
  subtotal: number;
}

// Crear el contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// Proveedor del contexto
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado para el carrito
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('organaCart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    }
  }, []);
  
  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem('organaCart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
    }
  }, [cart]);

  // Calcular el total de items
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Calcular el subtotal
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Agregar producto al carrito
  const addToCart = (product: CartProduct) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      
      if (existingProduct) {
        // Si el producto ya existe, actualizar cantidad
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + product.quantity } 
            : item
        );
      } else {
        // Si es un producto nuevo, agregarlo al carrito
        return [...prevCart, product];
      }
    });
    
    // Abrir el carrito automáticamente al agregar un producto
    setIsCartOpen(true);
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Limpiar carrito
  const clearCart = () => {
    setCart([]);
  };

  // Abrir/cerrar carrito
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  // Valores a proporcionar en el contexto
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    toggleCart,
    closeCart,
    openCart,
    totalItems,
    subtotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
