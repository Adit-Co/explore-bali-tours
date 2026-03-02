import { motion } from "framer-motion";
import { Star, Clock, MapPin } from "lucide-react";
import { Tour } from "@/data/tours";
import { Badge } from "@/components/ui/badge";

interface TourCardProps {
  tour: Tour;
  index: number;
  onClick: () => void;
}

const TourCard = ({ tour, index, onClick }: TourCardProps) => {
  const discount = Math.round((1 - tour.price / tour.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group cursor-pointer bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />

        <div className="absolute top-4 left-4">
          <Badge className="bg-accent text-accent-foreground border-0 font-body text-xs font-semibold">
            {discount}% OFF
          </Badge>
        </div>

        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="font-body text-xs backdrop-blur-sm bg-card/80">
            {tour.category}
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display text-2xl font-bold text-primary-foreground leading-tight">
            {tour.title}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-2">
          {tour.subtitle}
        </p>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground font-body">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-semibold text-foreground">{tour.rating}</span>
            <span>({tour.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{tour.duration}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-4 text-sm text-muted-foreground font-body">
          <MapPin className="w-3.5 h-3.5" />
          <span>{tour.destinations.length} destinasi</span>
        </div>

        <div className="flex items-end justify-between border-t border-border pt-4">
          <div>
            <span className="text-xs text-muted-foreground line-through font-body">
              Rp {tour.originalPrice.toLocaleString("id-ID")}
            </span>
            <p className="text-xl font-bold text-primary font-display">
              Rp {tour.price.toLocaleString("id-ID")}
            </p>
            <span className="text-xs text-muted-foreground font-body">per orang</span>
          </div>
          <span className="text-xs font-semibold text-primary font-body uppercase tracking-wider group-hover:translate-x-1 transition-transform">
            Lihat Detail →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
