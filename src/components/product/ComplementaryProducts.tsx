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
    
    // Añadir todos los productos complementarios (no solo los seleccionados)
    complementaryProducts.forEach(product => {
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
      <h3 className="text-xl font-bold text-green-700 mb-4">¡Haz tu compra aún mejor!</h3>
      <p className="text-gray-600 mb-4">Nuestros clientes suelen combinar estos productos</p>
      
      {/* Contenedor flex para productos */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-center md:space-x-8 mb-6">
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
        
        {/* Productos complementarios en fila para escritorio */}
        {complementaryProducts.map((product, index) => (
          <div key={product.id} className="flex flex-col items-center mb-4 md:mb-0">
            {/* Símbolo de suma */}
            <div className="flex-shrink-0 text-xl font-bold text-gray-400 mb-2">+</div>
            
            {/* Producto complementario - todos seleccionados por defecto */}
            <div 
              className="relative border border-green-500 bg-green-50 rounded-lg p-2 flex-shrink-0 w-full max-w-[120px] aspect-square"
            >
              <div className="absolute -top-2 -right-2 bg-green-500 rounded-full text-white">
                <CheckCircle size={16} />
              </div>
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
      
      {/* Detalles de productos */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
          <p className="text-sm">
            {mainProduct.title} - S/ {mainProduct.discount 
              ? (mainProduct.price * (1 - mainProduct.discount / 100)).toFixed(2) 
              : mainProduct.price.toFixed(2)}
          </p>
        </div>
        
        {complementaryProducts.map(product => (
          <div key={product.id} className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
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
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition-colors w-full sm:w-auto"
        >
          Añadir combo
        </button>
      </div>
    </div>
  );
};

export default ComplementaryProducts;
