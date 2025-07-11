import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/Layout'
import { products, Product } from '@/data/products'
import Link from 'next/link'
import { Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react'

// Tipos de filtros que se usarán en la página de categoría
interface FilterOption {
  id: string
  name: string
  options: {
    value: string
    label: string
    count: number
  }[]
}

// Filtros de ejemplo para vitaminas
const filters: FilterOption[] = [
  {
    id: 'brand',
    name: 'Marca',
    options: [
      { value: 'organa', label: 'Organa', count: 12 },
      { value: 'smartblend', label: 'Smart Blend', count: 8 },
      { value: 'natures-truth', label: "Nature's Truth", count: 6 },
      { value: 'herbals-health', label: 'Herbals & Health', count: 5 },
      { value: 'biocenter', label: 'BioCenter', count: 4 },
    ],
  },
  {
    id: 'type',
    name: 'Tipo',
    options: [
      { value: 'vitamin-a', label: 'Vitamina A', count: 3 },
      { value: 'vitamin-b', label: 'Complejo B', count: 8 },
      { value: 'vitamin-c', label: 'Vitamina C', count: 10 },
      { value: 'vitamin-d', label: 'Vitamina D', count: 7 },
      { value: 'vitamin-e', label: 'Vitamina E', count: 4 },
      { value: 'multivitamin', label: 'Multivitamínicos', count: 12 },
    ],
  },
  {
    id: 'format',
    name: 'Formato',
    options: [
      { value: 'capsules', label: 'Cápsulas', count: 18 },
      { value: 'tablets', label: 'Tabletas', count: 12 },
      { value: 'powder', label: 'Polvo', count: 6 },
      { value: 'liquid', label: 'Líquido', count: 4 },
      { value: 'gummies', label: 'Gomitas', count: 5 },
    ],
  },
  {
    id: 'price',
    name: 'Precio',
    options: [
      { value: '0-50', label: 'Menos de S/ 50', count: 8 },
      { value: '50-100', label: 'S/ 50 - S/ 100', count: 15 },
      { value: '100-150', label: 'S/ 100 - S/ 150', count: 10 },
      { value: '150-plus', label: 'Más de S/ 150', count: 7 },
    ],
  },
]

export default function VitaminasPage() {
  const router = useRouter()
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [sortOption, setSortOption] = useState('featured')
  
  // Filtrar productos que pertenecen a la categoría de vitaminas
  // En una implementación real, esto vendría de la API de VTEX
  useEffect(() => {
    // Simulamos productos de la categoría vitaminas filtrando por palabras clave en el título o subtítulo
    const categoryProducts = products.filter(
      (product) => 
        product.title.includes('Vitamin') || 
        product.subtitle.includes('Vitamin') ||
        product.description.includes('Vitamin')
    )
    setFilteredProducts(categoryProducts)
  }, [])

  // Aplicar filtros seleccionados
  const applyFilters = (filters: Record<string, string[]>) => {
    setActiveFilters(filters)
    // En una implementación real, esto haría una llamada a la API de VTEX con los filtros
    // Por ahora simulamos el filtrado
    console.log('Filtros aplicados:', filters)
  }

  // Eliminar un filtro específico
  const removeFilter = (filterId: string, value: string) => {
    const updatedFilters = { ...activeFilters }
    if (updatedFilters[filterId]) {
      updatedFilters[filterId] = updatedFilters[filterId].filter(v => v !== value)
      if (updatedFilters[filterId].length === 0) {
        delete updatedFilters[filterId]
      }
    }
    applyFilters(updatedFilters)
  }

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setActiveFilters({})
  }

  // Añadir un filtro
  const addFilter = (filterId: string, value: string) => {
    const updatedFilters = { ...activeFilters }
    if (!updatedFilters[filterId]) {
      updatedFilters[filterId] = []
    }
    if (!updatedFilters[filterId].includes(value)) {
      updatedFilters[filterId] = [...updatedFilters[filterId], value]
    }
    applyFilters(updatedFilters)
  }

  return (
    <Layout>
      {/* Banner de categoría */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">Vitaminas</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Encuentra las mejores vitaminas y suplementos para mantener tu salud y bienestar. 
            Productos de alta calidad con certificaciones internacionales.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-green-600">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-800">Vitaminas</span>
        </div>

        {/* Filtros activos */}
        {Object.keys(activeFilters).length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">Filtros activos:</span>
              {Object.entries(activeFilters).map(([filterId, values]) => 
                values.map(value => {
                  const filterGroup = filters.find(f => f.id === filterId)
                  const option = filterGroup?.options.find(o => o.value === value)
                  return (
                    <button 
                      key={`${filterId}-${value}`}
                      onClick={() => removeFilter(filterId, value)}
                      className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded-full"
                    >
                      <span>{filterGroup?.name}: {option?.label}</span>
                      <X size={14} />
                    </button>
                  )
                })
              )}
              <button 
                onClick={clearAllFilters}
                className="text-sm text-green-600 hover:text-green-700 font-medium ml-2"
              >
                Limpiar todos
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtros de escritorio */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <div className="bg-white rounded-lg shadow p-5">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Filter size={18} />
                  Filtrar productos
                </h2>
                
                {filters.map((filter) => (
                  <div key={filter.id} className="mb-6">
                    <h3 className="font-semibold mb-3">{filter.name}</h3>
                    <div className="space-y-2">
                      {filter.options.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`${filter.id}-${option.value}`}
                            name={`${filter.id}[]`}
                            value={option.value}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            checked={activeFilters[filter.id]?.includes(option.value) || false}
                            onChange={(e) => {
                              if (e.target.checked) {
                                addFilter(filter.id, option.value)
                              } else {
                                removeFilter(filter.id, option.value)
                              }
                            }}
                          />
                          <label
                            htmlFor={`${filter.id}-${option.value}`}
                            className="ml-3 text-sm text-gray-700 flex justify-between w-full"
                          >
                            <span>{option.label}</span>
                            <span className="text-gray-500">({option.count})</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Barra de herramientas */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{filteredProducts.length}</span> productos
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Botón de filtros móvil */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <SlidersHorizontal size={16} />
                  Filtros
                </button>
                
                {/* Selector de ordenamiento */}
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500"
                  >
                    <option value="featured">Destacados</option>
                    <option value="price-low">Precio: Menor a mayor</option>
                    <option value="price-high">Precio: Mayor a menor</option>
                    <option value="name">Nombre</option>
                    <option value="newest">Más recientes</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative p-5 pb-3 flex-grow flex items-center justify-center" style={{ height: '260px' }}>
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="max-h-full max-w-full object-contain" 
                      />
                      {product.discount && (
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-sm font-bold px-2.5 py-1 rounded-md shadow-md transform scale-110">
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                    <div className="p-5 pt-2 flex flex-col justify-between" style={{ minHeight: '220px' }}>
                      <div>
                        <p className="text-sm text-gray-500 uppercase mb-1.5">{product.subtitle}</p>
                        <h3 className="text-base sm:text-lg font-semibold mb-2.5 line-clamp-2 min-h-[3rem]">{product.title}</h3>
                      </div>
                      <div className="mt-auto">
                        <div className="flex items-center gap-2.5 mb-3.5">
                          {product.discount ? (
                            <> 
                              <p className="text-gray-500 text-sm line-through">S/ {product.price.toFixed(2)}</p>
                              <p className="text-green-600 text-xl font-bold">
                                S/ {(product.price * (1 - product.discount / 100)).toFixed(2)}
                              </p>
                            </>
                          ) : (
                            <p className="text-green-600 text-xl font-bold mb-3.5">S/ {product.price.toFixed(2)}</p>
                          )}
                        </div>
                        
                        {/* Íconos de disponibilidad */}
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1.5 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span className="text-xs font-medium">Delivery</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1.5 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                              <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            <span className="text-xs font-medium">Recojo en tienda</span>
                          </div>
                        </div>
                        
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white text-base font-semibold py-2.5 rounded-md transition-colors">
                          Agregar al carrito
                        </button>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <h2 className="text-2xl font-semibold mb-4">No se encontraron productos</h2>
                  <p className="text-gray-600 mb-8">
                    Intenta con otros filtros o navega por nuestras categorías
                  </p>
                  <button 
                    onClick={clearAllFilters}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de filtros móviles */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowMobileFilters(false)}></div>
          
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="p-4">
                  {filters.map((filter) => (
                    <div key={filter.id} className="mb-6">
                      <h3 className="font-semibold mb-3">{filter.name}</h3>
                      <div className="space-y-2">
                        {filter.options.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`mobile-${filter.id}-${option.value}`}
                              name={`${filter.id}[]`}
                              value={option.value}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                              checked={activeFilters[filter.id]?.includes(option.value) || false}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  addFilter(filter.id, option.value)
                                } else {
                                  removeFilter(filter.id, option.value)
                                }
                              }}
                            />
                            <label
                              htmlFor={`mobile-${filter.id}-${option.value}`}
                              className="ml-3 text-sm text-gray-700 flex justify-between w-full"
                            >
                              <span>{option.label}</span>
                              <span className="text-gray-500">({option.count})</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 px-4 py-5">
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      onClick={clearAllFilters}
                    >
                      Limpiar
                    </button>
                    <button
                      type="button"
                      className="flex-1 bg-green-600 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
