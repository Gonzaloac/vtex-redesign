// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// /src/components/nav/MegaMenuFrescos.tsx  (submenu columnas)
// -----------------------------------------------------------------------------
export default function MegaMenuFrescos() {
    const columns = [
      {
        title: 'Lácteos y Derivados',
        items: ['Yogurt Probiótico', 'Yogurt Griego', 'Yogurt Líquido', 'Yogurt Vegano', 'Quesos', 'Quesos Veganos', 'Ver todo'],
      },
      {
        title: 'Bebidas',
        items: ['Bebidas Vegetales', 'Jugos Naturales', 'Bebidas Funcionales', 'Vinos', 'Ver todo'],
      },
      {
        title: 'Panes',
        items: ['Panes Veganos', 'Panes Keto', 'Otros Panes', 'Ver todo'],
      },
      {
        title: 'Huevos',
        items: ['Huevos Orgánicos', 'Huevos Saludables', 'Ver todo'],
      },
    ]
  
    return (
      <div className="py-8 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
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
