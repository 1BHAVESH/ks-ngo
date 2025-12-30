// components/StatsSection.jsx

import { useGetStatsQuery } from "@/redux/features/adminApi";
import {  } from "@/redux/features/homePageApi";
import { Award, Building, Trophy, UsersRound, UserStar } from "lucide-react";

export default function StatsSection() {

   const { data, isLoading } = useGetStatsQuery();
  
    if (isLoading) return <h1 className="text-white">wait...</h1>;

    console.log(data)
     const stat = data?.stats

    const stats = [
    { number: `${stat.Cows_Rescued}+`, label: "Cows Rescued" },
    { number: `${stat.Active_Volunteers}+`, label: "Active Volunteers" },
    { number:`${stat.Years_of_Service}+`, label: "Years of Service" },
    { number: `${stat.Successful_Adoptions}+`, label: "Successful Adoptions" },
  ]

   

    // console.log(stat)
  

  return (
  <section className="py-16 bg-[#0d3811] text-[#f8f1e3] mb-0">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-sage-light text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
