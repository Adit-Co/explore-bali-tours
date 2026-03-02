import tourBeach from "@/assets/tour-beach.webp";
import tourMountain from "@/assets/tour-mountain.webp";
import tourRice from "@/assets/tour-rice.webp";
import tourTemple from "@/assets/tour-temple.webp";
import tourWaterfall from "@/assets/tour-waterfall.webp";

export interface TourDestination {
  name: string;
  description: string;
  duration: string;
}

export interface Tour {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  duration: string;
  category: string;
  destinations: TourDestination[];
  includes: string[];
}

export const tours: Tour[] = [
  {
    id: "beach-paradise",
    title: "Pantai Paradise",
    subtitle: "Jelajahi pantai-pantai tersembunyi di Bali",
    description:
      "Nikmati keindahan pantai-pantai eksotis Bali yang belum banyak dijamah wisatawan. Dari pasir putih Nusa Dua hingga tebing dramatis Uluwatu, setiap momen akan menjadi kenangan tak terlupakan.",
    image: tourBeach,
    price: 750000,
    originalPrice: 1200000,
    rating: 4.9,
    reviewCount: 324,
    duration: "Full Day (10 jam)",
    category: "Pantai",
    destinations: [
      { name: "Pantai Kelingking", description: "Pantai ikonik dengan tebing berbentuk T-Rex", duration: "2 jam" },
      { name: "Crystal Bay", description: "Snorkeling di perairan jernih", duration: "3 jam" },
      { name: "Diamond Beach", description: "Pantai pasir putih yang memukau", duration: "2 jam" },
    ],
    includes: ["Transport AC", "Makan siang", "Snorkeling gear", "Guide lokal", "Asuransi"],
  },
  {
    id: "mount-batur",
    title: "Gunung Batur Sunrise",
    subtitle: "Trekking sunrise spektakuler",
    description:
      "Saksikan matahari terbit dari puncak Gunung Batur yang megah. Perjalanan trekking yang menantang namun memuaskan dengan pemandangan kaldera dan Danau Batur yang memukau.",
    image: tourMountain,
    price: 550000,
    originalPrice: 900000,
    rating: 4.8,
    reviewCount: 512,
    duration: "Half Day (6 jam)",
    category: "Gunung",
    destinations: [
      { name: "Basecamp Batur", description: "Persiapan dan briefing", duration: "30 menit" },
      { name: "Puncak Batur", description: "Sunrise view & sarapan", duration: "2 jam" },
      { name: "Hot Spring", description: "Relaksasi di pemandian air panas", duration: "1.5 jam" },
    ],
    includes: ["Transport AC", "Sarapan di puncak", "Guide trekking", "Senter", "Asuransi"],
  },
  {
    id: "rice-terrace",
    title: "Tegallalang Explorer",
    subtitle: "Keajaiban sawah terasering Bali",
    description:
      "Jelajahi keindahan sawah terasering Tegallalang yang menjadi warisan budaya UNESCO. Nikmati suasana pedesaan Bali yang autentik dengan aktivitas seru.",
    image: tourRice,
    price: 450000,
    originalPrice: 700000,
    rating: 4.7,
    reviewCount: 289,
    duration: "Half Day (5 jam)",
    category: "Budaya",
    destinations: [
      { name: "Tegallalang Rice Terrace", description: "Jalan-jalan di sawah terasering", duration: "2 jam" },
      { name: "Swing Bali", description: "Ayunan di atas lembah", duration: "1 jam" },
      { name: "Luwak Coffee", description: "Cicip kopi Luwak asli Bali", duration: "1 jam" },
    ],
    includes: ["Transport AC", "Tiket masuk", "Kopi & teh gratis", "Guide lokal", "Asuransi"],
  },
  {
    id: "temple-tour",
    title: "Pura Sacred Journey",
    subtitle: "Wisata spiritual ke pura-pura suci",
    description:
      "Kunjungi pura-pura paling sakral dan indah di Bali. Dari Tanah Lot yang ikonik hingga Uluwatu yang dramatis, rasakan spiritualitas dan keindahan arsitektur Bali.",
    image: tourTemple,
    price: 650000,
    originalPrice: 1000000,
    rating: 4.9,
    reviewCount: 198,
    duration: "Full Day (8 jam)",
    category: "Spiritual",
    destinations: [
      { name: "Tanah Lot", description: "Pura di atas batu karang laut", duration: "2 jam" },
      { name: "Uluwatu Temple", description: "Pura tebing + tari Kecak sunset", duration: "3 jam" },
      { name: "Tirta Empul", description: "Pura mata air suci", duration: "1.5 jam" },
    ],
    includes: ["Transport AC", "Makan siang", "Tiket masuk semua pura", "Sarung & selendang", "Guide lokal"],
  },
  {
    id: "waterfall-adventure",
    title: "Air Terjun Adventure",
    subtitle: "Petualangan ke air terjun tersembunyi",
    description:
      "Temukan air terjun-air terjun tersembunyi di hutan tropis Bali. Berenang di kolam alami, trekking ringan di hutan, dan nikmati udara segar pegunungan.",
    image: tourWaterfall,
    price: 500000,
    originalPrice: 800000,
    rating: 4.8,
    reviewCount: 267,
    duration: "Full Day (7 jam)",
    category: "Adventure",
    destinations: [
      { name: "Sekumpul Waterfall", description: "Air terjun tertinggi di Bali", duration: "2 jam" },
      { name: "Gitgit Waterfall", description: "Twin waterfall yang ikonik", duration: "1.5 jam" },
      { name: "Aling-Aling Waterfall", description: "Natural waterslide alami", duration: "2 jam" },
    ],
    includes: ["Transport AC", "Makan siang", "Tiket masuk", "Handuk", "Guide lokal", "Asuransi"],
  },
];
