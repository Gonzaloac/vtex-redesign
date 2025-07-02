// -----------------------------------------------------------------------------
// 2. components/blocks/CategoryGrid.tsx
// -----------------------------------------------------------------------------
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Category {
  id: number
  title: string
  image: string
  url: string
}

const categories: Category[] = [
  { id: 1, title: 'Suplementos', image: '/Categorías-Suplementos-1.png', url: '/categorias/suplementos' },
  { id: 2, title: 'Frescos', image: '/Categorías-Frescos-1.png', url: '/categorias/frescos' },
  { id: 3, title: 'Congelados', image: '/Categorías-Congelados-1.png', url: '/categorias/congelados' },
  { id: 4, title: 'Abarrotes', image: '/Categorías-Abarrotes-1.png', url: '/categorias/abarrotes' },
]

export default function CategoryGrid() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold mb-8">Encuentra Lo Que Buscas</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              href={category.url} 
              key={category.id}
              className="block transition-transform hover:scale-[1.02] duration-200"
            >
              <div className="relative rounded-lg overflow-hidden shadow-md" style={{ aspectRatio: '2/3' }}>
                <Image 
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
