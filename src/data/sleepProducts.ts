export interface SleepProduct {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  discount?: number;
}

export const sleepProducts: SleepProduct[] = [
  { 
    id: "sleep-1", 
    title: "CITRATO DE MAGNESIO SMART BLENDS 400GR", 
    subtitle: "Smartblend", 
    price: 84.90, 
    image: "/162142-300-300.png" 
  },
  { 
    id: "sleep-2", 
    title: "ASHWAGANDHA 60 CAPS VEGANA HERBAL & HEALTH", 
    subtitle: "Herbals & Health", 
    price: 69.90, 
    image: "/161711-1200-auto.png" 
  },
  { 
    id: "sleep-3", 
    title: "CITRATO DE POTASIO SMART BLENDS 400GR", 
    subtitle: "Smartblend", 
    price: 72.90, 
    image: "/162143-1200-auto.png" 
  },
  { 
    id: "sleep-4", 
    title: "FISH OIL (ACEITE DE PESCADO OMEGA-3) 1000MG NUTRICOST", 
    subtitle: "Organa", 
    price: 196.90, 
    image: "/163241-1200-auto.png" 
  },
  { 
    id: "sleep-5", 
    title: "MELATONINA 5MG 60 CAPS", 
    subtitle: "Nature's Truth", 
    price: 59.90, 
    image: "/162631-1200-auto.png",
    discount: 15 
  },
  { 
    id: "sleep-6", 
    title: "VALERIANA ROOT EXTRACT 60 CAPS", 
    subtitle: "Mason Naturals", 
    price: 65.90, 
    image: "/162886-1200-auto.png" 
  },
  { 
    id: "sleep-7", 
    title: "MAGNESIUM GLYCINATE 400MG 120 CAPS", 
    subtitle: "Now Foods", 
    price: 89.90, 
    image: "/162494-1200-auto.png" 
  },
  { 
    id: "sleep-8", 
    title: "SLEEP SUPPORT COMPLEX 60 CAPS", 
    subtitle: "xtralife", 
    price: 79.90, 
    image: "/162206-1200-auto.png",
    discount: 10 
  }
];
