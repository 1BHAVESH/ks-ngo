// components/Footer.jsx
import {
  faFacebook,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Facebook, Instagram } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import footerlogo from "../assets/footer-logo-2.png"
import { useGetProjectTitleQuery } from "@/redux/features/shubamdevApi";
import { useGetGeneralSettingQueryQuery } from "@/redux/features/adminApi";
import { Heart, Mail, Phone, MapPin,  Twitter,  Youtube } from "lucide-react"

export default function Footer() {

   const navigate = useNavigate()

  const {data, isLoading} = useGetProjectTitleQuery()
  const {data: genralData, isLoading: genralIsLoading} = useGetGeneralSettingQueryQuery()

  if(isLoading) return <h1>wait...</h1>
  if(genralIsLoading) return <h1>wait...</h1>

  const titles = data?.titles || []

  // console.log("titles",titles)

 

  // console.log("33333333",data)

  console.log(genralData)



  return (
  <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-[0.08]">
          <img
            src="/peaceful-cows-silhouette-in-traditional-indian-gau.jpg"
            alt="Footer Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-slate-600/10 rounded-full blur-[120px] opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-500/10 rounded-full blur-[120px] opacity-50"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Join Our Mission</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Subscribe to our newsletter and stay updated with our cow welfare initiatives
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
              />
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <h3 className="text-2xl font-bold text-white">Cow Seva NGO</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
              Dedicated to protecting and caring for sacred cows with compassion and commitment. Our mission is to
              provide shelter, medical care, and love to abandoned and injured cows.
            </p>
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Serving since</p>
                <p className="font-semibold text-white">2013</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-400 rounded-full"></div>
              Quick Links
            </h3>
            <div className="space-y-3">
              {[
                { to: "/about", label: "About Us" },
                { to: "/cows", label: "Our Cows" },
                { to: "/services", label: "Services" },
                { to: "/gallery", label: "Gallery" },
                { to: "/donate", label: "Donate Now" },
                { to: "/adopt", label: "Adopt a Cow" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-gray-300 hover:text-white transition-all hover:translate-x-1 text-sm"
                >
                  → {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-400 rounded-full"></div>
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300 leading-relaxed">123 Gaushala Road, Vrindavan, UP 281121</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300">contact@cowsevangoorg</span>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs text-gray-400 mb-3">Follow Us</p>
              <div className="flex gap-2">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                  <button
                    key={index}
                    className="w-9 h-9 bg-white/20 hover:bg-blue-500/30 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative pt-8">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-300 text-sm">
            <p>© {new Date().getFullYear()} Cow Seva NGO. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" fill="currentColor" />
              <span>for cows</span>
            </div>
            <div className="flex gap-4 text-xs">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
}
