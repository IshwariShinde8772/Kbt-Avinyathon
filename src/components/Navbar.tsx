import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Why Participate", path: "/#why-participate" },
    { name: "Process", path: "/#process" },
    { name: "Sponsorship", path: "/#sponsorship" },
    { name: "Rules", path: "/rules" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/" && !location.hash;
    if (path.includes("#")) {
      return location.pathname === "/" && location.hash === path.replace("/", "");
    }
    return location.pathname === path;
  };

  // Handle hash scrolling after navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    setIsOpen(false);
    if (path.includes("#")) {
      const id = path.split("#")[1];
      // If we're on the home page, prevent default and scroll
      if (location.pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          // Update URL hash without triggering navigation
          window.history.pushState(null, "", path);
        }
      }
      // If not on home page, let the Link navigate (useEffect will handle scroll)
    }
  };

  return (
    <nav className="bg-secondary sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-3">
          {/* Mobile menu button */}
          <button
            className="md:hidden absolute left-4 text-secondary-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={(e) => handleNavClick(item.path, e)}
                className={`nav-link ${
                  isActive(item.path) ? "nav-link-active" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/submit">
              <Button className="gradient-cta text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Submit Problem Statement
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={(e) => handleNavClick(item.path, e)}
                className={`block nav-link ${
                  isActive(item.path) ? "nav-link-active" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/submit" onClick={() => setIsOpen(false)}>
              <Button className="w-full gradient-cta text-primary-foreground">
                Submit Problem Statement
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
