import React from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface ProductErrorFallbackProps {
  resetErrorBoundary?: () => void;
}

const ProductErrorFallback: React.FC<ProductErrorFallbackProps> = ({ resetErrorBoundary }) => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="text-red-500 mb-4">
          <RefreshCw size={48} className="mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-4">No se pudo cargar el producto</h2>
        <p className="text-gray-600 mb-6">
          Lo sentimos, ha ocurrido un error al cargar la información del producto.
          Por favor, intenta nuevamente o navega a otra sección.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} />
            <span>Intentar nuevamente</span>
          </button>
          <Link href="/"
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductErrorFallback;
