"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";

const recipes = [
  {
    id: "1",
    titleRu: "Салат с луком, томатами, огурцами и петрушкой",
    titleEn: "Salad With Onion, Tomato, Cucumber And Parsley",
    titleUz: "Piyoz, pomidor, bodring va petrochkali salat",
    descRu: "Классический освежающий салат из свежих овощей с лёгкой заправкой",
    descEn: "Classic refreshing salad from fresh vegetables with light dressing",
    descUz: "Yengil sous bilan yangi sabzavotlardan klassik tetiklantiruvchi salat",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop",
    time: "15 min",
    author: "Daniel Schefter",
    category: "Salad",
  },
  {
    id: "2",
    titleRu: "Вегетарианский салат с черри и моцареллой",
    titleEn: "Vegetarian Salad With Cherry Tomato, Mozzarella And Lettuce",
    titleUz: "Cherry pomidori, mocarella va salat bilan vegetarian salat",
    descRu: "Лёгкий итальянский салат с сочными помидорами черри",
    descEn: "Light Italian salad with juicy cherry tomatoes",
    descUz: "Shirali cherry pomidorlari bilan yengil italyan salati",
    image: "https://images.unsplash.com/photo-1595587870672-c79b47d21b2e?w=600&h=400&fit=crop",
    time: "10 min",
    author: "Daniel Schefter",
    category: "Salad",
  },
  {
    id: "3",
    titleRu: "Боул с лососем и авокадо",
    titleEn: "Salmon Avocado Bowl",
    titleUz: "Losos va avokadoli boul",
    descRu: "Питательный поке-боул со свежим лососем и авокадо",
    descEn: "Nutritious poke bowl with fresh salmon and avocado",
    descUz: "Yangi losos va avokado bilan ozuqaviy poke-boul",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    time: "20 min",
    author: "Daniel Schefter",
    category: "Bowl",
  },
  {
    id: "4",
    titleRu: "Тёплый салат с киноа и овощами",
    titleEn: "Warm Quinoa Vegetable Salad",
    titleUz: "Kinoa va sabzavotli iliq salat",
    descRu: "Сытный тёплый салат с киноа и сезонными овощами",
    descEn: "Hearty warm salad with quinoa and seasonal vegetables",
    descUz: "Kinoa va mavsumiy sabzavotlar bilan to'yimli iliq salat",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
    time: "25 min",
    author: "Daniel Schefter",
    category: "Salad",
  },
  {
    id: "5",
    titleRu: "Крем-суп из тыквы",
    titleEn: "Pumpkin Cream Soup",
    titleUz: "Oshqovoq krem-sho'rva",
    descRu: "Нежный крем-суп из запечённой тыквы с семечками",
    descEn: "Smooth cream soup from roasted pumpkin with seeds",
    descUz: "Urug'lar bilan pishirilgan oshqovoqdan yumshoq krem-sho'rva",
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&h=400&fit=crop",
    time: "30 min",
    author: "Daniel Schefter",
    category: "Soup",
  },
  {
    id: "6",
    titleRu: "Смузи-боул с ягодами",
    titleEn: "Berry Smoothie Bowl",
    titleUz: "Rezavorli smuzi-boul",
    descRu: "Яркий смузи-боул с гранолой и свежими ягодами",
    descEn: "Vibrant smoothie bowl with granola and fresh berries",
    descUz: "Granola va yangi rezavorlar bilan yorqin smuzi-boul",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=400&fit=crop",
    time: "10 min",
    author: "Daniel Schefter",
    category: "Bowl",
  },
];

export function RecipesPage() {
  const t = useTranslations("recipes");
  const locale = useLocale();

  const getTitle = (r: (typeof recipes)[0]) =>
    locale === "en" ? r.titleEn : locale === "uz" ? r.titleUz : r.titleRu;

  const getDesc = (r: (typeof recipes)[0]) =>
    locale === "en" ? r.descEn : locale === "uz" ? r.descUz : r.descRu;

  return (
    <div className="pt-16">
      <section className="bg-[#004507] py-12 lg:py-16">
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
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <motion.article
                key={recipe.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
              >
                <div className="relative h-52">
                  <Image
                    src={recipe.image}
                    alt={getTitle(recipe)}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-[#33CC66] text-white border-0">
                    {recipe.category}
                  </Badge>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                    {getTitle(recipe)}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {getDesc(recipe)}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{recipe.author}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
