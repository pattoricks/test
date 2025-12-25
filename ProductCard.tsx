import { LucideIcon } from 'lucide-react'

interface ProductCardProps {
  icon: LucideIcon
  title: string
  description: string
  gradientFrom: string
  gradientTo: string
}

export default function ProductCard({ 
  icon: Icon, 
  title, 
  description, 
  gradientFrom, 
  gradientTo 
}: ProductCardProps) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden card-hover">
      <div 
        className={`h-40 ${gradientFrom} ${gradientTo} flex items-center justify-center`}
      >
        <Icon className="h-16 w-16" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <a 
          href="#" 
          className="text-red-400 hover:text-red-300 font-medium inline-flex items-center"
        >
          Explore →
        </a>
      </div>
    </div>
  )
}