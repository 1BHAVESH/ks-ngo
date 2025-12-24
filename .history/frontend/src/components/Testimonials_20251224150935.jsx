import { useState } from "react";
import { useGetHomePageQuery } from "@/redux/features/homePageApi";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, isLoading } = useGetHomePageQuery();

  if (isLoading) return <h1 className="text-center">wait...</h1>;

  const testimonials = [
    { id: 1,
      name: "Rajesh Kumar",
      role: "Donor & Volunteer",
      content:
        "The work Cow Seva NGO does is truly remarkable. I've seen firsthand how they rescue and rehabilitate cows with such dedication. It's an honor to support their mission.",
      rating: 5,
    },
    { id: 2,
      name: "Priya Sharma",
      role: "Cow Adopter",
      content:
        "Adopting a cow through this NGO has been the most fulfilling experience. The team keeps me updated regularly and the care they provide is exceptional.",
      rating: 5,
    },
    { id: 3,
      name: "Dr. Amit Patel",
      role: "Veterinarian Partner",
      content:
        "As a veterinarian, I'm impressed by their professional approach to animal welfare. Their facility is well-maintained and the staff is well-trained.",
      rating: 5,
    },
  ];

  return (
    <>
      {/* Testimonials Section */}
      <section className="py-16 bg-[#f8f1e3]">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#0d3811] md:text-4xl">
            What People Say
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="border-sage bg-[#fbfdf5] p-6 transition-shadow hover:shadow-lg"
              >
                {/* Rating */}
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-[#0d3811] text-[#0d3811]"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="mb-4 italic leading-relaxed text-[#65504a]">
                  “{testimonial.content}”
                </p>

                {/* Author */}
                <div className="border-t border-sage pt-4">
                  <p className="font-bold text-forest">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-earth">
                    {testimonial.role}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
