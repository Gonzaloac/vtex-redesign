interface Props {
    title: string
    subtitle: string
    image: string
    mobileImage?: string // Imagen opcional para móviles
    ctaText: string
    ctaLink: string
  }
  
  export default function HeroBanner({ title, subtitle, image, mobileImage, ctaText, ctaLink }: Props) {
    // Usar la imagen móvil si está disponible, de lo contrario usar la imagen principal
    const desktopBgImage = `url(${image})`;
    const mobileBgImage = mobileImage ? `url(${mobileImage})` : desktopBgImage;

    return (
      <section
        className="w-full min-h-[550px] bg-cover bg-center flex items-center justify-start px-10 text-white"
        style={{ 
          backgroundImage: mobileBgImage,
          // Usar media queries en línea para cambiar la imagen según el tamaño de pantalla
          '@media (min-width: 640px)': {
            backgroundImage: desktopBgImage
          }
        }}
      >
        <style jsx>{`
          @media (min-width: 640px) {
            section {
              background-image: ${desktopBgImage} !important;
            }
          }
        `}</style>
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold drop-shadow mb-4">{title}</h1>
          <p className="text-lg drop-shadow mb-6">{subtitle}</p>
         {/* <a
            href={ctaLink}
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow"
          >
            {ctaText}
          </a> */}
        </div>
      </section>
    )
  }