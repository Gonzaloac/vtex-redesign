interface Props {
    name: string
    price: number
    image: string
  }
  
  export default function ProductCard({ name, price, image }: Props) {
    return (
      <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="font-semibold text-lg mb-2">{name}</h2>
          <p className="text-green-600 font-bold text-xl">S/ {price}</p>
        </div>
      </div>
    )
  }
  