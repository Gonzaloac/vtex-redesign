import React, { useState } from 'react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { CheckCircle } from 'lucide-react';

interface ComplementaryProductsProps {
  mainProduct: Product;
  complementaryProducts: Product[];
}

const ComplementaryProducts: React.FC<ComplementaryProductsProps> = ({ 
  mainProduct, 
  complementaryProducts 
}) => {
  const { addToCart } = useCart();
  // Inicializar con todos los productos seleccionados por defecto
  const [selectedProducts, setSelectedProducts] = useState<number[]>(
    complementaryProducts.map(product => product.id)
  );
  
  // Calcular el total de la compra incluyendo productos seleccionados
  const calculateTotal = () => {
    const mainProductPrice = mainProduct.discount 
      ? mainProduct.price * (1 - mainProduct.discount / 100) 
      : mainProduct.price;
      
    const complementaryTotal = complementaryProducts
      .filter(product => selectedProducts.includes(product.id))
      .reduce((sum, product) => {
        const price = product.discount 
          ? product.price * (1 - product.discount / 100) 
          : product.price;
        return sum + price;
      }, 0);
      
    return (mainProductPrice + complementaryTotal).toFixed(2);
  };
  
  // Manejar la selección/deselección de productos complementarios
  const toggleProduct = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  
  // Añadir todos los productos del combo al carrito
  const handleAddCombo = () => {
    // Añadir el producto principal
    addToCart({
      id: mainProduct.id.toString(),
      name: mainProduct.title,
      price: mainProduct.discount
        ? mainProduct.price * (1 - mainProduct.discount / 100)
        : mainProduct.price,
      image: mainProduct.image,
      quantity: 1,
      sku: `SKU-${mainProduct.id}`,
    });
    
    // Añadir solo los productos complementarios seleccionados
    complementaryProducts
      .filter(product => selectedProducts.includes(product.id))
      .forEach(product => {
        addToCart({
          id: product.id.toString(),
          name: product.title,
          price: product.discount
            ? product.price * (1 - product.discount / 100)
            : product.price,
          image: product.image,
          quantity: 1,
          sku: `SKU-${product.id}`,
        });
      });
      
    // Opcional: Mostrar mensaje de éxito o redireccionar al carrito
    alert('¡Combo añadido al carrito!');
  };
  
  if (complementaryProducts.length === 0) return null;
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-8">
      <p className="text-gray-600 mb-4">Nuestros clientes suelen combinar estos productos</p>
      
      {/* Vista móvil: grid de 2 columnas con todos los productos integrados */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {/* Producto principal integrado en la cuadrícula */}
        <div className="relative border border-[#1ab25a] bg-green-50 rounded-lg p-2 flex flex-col items-center">
          <div className="absolute -top-2 -right-2 bg-[#1ab25a] rounded-full text-white">
            <CheckCircle size={16} />
          </div>
          <div className="flex justify-center items-center h-24">
            <img 
              src={mainProduct.image} 
              alt={mainProduct.title} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <p className="text-xs mt-1 text-center line-clamp-1">{mainProduct.title}</p>
        </div>
        
        {/* Productos complementarios en la misma cuadrícula */}
        {complementaryProducts.map((product) => (
          <div 
            key={product.id} 
            className={`relative border ${selectedProducts.includes(product.id) ? 'border-[#1ab25a] bg-green-50' : 'border-gray-300 bg-white'} rounded-lg p-2 flex flex-col items-center cursor-pointer`}
            onClick={() => toggleProduct(product.id)}
          >
            {selectedProducts.includes(product.id) && (
              <div className="absolute -top-2 -right-2 bg-[#1ab25a] rounded-full text-white">
                <CheckCircle size={16} />
              </div>
            )}
            <div className="flex justify-center items-center h-24">
              <img 
                src={product.image} 
                alt={product.title} 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <p className="text-xs mt-1 text-center line-clamp-1">{product.title}</p>
          </div>
        ))}
      </div>
      
      {/* Vista desktop: mantiene el diseño original */}
      <div className="hidden md:flex md:flex-row md:items-center md:justify-center md:space-x-8 mb-6">
        {/* Producto principal */}
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <div className="flex-shrink-0 w-24 h-24 relative">
            <img 
              src={mainProduct.image} 
              alt={mainProduct.title} 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {/* Productos complementarios en fila para desktop */}
        <div className="flex flex-row items-center space-x-8 w-full">
          {complementaryProducts.map((product, index) => (
            <div key={product.id} className="flex flex-col items-center">
              {/* Símbolo de suma */}
              <div className="flex-shrink-0 text-xl font-bold text-gray-400 mb-2">+</div>
              
              {/* Producto complementario - con checkbox interactivo */}
              <div 
                className={`relative border ${selectedProducts.includes(product.id) ? 'border-[#1ab25a] bg-green-50' : 'border-gray-300 bg-white'} rounded-lg p-2 flex-shrink-0 w-full max-w-[120px] aspect-square cursor-pointer mx-auto`}
                onClick={() => toggleProduct(product.id)}
              >
                {selectedProducts.includes(product.id) && (
                  <div className="absolute -top-2 -right-2 bg-[#1ab25a] rounded-full text-white">
                    <CheckCircle size={16} />
                  </div>
                )}
                <div className="flex justify-center items-center h-full">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Detalles de productos */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={true}
            readOnly
            className="w-4 h-4 text-[#1ab25a] border-[#1ab25a] rounded mr-2"
          />
          <p className="text-sm">
            {mainProduct.title} - S/ {mainProduct.discount 
              ? (mainProduct.price * (1 - mainProduct.discount / 100)).toFixed(2) 
              : mainProduct.price.toFixed(2)}
          </p>
        </div>
        
        {complementaryProducts.map(product => (
          <div key={product.id} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedProducts.includes(product.id)}
              onChange={() => toggleProduct(product.id)}
              className="w-4 h-4 text-[#1ab25a] border-[#1ab25a] rounded mr-2 cursor-pointer"
            />
            <p className="text-sm">
              {product.title} - S/ {product.discount 
                ? (product.price * (1 - product.discount / 100)).toFixed(2) 
                : product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      
      {/* Total y botón de añadir */}
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <p className="text-sm text-gray-600">Total:</p>
          <p className="text-xl font-bold">S/ {calculateTotal()}</p>
        </div>
        
        <button 
          onClick={handleAddCombo}
          className="bg-[#1ab25a] hover:bg-[#1ab25a] text-white font-bold py-2 px-6 rounded-md transition-colors w-full sm:w-auto"
        >
          Añadir combo
        </button>
      </div>
    </div>
  );
};

export default ComplementaryProducts;
