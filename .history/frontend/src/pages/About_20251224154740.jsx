import React from "react"; 
import CommomImg from "@/components/CommonBackgroundImg";
import StatsSection from "@/components/StartSection";
import AboutCard from "@/components/AboutCard";
import OurTeam from "@/components/OurTeam";
import hero1 from "../assets/Screenshot.png";
import Abtimg2 from "../assets/Gemini-the-fort.png";
import Abtimg1 from "../assets/SHUBH VILLA.jpeg";
import OtherHeroImage from "@/components/OtherHeroImage";
import MissionImg from "../assets/mission.png"
import VisionImg from "../assets/vission.png"

const About = () => {
  return (
    <>
        <section className="bg-sage-light py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-forest text-center mb-6">About Us</h1>
          <p className="text-xl text-earth text-center max-w-3xl mx-auto">
            Learn about our journey, mission, and the people behind our cow welfare initiatives
          </p>
        </div>
      </section>
    </>
  );
};

export default About;