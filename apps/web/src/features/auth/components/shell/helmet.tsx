interface HelmentProps {
  title: string
  description: string
}

export default function Helment({ title, description }: HelmentProps) {
  return (
    <div className="mb-8 space-y-3 sm:space-y-4">
      <h2 className="text-2xl font-black uppercase sm:text-3xl">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
