import { useState, useEffect } from 'react'

interface PromotionTimerProps {
  endDate: Date
  title?: string
  subtitle?: string
  backgroundColor?: string
}

export default function PromotionTimer({ 
  endDate, 
  title = "¡Oferta por tiempo limitado!", 
  subtitle = "Aprovecha estos descuentos exclusivos antes de que termine la promoción",
  backgroundColor = "bg-green-600"
}: PromotionTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    // Verificar si la fecha de finalización ya pasó
    const now = new Date()
    if (endDate < now) {
      setIsActive(false)
      return
    }

    const timer = setInterval(() => {
      const now = new Date()
      const difference = endDate.getTime() - now.getTime()
      
      if (difference <= 0) {
        clearInterval(timer)
        setIsActive(false)
        return
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      
      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [endDate])
  
  if (!isActive) return null
  
  return (
    <div className={`${backgroundColor} text-white py-4 md:py-6`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2">{title}</h2>
          <p className="text-sm md:text-base text-center mb-4">{subtitle}</p>
          
          <div className="flex justify-center gap-2 md:gap-4">
            <div className="flex flex-col items-center bg-white bg-opacity-20 rounded-lg p-2 md:p-3 min-w-[60px] md:min-w-[80px]">
              <span className="text-xl md:text-3xl font-bold">{timeLeft.days}</span>
              <span className="text-xs md:text-sm">Días</span>
            </div>
            <div className="flex flex-col items-center bg-white bg-opacity-20 rounded-lg p-2 md:p-3 min-w-[60px] md:min-w-[80px]">
              <span className="text-xl md:text-3xl font-bold">{timeLeft.hours}</span>
              <span className="text-xs md:text-sm">Horas</span>
            </div>
            <div className="flex flex-col items-center bg-white bg-opacity-20 rounded-lg p-2 md:p-3 min-w-[60px] md:min-w-[80px]">
              <span className="text-xl md:text-3xl font-bold">{timeLeft.minutes}</span>
              <span className="text-xs md:text-sm">Minutos</span>
            </div>
            <div className="flex flex-col items-center bg-white bg-opacity-20 rounded-lg p-2 md:p-3 min-w-[60px] md:min-w-[80px]">
              <span className="text-xl md:text-3xl font-bold">{timeLeft.seconds}</span>
              <span className="text-xs md:text-sm">Segundos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
