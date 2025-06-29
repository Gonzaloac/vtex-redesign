export interface DigestProduct {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  discount?: number;
}

export const digestionProducts: DigestProduct[] = [
  { 
    id: "digest-1", 
    title: "CITRATO DE MAGNESIO SMART BLENDS 400GR", 
    subtitle: "SMARTBLEND", 
    price: 84.90, 
    image: "/162142-300-300.png" 
  },
  { 
    id: "digest-2", 
    title: "ASHWAGANDHA 60 CAPS VEGANA HERBAL & HEALTH", 
    subtitle: "HERBAL & HEALTH", 
    price: 69.90, 
    image: "/161711-1200-auto.png" 
  },
  { 
    id: "digest-3", 
    title: "CITRATO DE POTASIO SMART BLENDS 400GR", 
    subtitle: "SMARTBLEND", 
    price: 72.90, 
    image: "/162143-1200-auto.png" 
  },
  { 
    id: "digest-4", 
    title: "FISH OIL (ACEITE DE PESCADO OMEGA-3) 1000MG NUTRICOST", 
    subtitle: "ORGANA", 
    price: 196.90, 
    image: "/163241-1200-auto.png" 
  },
  { 
    id: "digest-5", 
    title: "MELATONINA 5MG 60 CAPS", 
    subtitle: "NATURE'S TRUTH", 
    price: 59.90, 
    image: "/162631-1200-auto.png",
    discount: 15 
  }
];
