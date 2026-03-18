import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, CreditCard, Wallet, Building2, QrCode, Check, Users, Clock, ChevronLeft, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrders, Order } from "@/context/OrderContext";
import { useToast } from "@/hooks/use-toast";

interface SubOption {
  name: string;
  number: string;
}

interface PaymentMethod {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  subOptions?: SubOption[];
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "transfer",
    label: "Transfer Bank",
    icon: Building2,
    desc: "BCA, Mandiri, BNI, BRI",
    subOptions: [
      { name: "BCA", number: "8730-4521-6789" },
      { name: "Mandiri", number: "1280-0053-4417-82" },
      { name: "BNI", number: "0274-8831-5590" },
      { name: "BRI", number: "0321-0100-5847-509" },
    ],
  },
  {
    id: "ewallet",
    label: "E-Wallet",
    icon: Wallet,
    desc: "GoPay, OVO, Dana, ShopeePay",
    subOptions: [
      { name: "GoPay", number: "0812-3456-7890" },
      { name: "OVO", number: "0857-9012-3456" },
      { name: "Dana", number: "0878-1234-5678" },
      { name: "ShopeePay", number: "0813-5678-9012" },
    ],
  },
  {
    id: "qris",
    label: "QRIS",
    icon: QrCode,
    desc: "Scan QR di semua bank & e-wallet",
  },
  {
    id: "card",
    label: "Kartu Kredit/Debit",
    icon: CreditCard,
    desc: "Visa, Mastercard",
  },
];

const OrdersModal = () => {
  const { orders, showOrders, setShowOrders, payOrder } = useOrders();
  const [selectedPayment, setSelectedPayment] = useState<Record<string, string>>({});
  const [expandedMethod, setExpandedMethod] = useState<Record<string, string>>({});
  const [selectedSub, setSelectedSub] = useState<Record<string, string>>({});
  const { toast } = useToast();

  if (!showOrders) return null;

  const handleSelectMethod = (orderId: string, methodId: string) => {
    setSelectedPayment((prev) => ({ ...prev, [orderId]: methodId }));
    const method = paymentMethods.find((m) => m.id === methodId);
    if (method?.subOptions) {
      setExpandedMethod((prev) => ({ ...prev, [orderId]: methodId }));
      setSelectedSub((prev) => {
        const copy = { ...prev };
        delete copy[orderId];
        return copy;
      });
    } else {
      setExpandedMethod((prev) => {
        const copy = { ...prev };
        delete copy[orderId];
        return copy;
      });
      setSelectedSub((prev) => {
        const copy = { ...prev };
        delete copy[orderId];
        return copy;
      });
    }
  };

  const handleSelectSub = (orderId: string, subName: string) => {
    setSelectedSub((prev) => ({ ...prev, [orderId]: subName }));
  };

  const copyNumber = (number: string) => {
    navigator.clipboard.writeText(number.replace(/-/g, ""));
    toast({ title: "📋 Nomor disalin!", description: number });
  };

  const handlePay = (order: Order) => {
    const methodId = selectedPayment[order.id];
    if (!methodId) {
      toast({ title: "Pilih metode pembayaran", description: "Silakan pilih metode pembayaran terlebih dahulu." });
      return;
    }
    const method = paymentMethods.find((m) => m.id === methodId);
    if (method?.subOptions && !selectedSub[order.id]) {
      toast({ title: "Pilih layanan", description: `Silakan pilih layanan ${method.label} terlebih dahulu.` });
      return;
    }
    const subName = selectedSub[order.id];
    const label = subName ? `${method?.label} (${subName})` : method?.label;
    payOrder(order.id, subName || methodId);
    toast({
      title: "✅ Pembayaran Berhasil!",
      description: `Order ${order.id} dibayar via ${label}`,
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
              orders.map((order) => {
                const currentMethodId = expandedMethod[order.id];
                const currentMethod = paymentMethods.find((m) => m.id === currentMethodId);
                const showSubOptions = currentMethod?.subOptions && order.status === "pending";

                return (
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
                        {/* Sub-options detail view */}
                        {showSubOptions ? (
                          <div>
                            <button
                              onClick={() => {
                                setExpandedMethod((prev) => {
                                  const copy = { ...prev };
                                  delete copy[order.id];
                                  return copy;
                                });
                                setSelectedSub((prev) => {
                                  const copy = { ...prev };
                                  delete copy[order.id];
                                  return copy;
                                });
                              }}
                              className="flex items-center gap-1 text-xs font-body text-muted-foreground hover:text-foreground transition-colors mb-3"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                              Kembali ke metode pembayaran
                            </button>
                            <p className="font-body text-sm font-semibold text-foreground mb-3">
                              Pilih {currentMethod.label}
                            </p>
                            <div className="space-y-2 mb-4">
                              {currentMethod.subOptions!.map((sub) => (
                                <button
                                  key={sub.name}
                                  onClick={() => handleSelectSub(order.id, sub.name)}
                                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                                    selectedSub[order.id] === sub.name
                                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                                      : "border-border hover:border-muted-foreground/30"
                                  }`}
                                >
                                  <div>
                                    <p className="text-sm font-semibold font-body text-foreground">{sub.name}</p>
                                  </div>
                                  {selectedSub[order.id] === sub.name && (
                                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                  )}
                                </button>
                              ))}
                            </div>

                            {/* Show account number when sub is selected */}
                            {selectedSub[order.id] && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-muted/50 border border-border mb-4"
                              >
                                <p className="text-xs text-muted-foreground font-body mb-1">
                                  {currentMethodId === "ewallet" ? "Nomor" : "Nomor Rekening"} {selectedSub[order.id]}
                                </p>
                                <div className="flex items-center justify-between">
                                  <p className="font-display text-xl font-bold text-foreground tracking-wide">
                                    {currentMethod.subOptions!.find((s) => s.name === selectedSub[order.id])?.number}
                                  </p>
                                  <button
                                    onClick={() =>
                                      copyNumber(
                                        currentMethod.subOptions!.find((s) => s.name === selectedSub[order.id])?.number || ""
                                      )
                                    }
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-body font-medium hover:bg-primary/20 transition-colors"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                    Salin
                                  </button>
                                </div>
                                <p className="text-xs text-muted-foreground font-body mt-2">
                                  a.n. <span className="font-semibold text-foreground">BaliTours Indonesia</span>
                                </p>
                                <p className="text-xs text-accent font-body font-medium mt-2">
                                  Total: Rp {order.total.toLocaleString("id-ID")}
                                </p>
                              </motion.div>
                            )}

                            <Button variant="hero" size="lg" className="w-full" onClick={() => handlePay(order)}>
                              <Check className="w-4 h-4 mr-2" />
                              Konfirmasi Pembayaran
                            </Button>
                          </div>
                        ) : (
                          <>
                            <p className="font-body text-sm font-semibold text-foreground mb-3">Pilih Metode Pembayaran</p>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              {paymentMethods.map((m) => (
                                <button
                                  key={m.id}
                                  onClick={() => handleSelectMethod(order.id, m.id)}
                                  className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                                    selectedPayment[order.id] === m.id
                                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                                      : "border-border hover:border-muted-foreground/30"
                                  }`}
                                >
                                  <m.icon
                                    className={`w-5 h-5 flex-shrink-0 ${
                                      selectedPayment[order.id] === m.id ? "text-primary" : "text-muted-foreground"
                                    }`}
                                  />
                                  <div>
                                    <p className="text-xs font-semibold font-body text-foreground">{m.label}</p>
                                    <p className="text-[10px] text-muted-foreground font-body">{m.desc}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                            {selectedPayment[order.id] &&
                              !paymentMethods.find((m) => m.id === selectedPayment[order.id])?.subOptions && (
                                <Button variant="hero" size="lg" className="w-full" onClick={() => handlePay(order)}>
                                  <Check className="w-4 h-4 mr-2" />
                                  Bayar Sekarang
                                </Button>
                              )}
                          </>
                        )}
                      </div>
                    )}

                    {/* Paid confirmation */}
                    {order.status === "paid" && (
                      <div className="border-t border-border p-4 bg-green-500/5">
                        <div className="flex items-center gap-2 text-sm font-body text-green-600">
                          <Check className="w-4 h-4" />
                          <span>Dibayar via {order.paymentMethod}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrdersModal;
