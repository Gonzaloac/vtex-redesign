import React, { useMemo, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, ShoppingBag, AlertCircle, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

const CartSidebar: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity,
    addToCart,
    subtotal,
    totalItems
  } = useCart();

  // Estado para controlar la animación
  const [isVisible, setIsVisible] = useState(false);
  // Estado para rastrear productos recién agregados
  const [recentlyAdded, setRecentlyAdded] = useState<{[id: string]: boolean}>({});
  // Referencia al carrito previo para detectar nuevos productos
  const prevCartRef = useRef<typeof cart>([]);
  
  // Efecto para controlar la animación cuando cambia isCartOpen
  useEffect(() => {
    if (isCartOpen) {
      setIsVisible(true);
    } else {
      // Pequeño retraso antes de ocultar completamente para permitir la animación
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500); // Aumentado para coincidir con la duración de la animación
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  // Efecto para detectar cambios en el carrito y marcar productos recién agregados
  useEffect(() => {
    // Si el carrito tiene más productos que antes, encontrar los nuevos
    if (cart.length >= prevCartRef.current.length) {
      const newlyAdded: {[id: string]: boolean} = {};
      
      cart.forEach(item => {
        // Buscar si este producto ya estaba en el carrito anterior
        const existingItem = prevCartRef.current.find(prevItem => prevItem.id === item.id);
        
        // Si es nuevo o aumentó la cantidad, marcarlo como recién agregado
        if (!existingItem || (existingItem && item.quantity > existingItem.quantity)) {
          newlyAdded[item.id] = true;
        }
      });
      
      if (Object.keys(newlyAdded).length > 0) {
        setRecentlyAdded(newlyAdded);
        
        // Limpiar el efecto después de 2.5 segundos
        const timer = setTimeout(() => {
          setRecentlyAdded({});
        }, 2500);
        
        return () => clearTimeout(timer);
      }
    }
    
    // Actualizar la referencia al carrito actual
    prevCartRef.current = [...cart];
  }, [cart]);

  // Seleccionar 2 productos aleatorios para upsell
  const suggestedProducts = useMemo(() => {
    // Filtrar productos que ya están en el carrito
    const cartProductIds = cart.map(item => item.id);
    const availableProducts = products.filter(product => !cartProductIds.includes(product.id.toString()));
    
    // Si no hay suficientes productos disponibles, devolver un array vacío
    if (availableProducts.length < 2) return [];
    
    // Barajar el array y tomar los primeros 2 elementos
    return [...availableProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map(product => ({
        id: product.id.toString(),
        name: product.title,
        price: product.discount 
          ? product.price * (1 - product.discount / 100) 
          : product.price,
        image: product.image,
        subtitle: product.subtitle
      }));
  }, [cart]);

  const handleAddSuggested = (product) => {
    addToCart({
      ...product,
      quantity: 1
    });
  };

  // Si el carrito no está visible, no renderizamos nada
  if (!isCartOpen && !isVisible) return null;

  return (
    <>
      {/* Overlay de fondo con animación de opacidad */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-500 ease-in-out ${
          isCartOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />
      
      {/* Panel lateral del carrito con animación de deslizamiento */}
      <div 
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col 
          transition-all duration-500 ease-in-out ${
          isCartOpen 
            ? 'translate-x-0 scale-100 opacity-100 animate-slideInRight' 
            : 'translate-x-full scale-95 opacity-0'
        }`}
      >
        {/* Cabecera del carrito con animación */}
        <div className={`flex items-center justify-between p-4 border-b border-gray-200 
          ${isCartOpen ? 'animate-fadeIn' : ''}`}>
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className={`text-green-600 ${isCartOpen ? 'animate-bounce' : ''}`} />
            <h2 className="font-semibold text-lg">Mi Carrito</h2>
            <span className={`bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full ${
              isCartOpen ? 'animate-fadeIn' : ''
            }`}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button 
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Contenido del carrito */}
        <div className="flex-grow overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <ShoppingBag size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Tu carrito está vacío</h3>
              <p className="text-gray-500 mb-6">Agrega productos para comenzar tu compra</p>
              <button 
                onClick={closeCart}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md transition-colors"
              >
                Explorar productos
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li 
                  key={item.id} 
                  className={`py-4 transition-all duration-500 ${
                    recentlyAdded[item.id] ? 'bg-green-50 rounded-lg animate-pulse' : ''
                  }`}
                >
                  <div className={`flex items-start gap-3 ${
                    recentlyAdded[item.id] ? 'animate-scaleUp' : ''
                  }`}>
                    {/* Imagen del producto */}
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={80} 
                        height={80} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    
                    {/* Detalles del producto */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span className="font-medium text-gray-900">
                          S/ {item.price.toFixed(2)}
                        </span>
                      </div>
                      
                      {/* Controles de cantidad */}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 py-1 text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-600 hover:text-red-800"
                          aria-label="Eliminar producto"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                    
                    {/* Precio total del item */}
                    <div className="text-right">
                      <span className="font-medium text-gray-900">
                        S/ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Productos sugeridos (upsell) */}
        {cart.length > 0 && suggestedProducts.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-3">Complementa tu compra</h3>
            <div className="grid grid-cols-2 gap-3">
              {suggestedProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-2 relative hover:shadow-md transition-shadow">
                  <button 
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    aria-label="Favorito"
                  >
                    <Heart size={16} />
                  </button>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 mb-2">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        width={64} 
                        height={64} 
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="text-xs text-gray-500 uppercase mb-1">{product.subtitle}</div>
                    <h4 className="text-xs font-medium text-center line-clamp-2 mb-1">{product.name}</h4>
                    <div className="font-medium text-sm mb-2">S/ {product.price.toFixed(2)}</div>
                    <button 
                      onClick={() => handleAddSuggested(product)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-1 px-2 rounded transition-colors"
                    >
                      AGREGAR
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Resumen del carrito y botón de checkout */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">S/ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-sm">
              <span className="text-gray-600">Envío:</span>
              <span className="font-medium">Calculado al finalizar</span>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
              <AlertCircle size={14} />
              <span>Los cupones se aplicarán en el checkout</span>
            </div>
            
            <Link 
              href="/checkout" 
              className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-md font-medium transition-colors"
            >
              Finalizar compra
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
