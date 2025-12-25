import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 card-hover">
      <div className="w-14 h-14 bg-red-900/30 rounded-xl flex items-center justify-center mb-4">
        <Icon className="h-7 w-7 text-red-500" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}