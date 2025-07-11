import React, { useEffect, useState, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface CartButtonProps {
  className?: string;
  iconSize?: number;
  mobile?: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ 
  className = '', 
  iconSize = 24,
  mobile = false 
}) => {
  const { toggleCart, totalItems, cart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const prevTotalItemsRef = useRef(totalItems);

  // Efecto para detectar cambios en el número de items y activar la animación
  useEffect(() => {
    // Si hay más items que antes, activar la animación
    if (totalItems > prevTotalItemsRef.current) {
      setIsAnimating(true);
      
      // Desactivar la animación después de que termine
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000); // Duración de la animación bounce
      
      return () => clearTimeout(timer);
    }
    
    // Actualizar la referencia
    prevTotalItemsRef.current = totalItems;
  }, [totalItems]);

  return (
    <button 
      onClick={toggleCart}
      className={`relative ${className}`}
      aria-label="Abrir carrito de compras"
    >
      <ShoppingCart 
        size={iconSize} 
        className={`text-gray-800 transition-colors ${isAnimating ? 'animate-bounce' : ''}`}
        style={isAnimating ? { color: '#1ab25a' } : undefined}
      />
      {totalItems > 0 && (
        <span 
          className={`absolute -top-1 -right-2 text-white rounded-full flex items-center justify-center
            transition-all duration-300
            ${isAnimating ? 'scale-125 ring-2' : ''}
            ${mobile ? 'text-[10px] w-4 h-4' : 'text-xs w-5 h-5'}`}
          style={{ 
            backgroundColor: '#1ab25a',
            boxShadow: isAnimating ? '0 0 0 2px rgba(26, 178, 90, 0.2)' : 'none'
          }}
        >
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
      
      {/* Efecto de onda cuando se agrega un producto */}
      {isAnimating && (
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: 'rgba(26, 178, 90, 0.3)' }}></span>
      )}
    </button>
  );
};

export default CartButton;
