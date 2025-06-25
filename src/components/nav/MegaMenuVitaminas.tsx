// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// 4.3. /src/components/nav/MegaMenuVitaminas.tsx  (submenu columnas)
// -----------------------------------------------------------------------------
export default function MegaMenuVitaminas() {
    const columns = [
      {
        title: 'Vitaminas',
        items: ['Vitamina B', 'Vitamina C', 'Vitamina D', 'Vitamina E', 'Multivitaminas', 'Otras Vitaminas'],
      },
      {
        title: 'Bienestar',
        items: ['Omegas', 'Antioxidantes', 'Antiestrés y Sueño', 'Otros'],
      },
      {
        title: 'Naturales',
        items: ['Aguaje', 'Cúrcuma', 'Maca Negra', 'Maca Roja', 'Moringa', 'Cardo Mariano', 'Otros'],
      },
      {
        title: 'Gomitas',
        items: ['Gomitas Para Adultos', 'Gomitas Kids', 'Otras Gomitas'],
      },
      {
        title: 'Digestión y Salud',
        items: ['Probióticos', 'Enzimas', 'Extractos', 'Otros'],
      },
    ]
  
    return (
      <div className="py-8 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          {columns.map(col => (
            <div key={col.title} className="space-y-2">
              <p className="font-bold text-gray-900 uppercase text-[13px] mb-1">{col.title}</p>
              <ul className="space-y-1">
                {col.items.map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-green-600 block">{item}</a>
                  </li>
                ))}
                <li className="pt-1">
                  <a href="#" className="text-green-700 font-semibold">Ver todo</a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  }