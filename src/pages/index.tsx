// ==================== VTEX-like Next.js Project (with CategoryGrid) ====================

// 1. pages/index.tsx
import Layout from '@/components/layout/Layout'
import HeroBanner from '@/components/blocks/HeroBanner'
import CategoryGrid from '@/components/blocks/CategoryGrid'
import ProductShelf from '@/components/blocks/ProductShelf'
import BenefitsSection from '@/components/blocks/BenefitsSection'
import SleepRelaxSection from '@/components/blocks/SleepRelaxSection'
import DigestionWellnessSection from '@/components/blocks/DigestionWellnessSection'
import InfoBar from '@/components/blocks/InfoBar'
import PromotionTimer from '@/components/blocks/PromotionTimer'
import BrandsCarousel from '@/components/blocks/BrandsCarousel'

export default function Home() {
  // Fecha de finalización de la promoción (ejemplo: 7 días a partir de ahora)
  const promotionEndDate = new Date()
  promotionEndDate.setDate(promotionEndDate.getDate() + 7)
  
  return (
    <Layout>
      <HeroBanner
        title=""
        subtitle=""
        image="/banner-organa.jpg"
        mobileImage="/Banner-principal-Invierno-moviles-1.png"
        ctaText=""
        ctaLink="#"
      />

      {/* Temporizador de promociones */}
      <PromotionTimer 
        endDate={promotionEndDate}
        title="¡Ofertas especiales por tiempo limitado!"
        subtitle="Aprovecha estos descuentos exclusivos en productos seleccionados"
      />

      {/* Sección de categorías resaltadas */}
      <CategoryGrid />
      <ProductShelf />
      <BenefitsSection />
      <InfoBar />  {/* Nueva sección de info */}
      <SleepRelaxSection />
      <DigestionWellnessSection />
      <BrandsCarousel /> {/* Carrusel de marcas */}
     
    </Layout>
  )
}