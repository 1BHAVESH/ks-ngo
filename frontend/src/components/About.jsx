// components/About.jsx

import { useGetHomePageQuery } from "@/redux/features/homePageApi";
import hero from "../assets/Screenshot.png";
import chairman from "../assets/chairman.png";
import { da } from "zod/v4/locales";
import { ArrowRight, Heart, HomeIcon, StethoscopeIcon, Users } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const API_URL=import.meta.env.VITE_API_URL ||" http://localhost:3001/"

export default function About() {
  const {data, isLoading} = useGetHomePageQuery()

  if(isLoading) return <h1>wait...</h1>

  const homePageAbout = data?.about

   //console.log(homePageAbout)

  //  console.log(`${API_URL}${data.about.image}`)

   const services = [
    {
      icon: Heart,
      title: "Cow Rescue",
      description: "Saving abandoned and injured cows from dangerous situations across the region.",
      image: "/cow-rescue-operation-team-helping-injured-cow.jpg",
      href: "/services#rescue",
    },
    {
      icon: StethoscopeIcon,
      title: "Medical Care",
      description: "Providing comprehensive veterinary treatment and rehabilitation services.",
      image: "/veterinarian-treating-cow-medical-care.jpg",
      href: "/services#medical",
    },
    {
      icon: HomeIcon,
      title: "Shelter & Food",
      description: "Offering a safe haven with nutritious meals and comfortable living conditions.",
      image: "/cows-eating-in-shelter-gaushala-feeding.jpg",
      href: "/services#shelter",
    },
    {
      icon: Users,
      title: "Adoption Program",
      description: "Connecting compassionate individuals with cows needing lifelong care.",
      image: "/happy-family-with-adopted-cow-bonding.jpg",
      href: "/adopt",
    },
  ]


  return (
 <>
 <section className="py-16 bg-[#f8f1e3]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0d3811] mb-6">About Our Mission</h2>
            <p className="text-[#65504a] max-w-3xl text-lg leading-relaxed">
              For over a decade, our NGO has been dedicated to the protection and welfare of sacred cows. We provide
              comprehensive care including rescue operations, medical treatment, nutritious food, and a safe sanctuary
              for cows who have been abandoned, injured, or are in need. Every cow deserves dignity, love, and proper
              care.
            </p>
          </div>
        </div>
      </section>

       {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-forest text-center mb-12">Our Key Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-sage hover:shadow-xl transition-all duration-300 h-[320px]"
                >
                  {/* Default State */}
                  <div className="absolute inset-0 p-6 flex flex-col items-center text-center bg-background transition-opacity duration-300 group-hover:opacity-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-light mb-4">
                      <Icon className="w-8 h-8 text-[#2F6B3F]" />
                    </div>
                    <h3 className="text-xl font-bold text-forest mb-3">{service.title}</h3>
                    <p className="text-earth leading-relaxed">{service.description}</p>
                  </div>

                  {/* Hover State with Image */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/70 to-forest/40" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="text-xl font-bold text-cream mb-2">{service.title}</h3>
                      <p className="text-sage-light text-sm leading-relaxed mb-4">{service.description}</p>
                      <Button asChild size="sm" className="bg-cream text-forest hover:bg-cream/90 w-full">
                        <Link to={service.href}>
                          Learn More <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>


 </>
  );
}
