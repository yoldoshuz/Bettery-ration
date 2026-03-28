"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const plans = [
  {
    calories: 1000,
    label: "1 000",
    meals: 3,
    price: 55000,
    proteins: "60g",
    fats: "35g",
    carbs: "100g",
    description: "weight_loss",
    images: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=300&h=200&fit=crop",
    ],
  },
  {
    calories: 1500,
    label: "1 500",
    meals: 4,
    price: 75000,
    proteins: "90g",
    fats: "50g",
    carbs: "150g",
    description: "active",
    images: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=300&h=200&fit=crop",
    ],
  },
  {
    calories: 1700,
    label: "1 700",
    meals: 5,
    price: 89000,
    proteins: "110g",
    fats: "55g",
    carbs: "180g",
    description: "active",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=200&fit=crop",
    ],
  },
  {
    calories: 2500,
    label: "2 500",
    meals: 6,
    price: 110000,
    proteins: "150g",
    fats: "80g",
    carbs: "260g",
    description: "active",
    images: [
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1529059997568-3d847b1154f0?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=300&h=200&fit=crop",
    ],
  },
];

export function MenuPlansSection() {
  const t = useTranslations("plans");
  const [activePlan, setActivePlan] = useState(1);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU").format(price);

  const plan = plans[activePlan];

  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8" id="plans">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 lg:mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("title")}
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">{t("subtitle")}</p>
        </motion.div>

        {/* Plan Tabs */}
        <div className="flex justify-center mb-8 lg:mb-12">
          <div className="inline-flex bg-gray-100 rounded-full p-1 gap-1">
            {plans.map((p, i) => (
              <button
                key={p.calories}
                onClick={() => setActivePlan(i)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activePlan === i
                    ? "bg-bettery-green text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {p.label} {t("kcal")}
              </button>
            ))}
          </div>
        </div>

        {/* Plan Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlan}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Plan Info Card */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.label}
                    </span>
                    <span className="text-lg text-gray-400">{t("kcal")}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-6">{t("active")}</p>

                  {/* Nutrition Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{t("proteins")}</span>
                      <span className="text-sm font-semibold text-gray-900">{plan.proteins}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-bettery-green rounded-full h-1.5" style={{ width: `${(parseInt(plan.proteins) / 150) * 100}%` }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{t("fats")}</span>
                      <span className="text-sm font-semibold text-gray-900">{plan.fats}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-amber-400 rounded-full h-1.5" style={{ width: `${(parseInt(plan.fats) / 80) * 100}%` }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{t("carbs")}</span>
                      <span className="text-sm font-semibold text-gray-900">{plan.carbs}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-blue-400 rounded-full h-1.5" style={{ width: `${(parseInt(plan.carbs) / 260) * 100}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{plan.meals} {t("meals")}</span>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <span className="text-sm text-gray-400">{t("from")}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-bettery-green">
                        {formatPrice(plan.price)}
                      </span>
                      <span className="text-gray-400 text-sm">so'm / {t("perDay")}</span>
                    </div>
                  </div>
                  <Link href="/menu">
                    <Button className="w-full bg-bettery-green hover:bg-bettery-green/90 text-white rounded-xl py-5 font-semibold transition-all hover:scale-[1.02]">
                      {t("orderPlan")}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Meal Images Grid */}
              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {plan.images.map((img, idx) => (
                  <motion.div
                    key={img}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm group"
                  >
                    <Image
                      src={img}
                      alt={`Meal ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
                {/* Additional info cards */}
                <div className="relative aspect-[4/3] rounded-2xl bg-bettery-green/5 border border-bettery-green/20 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-3xl mb-2">🥗</span>
                  <p className="text-sm font-semibold text-gray-900">{plan.meals} {t("meals")}</p>
                  <p className="text-xs text-gray-500 mt-1">{plan.label} {t("kcal")} / {t("perDay")}</p>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl bg-amber-50 border border-amber-100 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-3xl mb-2">🔥</span>
                  <p className="text-sm font-semibold text-gray-900">{plan.proteins} {t("proteins")}</p>
                  <p className="text-xs text-gray-500 mt-1">{plan.fats} {t("fats")}</p>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm group">
                  <Image
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop"
                    alt="Fresh cooking"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
