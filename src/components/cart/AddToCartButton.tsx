import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart, CartProduct } from '@/context/CartContext';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    sku?: string;
    seller?: string;
    sellingPrice?: number;
    listPrice?: number;
  };
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, className = '' }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartProduct: CartProduct = {
      ...product,
      quantity
    };
    
    addToCart(cartProduct);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button 
            onClick={decreaseQuantity}
            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            disabled={quantity <= 1}
            aria-label="Disminuir cantidad"
          >
            <Minus size={16} />
          </button>
          <span className="px-3 py-1 min-w-[40px] text-center">{quantity}</span>
          <button 
            onClick={increaseQuantity}
            className="p-2 text-gray-500 hover:text-gray-700"
            aria-label="Aumentar cantidad"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          <span>Agregar al carrito</span>
        </button>
      </div>
      
      {/* Mensaje de compatibilidad con VTEX */}
      <p className="text-xs text-gray-500 italic">
        Este producto será compatible con VTEX en la migración
      </p>
    </div>
  );
};

export default AddToCartButton;
