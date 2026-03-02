import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TourCard from "@/components/TourCard";
import TourDetailModal from "@/components/TourDetailModal";
import { tours, Tour } from "@/data/tours";
import { Compass, Shield, Heart } from "lucide-react";

const Index = () => {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  return (
    <div className="min-h-screen bg-background" id="hero">
      <Navbar />
      <HeroSection />

      {/* Tours Section */}
      <section id="tours" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-sm font-body tracking-[0.3em] uppercase text-accent font-semibold">
              Pilihan Terbaik
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Tour Populer
            </h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto">
              Paket tour terbaik dengan harga spesial. Setiap perjalanan dirancang untuk pengalaman tak terlupakan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour, i) => (
              <TourCard
                key={tour.id}
                tour={tour}
                index={i}
                onClick={() => setSelectedTour(tour)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-body tracking-[0.3em] uppercase text-accent font-semibold">
              Mengapa Kami
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
              Kenapa Pilih BaliTours?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Compass,
                title: "Guide Berpengalaman",
                desc: "Guide lokal profesional yang mengenal setiap sudut Bali",
              },
              {
                icon: Shield,
                title: "Aman & Terjamin",
                desc: "Semua tour dilengkapi asuransi perjalanan lengkap",
              },
              {
                icon: Heart,
                title: "Harga Terbaik",
                desc: "Garansi harga terbaik dengan diskon hingga 40%",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-8 rounded-2xl bg-card shadow-card"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground font-body text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-display text-xl font-bold text-foreground">
            Bali<span className="text-gradient-gold">Tours</span>
          </span>
          <p className="text-muted-foreground font-body text-sm mt-2">
            © 2026 BaliTours. Semua hak dilindungi.
          </p>
        </div>
      </footer>

      {/* Tour Detail Modal */}
      {selectedTour && (
        <TourDetailModal tour={selectedTour} onClose={() => setSelectedTour(null)} />
      )}
    </div>
  );
};

export default Index;
