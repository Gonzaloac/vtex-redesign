// ==================== VTEX-like Next.js Project (with CategoryGrid) ====================

// 1. pages/index.tsx
import Layout from '@/components/layout/Layout'
import HeroBanner from '@/components/blocks/HeroBanner'
import CategoryGrid from '@/components/blocks/CategoryGrid'
import ProductShelf from '@/components/blocks/ProductShelf'
import BenefitsSection from '@/components/blocks/BenefitsSection'
import ImmuneDefenseSection from '@/components/blocks/ImmuneDefenseSection'
import SleepRelaxSection from '@/components/blocks/SleepRelaxSection'
import DigestionWellnessSection from '@/components/blocks/DigestionWellnessSection'
import InfoBar from '@/components/blocks/InfoBar'
import FlashSaleSection from '@/components/blocks/FlashSaleSection'
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

      {/* Sección de ofertas relámpago */}
      <FlashSaleSection endDate={promotionEndDate} />

      {/* Sección de categorías resaltadas */}
      <CategoryGrid />
      <ProductShelf />
      <BenefitsSection />
      <ImmuneDefenseSection />
      <InfoBar />  {/* Nueva sección de info */}
      <SleepRelaxSection />
      <DigestionWellnessSection />
      <BrandsCarousel /> {/* Carrusel de marcas */}
     
    </Layout>
  )
}