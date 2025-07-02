import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import SimpleLayout from '@/components/layout/SimpleLayout';

const CartPage: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity,
    subtotal
  } = useCart();

  // Calcular el envío (ejemplo: gratis por encima de cierto monto)
  const shippingCost = subtotal >= 150 ? 0 : 10;
  
  // Total final
  const total = subtotal + shippingCost;

  return (
    <SimpleLayout title="Carrito de compra">
      <Head>
        <title>Carrito de compra | Organa</title>
        <meta name="description" content="Revisa los productos en tu carrito de compra" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Carrito de compra</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">Parece que aún no has agregado productos a tu carrito</p>
            <Link href="/" className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium transition-colors inline-block">
              Continuar comprando
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de productos */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Productos ({cart.length})</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div key={item.id} className="p-4 flex flex-col sm:flex-row gap-4">
                      {/* Imagen del producto */}
                      <div className="w-24 h-24 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      {/* Información del producto */}
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <div className="text-xs text-gray-500 uppercase mb-1">SKU: {item.id}</div>
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            {item.subtitle && (
                              <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>
                            )}
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500"
                            aria-label="Eliminar producto"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        
                        {/* Precio y cantidad */}
                        <div className="flex justify-between items-end mt-4">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 py-1 border-l border-r border-gray-300">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-bold text-green-600">
                              S/ {(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">
                              S/ {item.price.toFixed(2)} x {item.quantity}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Botón para seguir comprando */}
              <div className="mt-6">
                <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                  Continuar comprando
                </Link>
              </div>
            </div>
            
            {/* Resumen de compra */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Resumen de compra</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cart.length} productos)</span>
                    <span>S/ {subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600 font-medium">Gratis</span>
                    ) : (
                      <span>S/ {shippingCost.toFixed(2)}</span>
                    )}
                  </div>
                  
                  {shippingCost === 0 && (
                    <div className="bg-green-50 p-2 rounded text-xs text-green-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                      Envío gratis en compras mayores a S/ 150
                    </div>
                  )}
                  
                  {subtotal < 150 && (
                    <div className="text-xs text-gray-500">
                      Te faltan S/ {(150 - subtotal).toFixed(2)} para obtener envío gratis
                    </div>
                  )}
                  
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Total</span>
                      <span className="text-xl font-bold text-green-600">S/ {total.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Incluye IGV</div>
                  </div>
                </div>
                
                <Link 
                  href="/checkout" 
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-md font-bold transition-colors"
                >
                  Confirmar pedido
                </Link>
                
                <div className="mt-6">
                  <div className="text-sm text-gray-600 mb-2">Métodos de pago aceptados:</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <img src="/tarjetas-credito-logos.png" alt="Tarjetas de crédito" className="h-16 w-auto max-w-[300px]" />
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  Al confirmar el pedido, aceptas nuestros <Link href="/terms" className="text-green-600 hover:underline">términos y condiciones</Link> y <Link href="/privacy" className="text-green-600 hover:underline">política de privacidad</Link>.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SimpleLayout>
  );
};

export default CartPage;
