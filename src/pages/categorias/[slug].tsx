import { useState, useEffect } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/Layout'
import { products, Product } from '@/data/products'
import Link from 'next/link'
import { Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react'

// ---------------------------------------------
// Types
// ---------------------------------------------
interface FilterOption {
  id: string
  name: string
  options: {
    value: string
    label: string
    count: number
  }[]
}

interface CategoryConfig {
  title: string
  description: string
  keyword: string // palabra clave para filtrar productos mock
  filters: FilterOption[]
}

// ---------------------------------------------
// Category configurations (expand as needed)
// ---------------------------------------------
const baseFilters: FilterOption[] = [
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

const categoryConfigs: Record<string, CategoryConfig> = {
  vitaminas: {
    title: 'Vitaminas',
    description: 'Encuentra aquí la mejor selección de vitaminas para toda la familia.',
    keyword: 'vitamina',
    filters: [
      ...baseFilters,
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
    ],
  },
  suplementos: {
    title: 'Suplementos',
    description: 'Potencia tu bienestar con nuestros suplementos de alta calidad.',
    keyword: 'suplemento',
    filters: baseFilters, // TODO: reemplazar con filtros específicos de Suplementos
  },
  abarrotes: {
    title: 'Abarrotes',
    description: 'Tu despensa completa con productos saludables y deliciosos.',
    keyword: 'abarrote',
    filters: baseFilters, // TODO
  },
  'refrigerados-congelados': {
    title: 'Refrigerados y Congelados',
    description: 'Productos frescos y listos para consumir.',
    keyword: 'refrigerado',
    filters: baseFilters, // TODO
  },
  'cuidado-personal': {
    title: 'Cuidado Personal',
    description: 'Todo lo que necesitas para tu rutina de cuidado personal.',
    keyword: 'cuidado',
    filters: baseFilters, // TODO
  },
  'frescos': {
    title: 'Frescos',
    description: 'Todo lo que necesitas para tu rutina de cuidado personal.',
    keyword: 'fresco',
    filters: baseFilters, // TODO
  },
  
}

// ---------------------------------------------
// Main page component
// ---------------------------------------------
interface PageProps {
  slug: string
}

export default function CategoryPage({ slug }: PageProps) {
  const router = useRouter()
  // Si se navega en cliente, usar la query por si no había props (fallback)
  const currentSlug = slug || (router.query.slug as string)
  const config = categoryConfigs[currentSlug]

  // Si el slug no existe en la configuración, mostrar 404 simple
  if (!config) {
    return (
      <Layout title="Colección no encontrada">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Colección no encontrada</h1>
          <p className="mb-6">La colección solicitada no existe.</p>
          <Link href="/" className="text-green-600 hover:underline">Volver al inicio</Link>
        </div>
      </Layout>
    )
  }

  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [sortOption, setSortOption] = useState('featured')

  // Obtener productos de la "API" filtrados por categoría (simulado con palabra clave)
  useEffect(() => {
    const keyword = config.keyword.toLowerCase()
    const categoryProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(keyword) ||
        product.subtitle.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword)
    )
    setFilteredProducts(categoryProducts)
  }, [config.keyword])

  // ---------------------------------------------
  // Funciones de filtrado (idénticas a VitaminasPage)
  // ---------------------------------------------
  const applyFilters = (filtersState: Record<string, string[]>) => {
    setActiveFilters(filtersState)
    // Aquí se haría la llamada a VTEX con los filtros aplicados
  }

  const removeFilter = (filterId: string, value: string) => {
    const updated = { ...activeFilters }
    if (updated[filterId]) {
      updated[filterId] = updated[filterId].filter((v) => v !== value)
      if (updated[filterId].length === 0) delete updated[filterId]
    }
    applyFilters(updated)
  }

  const clearAllFilters = () => setActiveFilters({})

  const addFilter = (filterId: string, value: string) => {
    const updated = { ...activeFilters }
    if (!updated[filterId]) updated[filterId] = []
    if (!updated[filterId].includes(value)) updated[filterId] = [...updated[filterId], value]
    applyFilters(updated)
  }

  // ---------------------------------------------
  // Render
  // ---------------------------------------------
  return (
    <Layout title={config.title}>
      {/* Banner de la categoría */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2 capitalize">{config.title}</h1>
          <p className="text-lg opacity-90 max-w-2xl">{config.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-200 lg:text-gray-500 mb-6">
          <Link href="/" className="hover:text-green-300 lg:hover:text-green-600">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-white lg:text-gray-800 capitalize">{config.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filtros (desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4 flex flex-col gap-6">
              <div className="bg-white rounded-lg shadow p-5">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Filter size={18} /> Filtrar productos
                </h2>
                {config.filters.map((filter) => (
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
                              e.target.checked
                                ? addFilter(filter.id, option.value)
                                : removeFilter(filter.id, option.value)
                            }}
                          />
                          <label htmlFor={`${filter.id}-${option.value}`} className="ml-3 text-sm text-gray-700 flex justify-between w-full">
                            <span>{option.label}</span>
                            <span className="text-gray-500">({option.count})</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <img
                src="/bannercoleccion.jpeg?v=1"
                alt="Ofertas"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </aside>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Controles superiors */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <SlidersHorizontal size={18} /> Filtros
              </button>
              <div />
            </div>

            {/* Ordenamiento */}
            <div className="flex items-center justify-end mb-4">
              <label className="mr-2 text-sm text-gray-700">Ordenar por:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: Menor a mayor</option>
                <option value="price-desc">Precio: Mayor a menor</option>
                <option value="name">Nombre</option>
                <option value="newest">Más recientes</option>
              </select>
            </div>

            {/* Filtros activos */}
            {Object.keys(activeFilters).length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2 items-center">
                {Object.entries(activeFilters).flatMap(([filterId, values]) =>
                  values.map((value) => (
                    <span key={`${filterId}-${value}`} className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      {value.replace(/-/g, ' ')}
                      <button onClick={() => removeFilter(filterId, value)}>
                        <X size={14} />
                      </button>
                    </span>
                  ))
                )}
                <button onClick={clearAllFilters} className="text-sm text-gray-600 underline ml-2">
                  Limpiar filtros
                </button>
              </div>
            )}

            {/* Grid de productos */}
            {filteredProducts.length === 0 ? (
              <p className="text-gray-600">No se encontraron productos para esta categoría.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:border-2 hover:border-green-600 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative p-3 flex-grow flex items-center justify-center" style={{ height: '280px' }}>
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-contain" 
                      />
                      {product.discount && (
                        <span className="absolute top-3 right-3 bg-green-600 text-white text-sm font-semibold px-2.5 py-1 rounded-md">
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
            )}
          </div>
        </div>

        {/* Banner de ofertas */}
        <div className="container mx-auto px-4 pb-12 lg:hidden">
          <img
            src="/bannercoleccion.jpeg?v=1"
            alt="Colección"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

      </div>

      {/* Modal filtros móvil */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75" onClick={() => setShowMobileFilters(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md bg-white shadow-xl flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h2 className="text-lg font-medium">Filtros</h2>
                <button onClick={() => setShowMobileFilters(false)} className="text-gray-400 hover:text-gray-500">
                  <X size={24} />
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-1">
                {config.filters.map((filter) => (
                  <div key={filter.id} className="mb-6">
                    <h3 className="font-semibold mb-3">{filter.name}</h3>
                    <div className="space-y-2">
                      {filter.options.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`mobile-${filter.id}-${option.value}`}
                            value={option.value}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            checked={activeFilters[filter.id]?.includes(option.value) || false}
                            onChange={(e) => {
                              e.target.checked
                                ? addFilter(filter.id, option.value)
                                : removeFilter(filter.id, option.value)
                            }}
                          />
                          <label htmlFor={`mobile-${filter.id}-${option.value}`} className="ml-3 text-sm text-gray-700 flex justify-between w-full">
                            <span>{option.label}</span>
                            <span className="text-gray-500">({option.count})</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t px-4 py-5 flex gap-3">
                <button onClick={clearAllFilters} className="flex-1 bg-white border border-gray-300 rounded-md py-2 text-sm">Limpiar</button>
                <button onClick={() => setShowMobileFilters(false)} className="flex-1 bg-green-600 text-white rounded-md py-2 text-sm">Aplicar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

// ---------------------------------------------
// SSG helpers
// ---------------------------------------------
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(categoryConfigs).map((slug) => ({ params: { slug } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  return {
    props: {
      slug: params!.slug as string,
    },
  }
}