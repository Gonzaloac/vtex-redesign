import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/Layout'
import { products, Product } from '@/data/products'
import Link from 'next/link'

export default function SearchPage() {
  const router = useRouter()
  const { q } = router.query
  const [searchResults, setSearchResults] = useState<Product[]>([])

  useEffect(() => {
    if (q && typeof q === 'string') {
      const query = q.toLowerCase()
      const results = products.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.subtitle.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      )
      setSearchResults(results)
    }
  }, [q])

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Resultados de búsqueda</h1>
        <p className="text-gray-600 mb-8">
          {searchResults.length} productos encontrados para "{q}"
        </p>

        {searchResults.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">No se encontraron productos</h2>
            <p className="text-gray-600 mb-8">
              Intenta con otras palabras clave o navega por nuestras categorías
            </p>
            <Link href="/" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md">
              Volver al inicio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-4 flex items-center justify-center" style={{ height: '200px' }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-4 border-t">
                  <p className="text-sm text-gray-500 mb-1">{product.subtitle}</p>
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-green-600 font-bold text-lg">
                    S/ {product.discount
                      ? (product.price * (1 - product.discount / 100)).toFixed(2)
                      : product.price.toFixed(2)
                    }
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
