import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/cows", label: "Our Cows" },
    { path: "/services", label: "Services" },
    { path: "/donate", label: "Donate" },
    { path: "/adopt", label: "Adopt a Cow" },
    { path: "/gallery", label: "Gallery" },
  ];

  return (
    <nav className="bg-[#f8f1e3] border-b border-sage sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold text-forest">
            🐄 KNNGO
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-earth hover:text-forest transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/contact"
              className="bg-forest  text-[#f8f1e3] px-4 py-2 rounded-md hover:bg-forest/90 transition"
            >
              Contact
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-sage">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-earth hover:text-forest transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-forest  text-[#f8f1e3]  py-2 rounded-md hover:bg-forest/90 transition"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
