import { useWishlist } from '@/context/WishlistContext';

interface Props {
    id: string
    name: string
    price: number
    image: string
  }
  
  export default function ProductCard({ id, name, price, image }: Props) {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const inWishlist = isInWishlist(id);
    
    const toggleWishlist = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (inWishlist) {
        removeFromWishlist(id);
      } else {
        addToWishlist(id);
      }
    };
    
    return (
      <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition relative">
        {/* Botón de lista de deseos */}
        <button 
          onClick={toggleWishlist}
          className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition-all"
          aria-label={inWishlist ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          {inWishlist ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-5.201-3.893 7.929 7.929 0 01-2.365-5.273c0-3.183 2.58-5.766 5.762-5.766 1.56 0 3.05.645 4.13 1.78 1.08-1.135 2.57-1.78 4.13-1.78 3.183 0 5.762 2.583 5.762 5.766 0 1.936-.87 3.778-2.365 5.273a15.247 15.247 0 01-5.201 3.893l-.022.012-.007.003-.002.001a.75.75 0 01-.704 0l-.002-.001z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 hover:text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          )}
        </button>
        
        <div className="w-full flex items-center justify-center py-1">
          <img src={image} alt={name} className="w-auto h-auto object-contain max-h-24 sm:max-h-36" />
        </div>
        <div className="p-1 sm:p-3">
          <h2 className="font-semibold text-xs sm:text-lg mb-0.5 sm:mb-2 line-clamp-1">{name}</h2>
          <p className="text-green-600 font-bold text-sm sm:text-xl">S/ {price}</p>
        </div>
      </div>
    )
  }