import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HeroImage() {
  return (
    <section className="relative bg-[#f8f1e3] py-20 md:py-32 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/peaceful-cow-grazing-in-green-pasture-indian-gaush.jpg"
          alt="Cow grazing peacefully"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          <h1 className="text-4xl md:text-6xl font-bold text-[#2F6B3F] mb-6 text-balance">
            Serving & Protecting Cows with Compassion
          </h1>

          <p className="text-lg md:text-xl text-[#5B4636] mb-8 text-pretty">
            Join us in our mission to rescue, rehabilitate, and provide sanctuary
            for sacred cows in need.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#2F6B3F] hover:bg-[#2F6B3F]/90 text-[#f8f1e3]"
            >
              <Link to="/donate">Donate Now</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#2F6B3F] text-[#2F6B3F] hover:bg-[#C1D9C5] bg-transparent"
            >
              <Link to="/adopt">Adopt a Cow</Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
