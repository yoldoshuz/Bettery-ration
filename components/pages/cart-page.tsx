"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingCart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/stores/cart-store";

export function CartPage() {
  const t = useTranslations("cartPage");
  const locale = useLocale();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const [mounted, setMounted] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });

  useEffect(() => setMounted(true), []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU").format(price);

  const getName = (item: (typeof items)[0]) =>
    locale === "en" ? item.nameEn : locale === "uz" ? item.nameUz : item.name;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (!mounted) return null;

  if (orderPlaced) {
    return (
      <div className="pt-20 lg:pt-24 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <CheckCircle className="h-20 w-20 text-bettery-green mx-auto mb-6" />
          <h1
            className="text-3xl font-bold text-bettery-dark mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("orderSuccess")}
          </h1>
          <p className="text-gray-500 mb-8">{t("orderSuccessDescription")}</p>
          <Link href="/">
            <Button className="bg-bettery-green hover:bg-[#2ab858] text-white rounded-full px-8 py-5">
              {t("goToMenu")}
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      <section className="bg-bettery-dark py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("title")}
          </motion.h1>
        </div>
      </section>

      <section className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <ShoppingCart className="h-20 w-20 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-400 mb-2">
                {t("empty")}
              </h2>
              <p className="text-gray-400 mb-8">{t("emptyDescription")}</p>
              <Link href="/menu">
                <Button className="bg-bettery-green hover:bg-[#2ab858] text-white rounded-full px-8 py-5">
                  {t("goToMenu")}
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {items.length} {t("quantity").toLowerCase()}
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    {t("clearAll")}
                  </button>
                </div>

                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100"
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden relative shrink-0">
                        <Image
                          src={item.image}
                          alt={getName(item)}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {getName(item)}
                        </h3>
                        <p className="text-bettery-green font-bold mt-1">
                          {formatPrice(item.price)} сум
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-semibold text-lg w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-bettery-dark">
                              {formatPrice(item.price * item.quantity)} сум
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-28">
                  {!showCheckout ? (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-600 font-medium">
                          {t("total")}:
                        </span>
                        <span className="text-2xl font-bold text-bettery-dark">
                          {formatPrice(getTotalPrice())} сум
                        </span>
                      </div>
                      <Button
                        onClick={() => setShowCheckout(true)}
                        className="w-full bg-bettery-green hover:bg-[#2ab858] text-white rounded-xl py-6 text-base font-semibold"
                      >
                        {t("checkout")}
                      </Button>
                    </>
                  ) : (
                    <form onSubmit={handlePlaceOrder} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t("name")}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-bettery-green focus:ring-1 focus:ring-bettery-green outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t("phone")}
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-bettery-green focus:ring-1 focus:ring-bettery-green outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t("address")}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-bettery-green focus:ring-1 focus:ring-bettery-green outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t("comment")}
                        </label>
                        <textarea
                          value={formData.comment}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              comment: e.target.value,
                            })
                          }
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-bettery-green focus:ring-1 focus:ring-bettery-green outline-none transition-colors resize-none"
                        />
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-gray-600 font-medium">
                          {t("total")}:
                        </span>
                        <span className="text-xl font-bold text-bettery-dark">
                          {formatPrice(getTotalPrice())} сум
                        </span>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-bettery-green hover:bg-[#2ab858] text-white rounded-xl py-6 text-base font-semibold"
                      >
                        {t("placeOrder")}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
