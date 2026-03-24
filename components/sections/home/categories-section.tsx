"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { menuItems } from "@/lib/menu-data";

const categoryKeys = ["all", "popular", "lowCalorie"] as const;

export function CategoriesSection() {
  const t = useTranslations("categories");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? menuItems.slice(0, 6)
      : activeCategory === "popular"
        ? menuItems.filter((i) => i.calories > 300).slice(0, 6)
        : menuItems.filter((i) => i.calories <= 300).slice(0, 6);

  const getName = (item: (typeof menuItems)[0]) =>
    locale === "en" ? item.nameEn : locale === "uz" ? item.nameUz : item.name;

  const getDesc = (item: (typeof menuItems)[0]) =>
    locale === "en"
      ? item.descriptionEn
      : locale === "uz"
        ? item.descriptionUz
        : item.description;

  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#fafdf7]">
      <div className="mx-auto max-w-7xl">
        {/* Header - title left, tabs right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 lg:mb-12 gap-4"
        >
          <div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-bettery-dark leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("title")}
              <br />
              {t("subtitle")}
            </h2>
          </div>

          {/* Category tabs */}
          <div className="flex overflow-auto gap-2">
            {categoryKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === key
                    ? "bg-bettery-dark text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {t(key)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards grid - 3 columns, 2 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filtered.map((item, index) => (
              <motion.div
                key={`${activeCategory}-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={getName(item)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-1.5 line-clamp-1">
                    {getName(item)}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {getDesc(item)}
                  </p>
                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-bettery-dark hover:text-bettery-green transition-colors group/link"
                  >
                    {t("seeRecipe")}
                    <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
