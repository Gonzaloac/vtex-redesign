// src/data/products.ts
export interface Product {
    id: number
    title: string
    subtitle: string
    price: number
    image: string
    images?: string[]
    discount?: number
    description: string
    features: string[]
    nutritionalInfo?: {
      servingSize: string
      servingsPerContainer: number
      calories: number
      protein: number
      totalFat: number
      totalCarbs: number
      sugars: number
      sodium: number
    }
    ingredients?: string[]
    usageInstructions?: string
    additionalInfo?: string
  }
  
  export const products: Product[] = [
    { 
      id: 1, 
      title: 'Citrato de Magnesio Smart Blends 400gr', 
      subtitle: 'Smartblend', 
      price: 84.9, 
      image: '/Citrato-Recomendado-1.png',
      images: [
        '/162143-1200-auto.png',
        '/162494-1200-auto.png',
        '/CMP400-01.webp',
      ],
      description: 'El Citrato de Magnesio Smart Blends es un suplemento de alta calidad que ayuda a mejorar la salud muscular y ósea. Ideal para deportistas y personas con deficiencia de magnesio.',
      features: [
        'Ayuda a reducir la fatiga muscular',
        'Contribuye a la salud ósea',
        'Mejora la calidad del sueño',
        'Fácil absorción por el organismo',
        'Formato en polvo para fácil consumo'
      ],
      nutritionalInfo: {
        servingSize: '1 cucharada (5g)',
        servingsPerContainer: 80,
        calories: 0,
        protein: 0,
        totalFat: 0,
        totalCarbs: 0,
        sugars: 0,
        sodium: 0
      },
      ingredients: [
        'Citrato de Magnesio',
        'Sin aditivos ni conservantes'
      ],
      usageInstructions: 'Disolver una cucharada (5g) en un vaso de agua. Tomar preferentemente antes de dormir o después de actividad física intensa.',
      additionalInfo: 'El magnesio es un mineral esencial que participa en más de 300 reacciones bioquímicas en el cuerpo. Ayuda a mantener el funcionamiento normal de músculos y nervios, mantiene el ritmo cardíaco estable, y contribuye a la salud ósea.'
    },
    { 
      id: 2, 
      title: 'Ashwagandha 60 Caps Vegana', 
      subtitle: 'Herbals & Health', 
      price: 69.9, 
      image: '/161711-1200-auto.png',
      images: [
        '/161711-300-300.png',
        '/162886-1200-auto.png',
        '/163241-1200-auto.png',
      ],
      description: 'La Ashwagandha es una hierba adaptógena que ayuda al cuerpo a manejar el estrés. Esta presentación vegana de Herbals & Health ofrece 60 cápsulas de alta potencia.',
      features: [
        'Reduce los niveles de estrés y ansiedad',
        'Mejora la concentración y claridad mental',
        'Aumenta los niveles de energía',
        'Fórmula 100% vegana',
        'Sin aditivos artificiales'
      ],
      nutritionalInfo: {
        servingSize: '1 cápsula',
        servingsPerContainer: 60,
        calories: 5,
        protein: 0,
        totalFat: 0,
        totalCarbs: 1,
        sugars: 0,
        sodium: 0
      },
      ingredients: [
        'Extracto de raíz de Ashwagandha (Withania somnifera)',
        'Cápsula vegetal (HPMC)',
        'Arroz integral en polvo'
      ],
      usageInstructions: 'Tomar 1 cápsula al día con alimentos o según recomendación de un profesional de la salud.',
      additionalInfo: 'La Ashwagandha es una hierba adaptógena utilizada durante miles de años en la medicina ayurvédica. Ayuda al cuerpo a adaptarse al estrés y promueve el equilibrio general.'
    },
    { 
      id: 3, 
      title: 'Resveratrol BioCenter 100 Caps', 
      subtitle: 'BioCenter', 
      price: 72.9, 
      image: '/REVERATROL-CAP.png',
      description: 'El Resveratrol de BioCenter es un potente antioxidante que ayuda a combatir el envejecimiento celular y promueve la salud cardiovascular.',
      features: [
        'Potente antioxidante natural',
        'Protege la salud cardiovascular',
        'Combate el envejecimiento celular',
        'Promueve la longevidad',
        'Alta concentración por cápsula'
      ],
      nutritionalInfo: {
        servingSize: '1 cápsula',
        servingsPerContainer: 100,
        calories: 5,
        protein: 0,
        totalFat: 0,
        totalCarbs: 1,
        sugars: 0,
        sodium: 0
      },
      ingredients: [
        'Resveratrol (de Polygonum cuspidatum)',
        'Extracto de uva roja',
        'Cápsula vegetal',
        'Celulosa microcristalina',
        'Vitamina E (como antioxidante natural)',
      ],
      usageInstructions: 'Tomar 1 cápsula diaria con alimentos.',
      additionalInfo: 'El resveratrol es un compuesto que se encuentra naturalmente en las uvas rojas y el vino tinto. Es conocido por sus propiedades antioxidantes y sus beneficios para la salud cardiovascular.'
    },
    { 
      id: 4, 
      title: 'Fish Oil (Omega-3) 1000mg', 
      subtitle: 'Organa', 
      price: 196, 
      image: '/Fish-Oil-Recomendado-1.png',
      description: ' El aceite de pescado Omega-3 de Organa proporciona 1000mg de ácidos grasos esenciales EPA y DHA que apoyan la salud cerebral, cardíaca y articular. Trae vitamina E como antioxidante natural.',
      features: [
        'Alto contenido de EPA y DHA',
        'Apoya la salud cardiovascular',
        'Mejora la función cerebral',
        'Reduce la inflamación articular',
        'Purificado para eliminar metales pesados'
      ],
      nutritionalInfo: {
        servingSize: '1 cápsula blanda',
        servingsPerContainer: 90,
        calories: 10,
        protein: 0,
        totalFat: 1,
        totalCarbs: 0,
        sugars: 0,
        sodium: 0
      },
      ingredients: [
        'Aceite de pescado concentrado',
        'Gelatina',
        'Glicerina',
        'Agua purificada',
        'Vitamina E (como conservante natural)'
      ],
      usageInstructions: 'Tomar 1 cápsula blanda 1-3 veces al día con las comidas.',
      additionalInfo: 'Los ácidos grasos omega-3 EPA y DHA son esenciales para la salud y deben obtenerse a través de la dieta o suplementos, ya que el cuerpo no puede producirlos por sí solo.'
    },
    { 
      id: 5, 
      title: 'Melena de León Mush Organics 60caps', 
      subtitle: 'Mush Organics', 
      price: 75.65, 
      image: '/162494-1200-auto.png', 
      discount: 15,
      description: 'La Melena de León de Mush Organics es un hongo medicinal que apoya la salud cognitiva y el sistema nervioso. Cultivado orgánicamente para máxima pureza.',
      features: [
        'Estimula la producción de NGF (Factor de Crecimiento Nervioso)',
        'Mejora la memoria y concentración',
        'Apoya la salud digestiva',
        'Cultivo 100% orgánico',
        'Sin pesticidas ni químicos'
      ],
      nutritionalInfo: {
        servingSize: '2 cápsulas',
        servingsPerContainer: 30,
        calories: 5,
        protein: 0,
        totalFat: 0,
        totalCarbs: 1,
        sugars: 0,
        sodium: 0
      },
      ingredients: [
        'Extracto de hongo Melena de León (Hericium erinaceus)',
        'Cápsula vegetal (HPMC)',
        'Arroz integral en polvo'
      ],
      usageInstructions: 'Tomar 2 cápsulas al día con alimentos o según recomendación de un profesional de la salud.',
      additionalInfo: 'La Melena de León es un hongo medicinal reconocido por sus beneficios para la salud cerebral y el sistema nervioso. Contiene compuestos bioactivos que estimulan la producción del Factor de Crecimiento Nervioso (NGF).'
    },
    { 
      id: 6, 
      title: 'HGH Releasing Xtralife 120tab', 
      subtitle: 'xtralife', 
      price: 178, 
      image: '/162206-1200-auto.png',
      description: 'HGH Releasing de Xtralife es un suplemento avanzado que estimula la producción natural de hormona de crecimiento, ayudando a mantener la masa muscular y reducir la grasa corporal.',
      features: [
        'Estimula la producción natural de HGH',
        'Ayuda a mantener la masa muscular',
        'Contribuye a la reducción de grasa corporal',
        'Mejora la recuperación post-entrenamiento',
        'Fórmula de liberación prolongada'
      ],
      nutritionalInfo: {
        servingSize: '2 tabletas',
        servingsPerContainer: 60,
        calories: 10,
        protein: 0,
        totalFat: 0,
        totalCarbs: 2,
        sugars: 0,
        sodium: 5
      },
      ingredients: [
        'L-Arginina',
        'L-Ornitina',
        'L-Lisina',
        'L-Glutamina',
        'Extracto de raíz de Maca',
        'Extracto de Tribulus Terrestris',
        'Zinc',
        'Magnesio'
      ],
      usageInstructions: 'Tomar 2 tabletas antes de dormir con el estómago vacío, o según indicación de un profesional de la salud.',
      additionalInfo: 'Esta fórmula está diseñada para optimizar los niveles naturales de hormona de crecimiento del cuerpo, que tienden a disminuir con la edad. No contiene hormonas sintéticas.'
    },
    { 
      id: 7, 
      title: 'Anxiety (Ashwagandha+Rhodiola) 60caps', 
      subtitle: 'xtralife', 
      price: 99, 
      image: '/162193-1200-auto.png',
      description: 'El suplemento Anxiety de Xtralife combina Ashwagandha y Rhodiola, dos potentes adaptógenos que ayudan a reducir el estrés y la ansiedad de forma natural.',
      features: [
        'Combinación sinérgica de adaptógenos',
        'Reduce los síntomas de ansiedad',
        'Mejora la respuesta al estrés',
        'Aumenta la resistencia mental',
        'No causa somnolencia ni dependencia'
      ],
      nutritionalInfo: {
        servingSize: '1 cápsula',
        servingsPerContainer: 60,
        calories: 5,
        protein: 0,
        totalFat: 0,
        totalCarbs: 1,
        sugars: 0,
        sodium: 0
      },
      ingredients: [
        'Extracto de raíz de Ashwagandha',
        'Extracto de raíz de Rhodiola Rosea',
        'L-Teanina',
        'Magnesio',
        'Vitamina B6',
        'Cápsula vegetal (HPMC)'
      ],
      usageInstructions: 'Tomar 1 cápsula 1-2 veces al día con alimentos o según recomendación de un profesional de la salud.',
      additionalInfo: 'Esta fórmula combina adaptógenos tradicionales con nutrientes modernos para ayudar al cuerpo a adaptarse al estrés y mantener el equilibrio emocional.'
    },
    { 
      id: 8, 
      title: 'Citrato de Magnesio Smart Blends 200gr', 
      subtitle: 'Smartblend', 
      price: 44.9, 
      image: '/162143-1200-auto.png',
      description: 'Versión compacta del popular Suplemento Citrato de Magnesio Smart Blends. Ideal para quienes buscan probar el producto o para viajes.',
      features: [
        'Mismo beneficio en formato más pequeño',
        'Ideal para viajes',
        'Ayuda a la relajación muscular',
        'Mejora la calidad del sueño',
        'Fácil de disolver y consumir'
      ],
      nutritionalInfo: {
        servingSize: '1 cucharada (5g)',
        servingsPerContainer: 40,
        calories: 0,
        protein: 0,
        totalFat: 0,
        totalCarbs: 0,
        sugars: 0,
        sodium: 0
      },
      ingredients: [
        'Citrato de Magnesio',
        'Sin aditivos ni conservantes'
      ],
      usageInstructions: 'Disolver una cucharada (5g) en un vaso de agua. Tomar preferentemente antes de dormir o después de actividad física intensa.',
      additionalInfo: 'El magnesio es un mineral esencial que participa en más de 300 reacciones bioquímicas en el cuerpo. Esta presentación más pequeña ofrece los mismos beneficios que la versión de 400gr.'
    },
    { 
      id: 9, 
      title: 'Glicinato de Magnesio 120 caps', 
      subtitle: `Nature's Truth`, 
      price: 139.9, 
      image: '/162631-1200-auto.png',
      description: 'El Glicinato de Magnesio de Nature\'s Truth ofrece una forma altamente biodisponible de magnesio, suplemento ideal para quienes buscan máxima absorción y mínima irritación intestinal.',
      features: [
        'Forma altamente biodisponible de magnesio',
        'Mínima irritación intestinal',
        'Ayuda a la función muscular y nerviosa',
        'Contribuye a la salud ósea',
        '120 cápsulas de liberación prolongada'
      ],
      nutritionalInfo: {
        servingSize: '2 cápsulas',
        servingsPerContainer: 60,
        calories: 5,
        protein: 0,
        totalFat: 0,
        totalCarbs: 1,
        sugars: 0,
        sodium: 0
      },
      ingredients: [
        'Glicinato de Magnesio',
        'Cápsula vegetal (HPMC)',
        'Celulosa microcristalina',
        'Estearato de magnesio vegetal'
      ],
      usageInstructions: 'Tomar 2 cápsulas al día con alimentos o según recomendación de un profesional de la salud.',
      additionalInfo: 'El glicinato de magnesio es una forma de magnesio unida al aminoácido glicina, lo que mejora su absorción y reduce los efectos laxantes comunes en otros suplementos de magnesio.'
    },
    { 
      id: 10, 
      title: 'CO Q-10 (VITAMINA E, OMEGA 3 Y FISH OIL) MASON NATURALS 60 CAPS', 
      subtitle: 'Mason Naturals', 
      price: 146, 
      image: '/162886-1200-auto.png',
      description: 'Vitaminas completa que combina Coenzima Q10, Vitamina E y Omega-3 para una salud cardiovascular óptima y protección antioxidante.',
      features: [
        'Triple acción para la salud cardiovascular',
        'Potente combinación antioxidante',
        'Apoya la producción de energía celular',
        'Protege las células del estrés oxidativo',
        'Fórmula de fácil absorción'
      ],
      nutritionalInfo: {
        servingSize: '1 cápsula blanda',
        servingsPerContainer: 60,
        calories: 10,
        protein: 0,
        totalFat: 1,
        totalCarbs: 0,
        sugars: 0,
        sodium: 0
      },
      ingredients: [
        'Coenzima Q10',
        'Vitamina E (como d-alfa tocoferol)',
        'Aceite de pescado (Omega-3)',
        'Gelatina',
        'Glicerina',
        'Agua purificada'
      ],
      usageInstructions: 'Tomar 1 cápsula blanda al día con alimentos.',
      additionalInfo: 'La Coenzima Q10 es una sustancia similar a las vitaminas que está presente en casi todas las células del cuerpo. Combinada con Vitamina E y Omega-3, proporciona un apoyo integral para la salud cardiovascular y la función celular.'
    },
  ]