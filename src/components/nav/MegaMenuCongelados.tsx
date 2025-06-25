// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// /src/components/nav/MegaMenuCongelados.tsx  (submenu columnas)
// -----------------------------------------------------------------------------
export default function MegaMenuCongelados() {
    const columns = [
      {
        title: 'Carnes Veganas',
        items: ['Hamburguesas', 'Seitán', 'Otras Carnes', 'Ver todo'],
      },
      {
        title: 'Embutidos',
        items: ['Salchichas', 'Chorizo', 'Jamoncillo', 'Mortadela', 'Ver todo'],
      },
      {
        title: 'Helados y Pulpas',
        items: ['Helados Veganos', 'Helados Proteicos', 'Helados Sin Azúcar', 'Helados Keto', 'Pulpas de Fruta', 'Ver todo'],
      },
    ]
  
    return (
      <div className="py-8 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
          {columns.map(col => (
            <div key={col.title} className="space-y-2">
              <p className="font-bold text-gray-900 uppercase text-[13px] mb-1">{col.title}</p>
              <ul className="space-y-1">
                {col.items.map(item => (
                  item !== 'Ver todo' ? (
                    <li key={item}>
                      <a href="#" className="hover:text-green-600 block">{item}</a>
                    </li>
                  ) : null
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
