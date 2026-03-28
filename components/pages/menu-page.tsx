"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/lib/menu-data";
import { useCartStore } from "@/lib/stores/cart-store";

const categories = ["all", "salads", "bowls", "soups", "drinks"] as const;

export function MenuPage() {
  const t = useTranslations("menuPage");
  const locale = useLocale();
  const addItem = useCartStore((s) => s.addItem);
  const [activeCategory, setActiveCategory] = useState("all");
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const filtered =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((i) => i.category === activeCategory);

  const getName = (item: (typeof menuItems)[0]) =>
    locale === "en" ? item.nameEn : locale === "uz" ? item.nameUz : item.name;

  const getDesc = (item: (typeof menuItems)[0]) =>
    locale === "en"
      ? item.descriptionEn
      : locale === "uz"
        ? item.descriptionUz
        : item.description;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("uz-UZ").format(price);

  const currency = locale === "en" ? "sum" : locale === "uz" ? "so'm" : "сум";

  const handleAddToCart = (item: (typeof menuItems)[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      nameEn: item.nameEn,
      nameUz: item.nameUz,
      price: item.price,
      image: item.image,
      calories: item.calories,
    });
    setAddedItems((prev) => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 1500);
  };

  return (
    <div className="pt-20 lg:pt-24">
      {/* Page Header */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg"
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-14 lg:top-24 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 xl:px-0">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-bettery-green text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t(`categories.${cat}` as `categories.${typeof cat}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="p-4 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="wait">
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-48 sm:h-52">
                    <Image
                      src={item.image}
                      alt={getName(item)}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                      <Flame className="h-3.5 w-3.5 text-orange-500" />
                      <span className="text-xs font-medium text-gray-700">
                        {item.calories} {t("calories")}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                      {getName(item)}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {getDesc(item)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-bold text-lg">
                        {formatPrice(item.price)}{" "}
                        <span className="text-sm font-normal text-gray-400">{currency}</span>
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(item)}
                        className={`rounded-full transition-all ${
                          addedItems.has(item.id)
                            ? "bg-bettery-green hover:bg-bettery-green"
                            : "bg-gray-900 hover:bg-bettery-green"
                        } text-white`}
                      >
                        {addedItems.has(item.id) ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            {t("added")}
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            {t("addToCart")}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
