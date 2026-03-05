import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, User, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import heroBali from "@/assets/hero-bali.webp";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isLogin ? "Login Berhasil! 🎉" : "Akun Dibuat! 🎉",
      description: isLogin
        ? "Selamat datang kembali di BaliTours"
        : "Akun kamu berhasil dibuat. Selamat menjelajah!",
    });
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background image same as hero */}
      <img
        src={heroBali}
        alt="Bali aerial beach view"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-foreground/30" />

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-body text-sm">Kembali</span>
      </motion.button>

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-6"
      >
        {/* Glassmorphism card */}
        <div className="rounded-3xl bg-card/15 backdrop-blur-xl border border-primary-foreground/10 shadow-hero p-8 md:p-10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-xs font-body tracking-[0.3em] uppercase text-primary-foreground/60">
                Bali, Indonesia
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground leading-tight">
              {isLogin ? (
                <>
                  Selamat <span className="text-gradient-gold">Datang</span>
                </>
              ) : (
                <>
                  Bergabung <span className="text-gradient-gold">Sekarang</span>
                </>
              )}
            </h1>
            <p className="text-primary-foreground/60 font-body text-sm mt-2">
              {isLogin
                ? "Masuk untuk mulai petualangan di Pulau Dewata"
                : "Buat akun dan temukan destinasi impianmu"}
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-xl bg-primary-foreground/10 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/40 pl-4 font-body focus-visible:ring-accent"
                    required
                  />
                </div>
              </motion.div>
            )}

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
              <Input
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl bg-primary-foreground/10 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/40 pl-11 font-body focus-visible:ring-accent"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl bg-primary-foreground/10 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/40 pl-11 pr-11 font-body focus-visible:ring-accent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-xs font-body text-accent hover:underline">
                  Lupa password?
                </button>
              </div>
            )}

            <Button type="submit" variant="hero" size="xl" className="w-full rounded-xl mt-2">
              {isLogin ? "Masuk" : "Daftar"}
            </Button>
          </form>




          {/* Switch mode */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6 text-sm font-body text-primary-foreground/60"
          >
            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent font-semibold hover:underline"
            >
              {isLogin ? "Daftar" : "Masuk"}
            </button>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
