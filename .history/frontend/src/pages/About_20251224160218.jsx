
import { Card } from "@/components/ui/card"
import { Target, Eye, Award, Heart } from "lucide-react"

export default function AboutPage() {
  const values = [
    { icon: Heart, title: "Compassion", description: "Treating every cow with love and respect" },
    { icon: Award, title: "Excellence", description: "Providing the highest standard of care" },
    { icon: Target, title: "Dedication", description: "Committed to our mission every single day" },
    { icon: Eye, title: "Transparency", description: "Open and honest in all our operations" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#dee9d4] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0d3811] text-center mb-6">About Us</h1>
          <p className="text-xl text-[#65504a] text-center max-w-3xl mx-auto">
            Learn about our journey, mission, and the people behind our cow welfare initiatives
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-[#fbfdf5]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0d3811] mb-6">Our History</h2>
            <div className="space-y-4 text-[#65504a] leading-relaxed text-lg">
              <p>
                Cow Seva NGO was founded in 2013 by a group of passionate individuals who witnessed the plight of
                abandoned and injured cows in rural and urban areas. What started as a small rescue operation with just
                5 cows has grown into a comprehensive sanctuary housing over 500 cows.
              </p>
              <p>
                Over the years, we have expanded our services to include state-of-the-art veterinary facilities,
                nutritious feeding programs, and an adoption initiative that has successfully connected hundreds of cows
                with loving caregivers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-[#f8f1e3]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-sage">
              <h2 className="text-3xl font-bold text-[#0d3811] mb-4">Our Mission</h2>
              <p className="text-[#65504a] leading-relaxed text-lg">
                To rescue, rehabilitate, and provide lifelong sanctuary for abandoned, injured, and elderly cows while
                promoting awareness about cow welfare and encouraging community participation in protection efforts.
              </p>
            </Card>
            <Card className="p-8 border-sage">
              <h2 className="text-3xl font-bold text-[#0d3811] mb-4">Our Vision</h2>
              <p className="text-[#65504a] leading-relaxed text-lg">
                A world where every cow is treated with dignity and respect, living in safety and comfort, free from
                suffering, and where communities actively participate in their care and protection.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder Info */}
      <section className="py-16 bg-[#fbfdf5]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0d3811] mb-6">Founder & Trust</h2>
            <div className="space-y-4 text-[#65504a] leading-relaxed text-lg">
              <p>
                <strong className="text-[#0d3811]">Dr. Rajesh Sharma</strong>, a veterinarian with over 20 years of
                experience, founded the Cow Seva Trust to address the growing crisis of abandoned cattle. His deep
                reverence for cows and commitment to animal welfare inspired him to create a safe haven.
              </p>
              <p>
                The organization is registered under the Indian Trusts Act and operates with full transparency. Our
                board of trustees includes veterinarians, animal welfare experts, and community leaders dedicated to our
                cause.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#f8f1e3]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#0d3811] text-center mb-12">Our Values & Ethics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="p-6 text-center border-sage">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-light mb-4">
                    <Icon className="w-8 h-8 text-[#0d3811]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0d3811] mb-3">{value.title}</h3>
                  <p className="text-earth leading-relaxed">{value.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Cow Protection */}
      <section className="py-16 bg-forest text-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Cow Protection is Important</h2>
            <p className="text-sage-light leading-relaxed text-lg">
              Cows hold a sacred place in Indian culture and have been companions to humans for thousands of years.
              Beyond cultural significance, they are sentient beings deserving of compassion and care. Many cows are
              abandoned after they stop producing milk or become injured, facing starvation and abuse on the streets.
              Our work ensures these gentle creatures receive the dignity, medical care, and shelter they deserve.
              Protecting cows is not just a duty—it's an act of compassion that enriches our humanity.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
