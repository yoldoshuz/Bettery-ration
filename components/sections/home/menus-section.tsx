"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ShoppingCart } from "lucide-react";
import { menuItems } from "@/lib/menu-data";
import { useCartStore } from "@/lib/stores/cart-store";

export function MenusSection() {
  const t = useTranslations("menus");
  const locale = useLocale();
  const addItem = useCartStore((s) => s.addItem);

  const featured = menuItems.slice(0, 3);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU").format(price);

  const getName = (item: (typeof menuItems)[0]) =>
    locale === "en" ? item.nameEn : locale === "uz" ? item.nameUz : item.name;

  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header with title and navigation arrows */}
        <div className="flex items-end justify-between mb-8 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-bettery-dark"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("title")}
            </h2>
            <p className="text-gray-500 mt-2">{t("subtitle")}</p>
          </motion.div>

          {/* Navigation arrows like Figma */}
          <div className="hidden sm:flex items-center gap-2">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-bettery-dark hover:text-white hover:border-bettery-dark transition-all">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-bettery-dark text-white flex items-center justify-center hover:bg-bettery-green transition-all">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Menu cards - matching Figma style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              {/* Image */}
              <div className="relative h-52 sm:h-56 overflow-hidden">
                <Image
                  src={item.image}
                  alt={getName(item)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    {/* Green pill tag with name */}
                    <span className="inline-block bg-[#e8f5e9] text-bettery-dark text-xs font-medium px-3 py-1 rounded-full mb-2">
                      {getName(item)}
                    </span>
                    <p className="text-bettery-dark font-bold text-lg">
                      {formatPrice(item.price)} <span className="text-sm font-normal text-gray-500">сум</span>
                    </p>
                  </div>

                  {/* Add to cart button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      addItem({
                        id: item.id,
                        name: item.name,
                        nameEn: item.nameEn,
                        nameUz: item.nameUz,
                        price: item.price,
                        image: item.image,
                        calories: item.calories,
                      })
                    }
                    className="bg-bettery-dark text-white p-3 rounded-full hover:bg-bettery-green transition-colors shrink-0 shadow-md"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-bettery-dark font-medium hover:text-bettery-green transition-colors"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
