import { motion } from "framer-motion";
import { MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBali from "@/assets/hero-bali.webp";

const HeroSection = () => {
  const scrollToTours = () => {
    document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        src={heroBali}
        alt="Bali aerial beach view"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-sm font-body tracking-[0.3em] uppercase text-primary-foreground/80">
              Bali, Indonesia
            </span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[0.95] mb-6">
            Jelajahi
            <br />
            <span className="text-gradient-gold">Keindahan</span>
            <br />
            Bali
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-primary-foreground/70 font-body text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed"
          >
            Temukan destinasi tersembunyi, petualangan seru, dan pengalaman tak terlupakan di Pulau Dewata
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="xl" onClick={scrollToTours}>
              Explore Tours
            </Button>
            <Button variant="outline-light" size="xl" onClick={scrollToTours}>
              Lihat Destinasi
            </Button>
          </motion.div>
        </motion.div>

        <motion.button
          onClick={scrollToTours}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.5, duration: 0.5 },
            y: { delay: 1.5, duration: 2, repeat: Infinity },
          }}
          className="absolute bottom-10 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
