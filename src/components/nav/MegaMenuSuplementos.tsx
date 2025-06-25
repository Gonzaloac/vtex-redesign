// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// /src/components/nav/MegaMenuSuplementos.tsx  (submenu columnas)
// -----------------------------------------------------------------------------
export default function MegaMenuSuplementos() {
    const columns = [
      {
        title: 'Proteína',
        items: ['Whey', 'Isolatada', 'Veganas', 'Barras Proteicas', 'Otros'],
      },
      {
        title: 'Aminoácidos',
        items: ['Creatina', 'Glutamina', 'L-Arginina', 'BCAA', 'Otros'],
      },
      {
        title: 'Minerales',
        items: ['Magnesio', 'Potasio', 'Zinc', 'Calcio', 'Hierro', 'Selenio', 'Otros'],
      },
      {
        title: 'Colágenos',
        items: ['Colágeno Bovino', 'Colágeno Marino', 'Colágenos Funcionales', 'Otros'],
      },
      {
        title: 'Fibras Digestivas',
        items: ['Psyllium', 'Fibras Naturales', 'Otros'],
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
