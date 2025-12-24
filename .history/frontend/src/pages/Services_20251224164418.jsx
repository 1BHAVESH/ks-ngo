import { Card } from "@/components/ui/card"
import { services } from "@/data/ngo-data"

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#fbfdf5]">
      {/* Hero */}
      <section className="bg-[#dee9d4] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0d3811] text-center mb-6">Our Services & Activities</h1>
          <p className="text-xl text-[#65504a] text-center max-w-3xl mx-auto">
            Comprehensive care and protection programs for cows in need
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="p-8 border-[#a3b49b] bg-[#fbfdf5] hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-sage-light flex items-center justify-center text-4xl">
                      {service.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#0d3811] mb-3">{service.title}</h2>
                    <p className="text-earth leading-relaxed text-lg mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-earth">
                          <span className="text-forest mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage