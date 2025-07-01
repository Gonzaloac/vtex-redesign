export interface ImmuneProduct {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  discount?: number;
}

export const immuneProducts: ImmuneProduct[] = [
  { 
    id: "immune-1", 
    title: "IMMUNE DEFENSE HEALING LAB 30ML", 
    subtitle: "Healing Lab", 
    price: 89.90, 
    image: "/immune-defense-1.png" 
  },
  { 
    id: "immune-2", 
    title: "VITAMINA C 1000MG 100 CAPS", 
    subtitle: "Now Foods", 
    price: 79.90, 
    image: "/162494-1200-auto.png",
    discount: 15
  },
  { 
    id: "immune-3", 
    title: "ZINC PICOLINATE 50MG 60 CAPS", 
    subtitle: "Thorne Research", 
    price: 65.90, 
    image: "/162143-1200-auto.png" 
  },
  { 
    id: "immune-4", 
    title: "ELDERBERRY EXTRACT 60 CAPS", 
    subtitle: "Nature's Way", 
    price: 72.90, 
    image: "/161711-1200-auto.png" 
  },
  { 
    id: "immune-5", 
    title: "ECHINACEA COMPLEX 90 CAPS", 
    subtitle: "Herbals & Health", 
    price: 59.90, 
    image: "/162631-1200-auto.png" 
  },
  { 
    id: "immune-6", 
    title: "VITAMIN D3 5000IU 120 SOFTGELS", 
    subtitle: "Organa", 
    price: 69.90, 
    image: "/163241-1200-auto.png",
    discount: 10
  },
  { 
    id: "immune-7", 
    title: "QUERCETIN WITH BROMELAIN 120 CAPS", 
    subtitle: "Smartblend", 
    price: 84.90, 
    image: "/162142-300-300.png" 
  },
  { 
    id: "immune-8", 
    title: "IMMUNE SUPPORT COMPLEX 60 CAPS", 
    subtitle: "xtralife", 
    price: 79.90, 
    image: "/162206-1200-auto.png" 
  }
];
