import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, LogIn, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/context/OrderContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-card/90 backdrop-blur-xl shadow-card border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
          <span
            className={`font-display text-xl font-bold transition-colors ${
              scrolled ? "text-foreground" : "text-primary-foreground"
            }`}
          >
            Bali<span className="text-gradient-gold">Tours</span>
          </span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Tours", id: "tours" },
            { label: "Tentang", id: "about" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-sm font-body font-medium transition-colors hover:text-accent ${
                scrolled ? "text-foreground" : "text-primary-foreground/80"
              }`}
            >
              {item.label}
            </button>
          ))}
          <Button
            variant={scrolled ? "hero" : "outline-light"}
            size="sm"
            onClick={() => navigate("/login")}
            className="gap-2"
          >
            <LogIn className="w-4 h-4" />
            Masuk
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border px-6 py-4 space-y-3"
        >
          {[
            { label: "Tours", id: "tours" },
            { label: "Tentang", id: "about" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="block text-sm font-body font-medium text-foreground hover:text-accent transition-colors"
            >
              {item.label}
            </button>
          ))}
          <Button
            variant="hero"
            size="sm"
            onClick={() => { setMenuOpen(false); navigate("/login"); }}
            className="w-full gap-2"
          >
            <LogIn className="w-4 h-4" />
            Masuk
          </Button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
