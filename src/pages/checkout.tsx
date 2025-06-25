import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Trash2, CreditCard, Truck, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const CheckoutPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const router = useRouter();

  // Si el carrito está vacío, redirigir a la página principal
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="bg-gray-100 p-6 rounded-full inline-block mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">
            Parece que aún no has agregado productos a tu carrito. Explora nuestro catálogo para encontrar lo que necesitas.
          </p>
          <Link
            href="/"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium transition-colors inline-block"
          >
            Explorar productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700">
          <ArrowLeft size={16} className="mr-2" />
          <span>Continuar comprando</span>
        </Link>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-8">Finalizar compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna izquierda: Productos */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Productos ({totalItems})</h2>
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="py-6 flex flex-col sm:flex-row gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">SKU: {item.sku || 'N/A'}</p>
                    
                    <div className="mt-2 flex flex-wrap items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                          aria-label="Disminuir cantidad"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                          aria-label="Aumentar cantidad"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm flex items-center"
                      >
                        <Trash2 size={14} className="mr-1" />
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-medium text-gray-900">S/ {item.price.toFixed(2)}</p>
                    {item.quantity > 1 && (
                      <p className="text-sm text-gray-500 mt-1">
                        S/ {item.price.toFixed(2)} x {item.quantity}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Formulario de envío */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Truck size={20} className="mr-2 text-green-600" />
              Información de envío
            </h2>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="fullname"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Ciudad
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="postal" className="block text-sm font-medium text-gray-700 mb-1">
                  Código postal
                </label>
                <input
                  type="text"
                  id="postal"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>
          
          {/* Métodos de pago */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard size={20} className="mr-2 text-green-600" />
              Método de pago
            </h2>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-md p-4 cursor-pointer hover:border-green-500">
                <div className="flex items-center">
                  <input
                    id="card"
                    name="payment-method"
                    type="radio"
                    defaultChecked
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                    Tarjeta de crédito/débito
                  </label>
                </div>
                
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                      Número de tarjeta
                    </label>
                    <input
                      type="text"
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de expiración
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        placeholder="MM/AA"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        placeholder="123"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4 cursor-pointer hover:border-green-500">
                <div className="flex items-center">
                  <input
                    id="paypal"
                    name="payment-method"
                    type="radio"
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                    PayPal
                  </label>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4 cursor-pointer hover:border-green-500">
                <div className="flex items-center">
                  <input
                    id="transfer"
                    name="payment-method"
                    type="radio"
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="transfer" className="ml-3 block text-sm font-medium text-gray-700">
                    Transferencia bancaria
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Columna derecha: Resumen de compra */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Resumen de compra</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalItems} productos)</span>
                <span className="font-medium">S/ {subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Envío</span>
                <span className="font-medium">S/ 10.00</span>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>S/ {(subtotal + 10).toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Incluye IGV</p>
              </div>
              
              <div className="pt-4">
                <button
                  type="button"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
                  onClick={() => alert('¡Gracias por tu compra! Este sistema se integrará con VTEX.')}
                >
                  Confirmar pedido
                </button>
                
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <AlertCircle size={14} />
                  <span>
                    Al confirmar, aceptas nuestros términos y condiciones
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center pt-4">
                <img src="/visa.svg" alt="Visa" className="h-6" />
                <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
                <img src="/amex.svg" alt="American Express" className="h-6" />
                <img src="/paypal.svg" alt="PayPal" className="h-6" />
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-md p-3 text-xs text-green-800 flex items-start gap-2">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <p>
                  Este checkout es una simulación. En la migración a VTEX, se utilizará el checkout nativo de la plataforma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
