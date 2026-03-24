"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const recipes = [
  {
    id: "1",
    titleRu: "Салат с луком, томатами, огурцами и петрушкой",
    titleEn: "Salad With Onion, Tomato, Cucumber And Parsley",
    titleUz: "Piyoz, pomidor, bodring va petrochkali salat",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
    days: 3,
    author: "Daniel Schefter",
    category: "Salad",
  },
  {
    id: "2",
    titleRu: "Вегетарианский салат с черри и моцареллой",
    titleEn: "Vegetarian Salad With Cherry Tomato, Mozzarella And Lettuce",
    titleUz: "Cherry pomidori, mocarella va salat bilan vegetarian salat",
    image: "https://images.unsplash.com/photo-1595587870672-c79b47d21b2e?w=400&h=300&fit=crop",
    days: 3,
    author: "Daniel Schefter",
    category: "Salad",
  },
  {
    id: "3",
    titleRu: "Боул с редиской и капустой",
    titleEn: "Salad Bowls With Radish, Cabbage",
    titleUz: "Turp va karamli salat bouli",
    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400&h=300&fit=crop",
    days: 3,
    author: "Daniel Schefter",
    category: "Bowl",
  },
  {
    id: "4",
    titleRu: "Куриный карри боул",
    titleEn: "Chicken Curry Bowls",
    titleUz: "Tovuq karri bouli",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
    days: 3,
    author: "Daniel Schefter",
    category: "Bowl",
  },
];

export function RecipesSection() {
  const t = useTranslations("recipes");
  const locale = useLocale();

  const getTitle = (item: (typeof recipes)[0]) =>
    locale === "en" ? item.titleEn : locale === "uz" ? item.titleUz : item.titleRu;

  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-bettery-dark mb-8 lg:mb-12"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {t("title")}
        </motion.h2>

        {/* 4-column recipe cards like Figma */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recipes.map((recipe, index) => (
            <motion.article
              key={recipe.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer group"
            >
              {/* Image with category badge */}
              <div className="relative h-40 sm:h-44 overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={getTitle(recipe)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-3 left-3 bg-bettery-green text-white border-0 text-xs font-medium">
                  {recipe.category}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-3 line-clamp-2">
                  {getTitle(recipe)}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{t("daysAgo", { days: recipe.days })}</span>
                  <span className="text-gray-300">|</span>
                  <span>{t("by", { author: recipe.author })}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
