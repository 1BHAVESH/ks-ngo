import bgImg from "../assets/ChatGPt_Bg_IMG.png";
import { useState } from "react";
import { useGetHomePageQuery } from "@/redux/features/homePageApi";

import client1 from "../assets/Screenshot.png";
import client2 from "../assets/Screenshot.png";
import client3 from "../assets/Screenshot.png";
import client4 from "../assets/Screenshot.png";
import client5 from "../assets/Screenshot.png";

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Donor & Volunteer",
      content:
        "The work Cow Seva NGO does is truly remarkable. I've seen firsthand how they rescue and rehabilitate cows with such dedication. It's an honor to support their mission.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Cow Adopter",
      content:
        "Adopting a cow through this NGO has been the most fulfilling experience. The team keeps me updated regularly and the care they provide is exceptional.",
      rating: 5,
    },
    {
      name: "Dr. Amit Patel",
      role: "Veterinarian Partner",
      content:
        "As a veterinarian, I'm impressed by their professional approach to animal welfare. Their facility is well-maintained and the staff is well-trained.",
      rating: 5,
    },
  ]
const API_URL = import.meta.env.VITE_API_URL || " http://localhost:3001/";


export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, isLoading } = useGetHomePageQuery();

  if (isLoading) return <h1 className="text-white">wait...</h1>;

  // 🔥 SAFE Dynamic Data
  const apiTestimonials = data?.testimonials || [];

  // 🔥 FINAL DATA TO USE (dynamic if available, else static fallback)
  // const finalTestimonials =
  //   apiTestimonials.length > 0
  //     ? apiTestimonials.map((t) => ({
  //         img: t.photo,
  //         name: t.name,
  //         role: t.position,
  //         quote: t.message,
  //       }))
  //     : people; // static fallback

      //console.log(finalTestimonials)

      //console.log("llllllllll",apiTestimonials)

  return (
<>
 {/* Testimonials Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-forest text-center mb-12">What People Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-sage hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-forest text-forest" />
                  ))}
                </div>
                <p className="text-earth leading-relaxed mb-4 italic">"{testimonial.content}"</p>
                <div className="border-t border-sage pt-4">
                  <p className="font-bold text-forest">{testimonial.name}</p>
                  <p className="text-sm text-earth">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
</>
  );
}
