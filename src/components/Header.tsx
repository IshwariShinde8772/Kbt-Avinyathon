import { Link } from "react-router-dom";
import kbtcoeLogo from "@/assets/kbtcoe-logo.png";
import avinyathonLogo from "@/assets/avinyathon-logo.png";

const Header = () => {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* KBTCOE Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={kbtcoeLogo}
              alt="KBTCOE Logo"
              className="h-16 w-16 object-contain"
            />
          </Link>

          {/* College Name */}
          <div className="flex-1 text-center px-4">
            <h1 className="text-lg md:text-xl font-bold text-secondary font-heading">
              Karmaveer Adv. Baburao Ganpatrao Thakare College of Engineering
            </h1>
            <p className="text-xs md:text-sm text-primary">
              Udoji Maratha Boarding Campus, Near Pumping Station, Gangapur Road, Nashik An Autonomous Institute
            </p>
            <p className="text-xs text-primary">
              Permanently affiliated to Savitribai Phule Pune University
            </p>
          </div>

          {/* Avinyathon Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={avinyathonLogo}
              alt="Avinyathon 2026 Logo"
              className="h-16 w-16 object-contain"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
