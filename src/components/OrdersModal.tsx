import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, CreditCard, Wallet, Building2, QrCode, Check, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrders, Order } from "@/context/OrderContext";
import { useToast } from "@/hooks/use-toast";

const paymentMethods = [
  { id: "transfer", label: "Transfer Bank", icon: Building2, desc: "BCA, Mandiri, BNI, BRI" },
  { id: "ewallet", label: "E-Wallet", icon: Wallet, desc: "GoPay, OVO, Dana, ShopeePay" },
  { id: "qris", label: "QRIS", icon: QrCode, desc: "Scan QR di semua bank & e-wallet" },
  { id: "card", label: "Kartu Kredit/Debit", icon: CreditCard, desc: "Visa, Mastercard" },
];

const OrdersModal = () => {
  const { orders, showOrders, setShowOrders, payOrder } = useOrders();
  const [selectedPayment, setSelectedPayment] = useState<Record<string, string>>({});
  const { toast } = useToast();

  if (!showOrders) return null;

  const handlePay = (order: Order) => {
    const method = selectedPayment[order.id];
    if (!method) {
      toast({ title: "Pilih metode pembayaran", description: "Silakan pilih metode pembayaran terlebih dahulu." });
      return;
    }
    payOrder(order.id, method);
    toast({
      title: "✅ Pembayaran Berhasil!",
      description: `Order ${order.id} dibayar via ${paymentMethods.find((m) => m.id === method)?.label}`,
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        onClick={() => setShowOrders(false)}
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
          {/* Header */}
          <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border px-6 py-5 flex items-center justify-between rounded-t-3xl z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">Pesanan Saya</h2>
                <p className="text-xs text-muted-foreground font-body">{orders.length} pesanan</p>
              </div>
            </div>
            <button
              onClick={() => setShowOrders(false)}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">Belum ada pesanan</h3>
                <p className="text-sm text-muted-foreground font-body">Pilih tour favorit dan pesan sekarang!</p>
              </div>
            ) : (
              orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-border bg-card shadow-card overflow-hidden"
                >
                  {/* Order header */}
                  <div className="flex gap-4 p-4">
                    <img
                      src={order.tour.image}
                      alt={order.tour.title}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display font-semibold text-foreground truncate">{order.tour.title}</h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold font-body flex-shrink-0 ${
                            order.status === "paid"
                              ? "bg-green-500/10 text-green-600"
                              : "bg-accent/10 text-accent"
                          }`}
                        >
                          {order.status === "paid" ? "Lunas" : "Belum Bayar"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground font-body">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" /> {order.guests} orang
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {order.date}
                        </span>
                      </div>
                      <p className="text-sm font-body text-muted-foreground mt-0.5">ID: {order.id}</p>
                      <p className="font-display text-lg font-bold text-primary mt-1">
                        Rp {order.total.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  {/* Payment section for pending orders */}
                  {order.status === "pending" && (
                    <div className="border-t border-border p-4 bg-secondary/30">
                      <p className="font-body text-sm font-semibold text-foreground mb-3">Pilih Metode Pembayaran</p>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {paymentMethods.map((m) => (
                          <button
                            key={m.id}
                            onClick={() =>
                              setSelectedPayment((prev) => ({ ...prev, [order.id]: m.id }))
                            }
                            className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                              selectedPayment[order.id] === m.id
                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                : "border-border hover:border-muted-foreground/30"
                            }`}
                          >
                            <m.icon className={`w-5 h-5 flex-shrink-0 ${
                              selectedPayment[order.id] === m.id ? "text-primary" : "text-muted-foreground"
                            }`} />
                            <div>
                              <p className="text-xs font-semibold font-body text-foreground">{m.label}</p>
                              <p className="text-[10px] text-muted-foreground font-body">{m.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                      <Button variant="hero" size="lg" className="w-full" onClick={() => handlePay(order)}>
                        <Check className="w-4 h-4 mr-2" />
                        Bayar Sekarang
                      </Button>
                    </div>
                  )}

                  {/* Paid confirmation */}
                  {order.status === "paid" && (
                    <div className="border-t border-border p-4 bg-green-500/5">
                      <div className="flex items-center gap-2 text-sm font-body text-green-600">
                        <Check className="w-4 h-4" />
                        <span>Dibayar via {paymentMethods.find((m) => m.id === order.paymentMethod)?.label}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrdersModal;
