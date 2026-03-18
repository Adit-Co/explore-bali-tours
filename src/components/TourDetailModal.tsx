import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Clock, MapPin, Check, Users, Minus, Plus } from "lucide-react";
import { Tour } from "@/data/tours";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useOrders } from "@/context/OrderContext";

interface TourDetailModalProps {
  tour: Tour | null;
  onClose: () => void;
}

const TourDetailModal = ({ tour, onClose }: TourDetailModalProps) => {
  const [guests, setGuests] = useState(1);
  const { toast } = useToast();

  if (!tour) return null;

  const total = tour.price * guests;
  const discount = Math.round((1 - tour.price / tour.originalPrice) * 100);

  const handleCheckout = () => {
    toast({
      title: "🎉 Booking Berhasil!",
      description: `Tour "${tour.title}" untuk ${guests} orang telah dipesan. Total: Rp ${total.toLocaleString("id-ID")}`,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl"
        >
          {/* Header Image */}
          <div className="relative h-56 sm:h-72">
            <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
            <div className="absolute bottom-4 left-6 right-6">
              <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold font-body mb-2">
                {discount}% OFF
              </span>
              <h2 className="font-display text-3xl font-bold text-primary-foreground">{tour.title}</h2>
            </div>
          </div>

          <div className="p-6">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm font-body text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="font-semibold text-foreground">{tour.rating}</span>
                <span>({tour.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{tour.destinations.length} destinasi</span>
              </div>
            </div>

            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
              {tour.description}
            </p>

            {/* Destinations */}
            <h3 className="font-display text-lg font-semibold text-foreground mb-3">Destinasi</h3>
            <div className="space-y-3 mb-6">
              {tour.destinations.map((dest, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/50"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary font-body">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground font-body">{dest.name}</p>
                    <p className="text-xs text-muted-foreground font-body">{dest.description}</p>
                    <span className="text-xs text-primary font-body font-medium">{dest.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Includes */}
            <h3 className="font-display text-lg font-semibold text-foreground mb-3">Termasuk</h3>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {tour.includes.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-body text-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Pricing & Checkout */}
            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm text-muted-foreground line-through font-body">
                    Rp {tour.originalPrice.toLocaleString("id-ID")}
                  </span>
                  <p className="text-2xl font-bold text-primary font-display">
                    Rp {tour.price.toLocaleString("id-ID")}
                    <span className="text-sm font-normal text-muted-foreground font-body"> /orang</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-foreground font-body w-6 text-center">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(10, guests + 1))}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-secondary">
                <span className="font-body text-sm font-medium text-secondary-foreground">Total</span>
                <span className="font-display text-xl font-bold text-foreground">
                  Rp {total.toLocaleString("id-ID")}
                </span>
              </div>

              <Button variant="hero" size="xl" className="w-full" onClick={handleCheckout}>
                Pesan Sekarang
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TourDetailModal;
