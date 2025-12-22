// components/About.jsx

import { useGetHomePageQuery } from "@/redux/features/homePageApi";
import hero from "../assets/Screenshot.png";
import chairman from "../assets/chairman.png";
import { da } from "zod/v4/locales";

const API_URL=import.meta.env.VITE_API_URL ||" http://localhost:3001/"

export default function About() {
  const {data, isLoading} = useGetHomePageQuery()

  if(isLoading) return <h1>wait...</h1>

  const homePageAbout = data?.about

   //console.log(homePageAbout)

  //  console.log(`${API_URL}${data.about.image}`)

  return (
 <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-forest mb-6">About Our Mission</h2>
            <p className="text-earth text-lg leading-relaxed">
              For over a decade, our NGO has been dedicated to the protection and welfare of sacred cows. We provide
              comprehensive care including rescue operations, medical treatment, nutritious food, and a safe sanctuary
              for cows who have been abandoned, injured, or are in need. Every cow deserves dignity, love, and proper
              care.
            </p>
          </div>
        </div>
      </section>

  );
}
