import React, { useMemo, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, ShoppingBag, AlertCircle, Heart, ChevronLeft, ChevronRight, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

// Componente para la barra de progreso de envío gratis
const FreeShippingBar = ({ subtotal }: { subtotal: number }) => {
  const freeShippingThreshold = 220; // Umbral para envío gratis en S/
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remaining = Math.max(freeShippingThreshold - subtotal, 0);
  
  return (
    <div className="border-b border-gray-200 pb-3 mb-3">
      <div className="flex items-center gap-2 mb-2">
        <Truck size={18} className="text-green-600" style={{ color: '#1ab25a' }} />
        {subtotal >= freeShippingThreshold ? (
          <p className="text-sm font-medium">¡Felicidades! Tu pedido tiene <span className="font-bold" style={{ color: '#1ab25a' }}>envío gratis</span></p>
        ) : (
          <p className="text-sm font-medium">
            ¡Solo te falta <span className="font-bold" style={{ color: '#1ab25a' }}>S/ {remaining.toFixed(2)}</span> para un envío gratis!
          </p>
        )}
      </div>
      
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%`, backgroundColor: '#1ab25a' }}
        />
      </div>
    </div>
  );
};

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
  // Estado para el carousel de productos sugeridos
  const [currentSlide, setCurrentSlide] = useState(0);
  
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

  // Seleccionar productos aleatorios para upsell
  const suggestedProducts = useMemo(() => {
    // Filtrar productos que ya están en el carrito
    const cartProductIds = cart.map(item => item.id);
    const availableProducts = products.filter(product => !cartProductIds.includes(product.id.toString()));
    
    // Si no hay suficientes productos disponibles, devolver un array vacío
    if (availableProducts.length < 1) return [];
    
    // Barajar el array y tomar hasta 5 elementos
    return [...availableProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
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

  // Auto-rotación del carousel
  useEffect(() => {
    if (suggestedProducts.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === suggestedProducts.length - 1 ? 0 : prev + 1));
    }, 3000); // Cambiar cada 3 segundos
    
    return () => clearInterval(interval);
  }, [suggestedProducts.length]);

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
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transition-transform duration-500 ease-in-out transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        {/* Encabezado del carrito */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <ShoppingBag size={20} className="text-green-600 mr-2" style={{ color: '#1ab25a' }} />
            <h2 className="font-bold text-lg">Mi Carrito</h2>
            {totalItems > 0 && (
              <span className="ml-2 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#1ab25a' }}>
                {totalItems} items
              </span>
            )}
          </div>
          <button 
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Cerrar carrito"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Contenido del carrito */}
        <div className="flex-grow overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <ShoppingBag size={64} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-center mb-2">Tu carrito está vacío</p>
              <p className="text-gray-400 text-sm text-center mb-6">Agrega productos para comenzar tu compra</p>
              <button 
                onClick={closeCart}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors" style={{ backgroundColor: '#1ab25a' }}
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div>
              {/* Barra de envío gratis */}
              <div className="p-4">
                <FreeShippingBar subtotal={subtotal} />
              </div>
              <ul className="divide-y divide-gray-200">
                {cart.map(item => (
                  <li key={item.id} className={`p-4 ${recentlyAdded[item.id] ? 'bg-green-50 animate-pulse' : ''}`}>
                    <div className="flex gap-3">
                      {/* Imagen del producto */}
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-contain p-1" 
                        />
                      </div>
                      
                      {/* Detalles del producto */}
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-green-600 font-medium">S/ {item.price.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          {/* Control de cantidad */}
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus size={16} />
                            </button>
                            
                            <span className="px-2 py-1 min-w-[30px] text-center">
                              {item.quantity}
                            </span>
                            
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus size={16} />
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
            </div>
          )}
        </div>
        
        {/* Productos sugeridos (upsell) */}
        {cart.length > 0 && suggestedProducts.length > 0 && (
          <div className="border-t border-gray-200 p-3 max-h-[20%]">
            <h3 className="font-medium text-gray-900 text-sm mb-2">Complementa tu compra</h3>
            <div className="relative">
              {/* Carousel de productos sugeridos (uno a la vez) */}
              <div className="h-[80px] relative">
                {suggestedProducts.length > 0 && (
                  <div className="w-full border border-gray-200 rounded-lg p-2">
                    <div className="flex items-center gap-3">
                      {/* Imagen del producto */}
                      <div className="w-16 h-16 flex-shrink-0">
                        <img 
                          src={suggestedProducts[currentSlide].image} 
                          alt={suggestedProducts[currentSlide].name}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      
                      {/* Información del producto */}
                      <div className="flex-grow">
                        <div className="text-xs text-gray-500 uppercase">ORGANA</div>
                        <h4 className="text-sm font-medium line-clamp-2 mb-1">{suggestedProducts[currentSlide].name}</h4>
                        <div className="font-bold text-green-600">S/ {suggestedProducts[currentSlide].price.toFixed(2)}</div>
                      </div>
                      
                      {/* Botón de agregar */}
                      <button 
                        onClick={() => handleAddSuggested(suggestedProducts[currentSlide])}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs py-1.5 px-2 rounded transition-colors whitespace-nowrap" style={{ backgroundColor: '#1ab25a' }}
                      >
                        AGREGAR
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Indicadores de posición del carousel */}
              <div className="flex justify-center mt-2 space-x-1">
                {suggestedProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Ir al producto ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Resumen del carrito y botón de checkout */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-white shadow-inner">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">S/ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Envío:</span>
              <span className="font-medium">Calculado al finalizar</span>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
              <AlertCircle size={14} />
              <span>Los cupones se aplicarán en el checkout</span>
            </div>
            
            {/* Total más prominente */}
            <div className="bg-green-50 p-3 rounded-lg shadow-sm mb-4 border border-green-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-bold">TOTAL:</span>
                <span className="text-2xl font-bold text-green-600">S/ {subtotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Link 
              href="/cart" 
              className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-md font-bold transition-colors" style={{ backgroundColor: '#1ab25a' }}
            >
              Proceder al pago
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
