"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Truck } from "lucide-react";

const pricingPlans = [
  {
    key: "trial",
    days: 3,
    pricePerDay: 89000,
    totalPrice: 267000,
    savings: 0,
    popular: false,
  },
  {
    key: "week",
    days: 6,
    pricePerDay: 79000,
    totalPrice: 474000,
    savings: 60000,
    popular: true,
  },
  {
    key: "month",
    days: 24,
    pricePerDay: 69000,
    totalPrice: 1656000,
    savings: 480000,
    popular: false,
  },
];

export function PricingSection() {
  const t = useTranslations("pricing");

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU").format(price);

  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 lg:mb-14"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("title")}
          </h2>
          <p className="text-gray-500">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative bg-white rounded-3xl p-6 lg:p-8 border transition-shadow hover:shadow-lg ${
                plan.popular
                  ? "border-bettery-green shadow-md ring-1 ring-bettery-green/20"
                  : "border-gray-100 shadow-sm"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-bettery-green text-white border-0 px-4 py-1 text-xs font-semibold">
                  {t("popular")}
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {t(`${plan.key}Title` as "trialTitle" | "weekTitle" | "monthTitle")}
                </h3>
                <p className="text-sm text-gray-500">
                  {t(`${plan.key}Desc` as "trialDesc" | "weekDesc" | "monthDesc")}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(plan.pricePerDay)}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {t("sum")} / {t("pricePerDay")}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {t("totalPrice")}: {formatPrice(plan.totalPrice)} {t("sum")}
                </p>
                {plan.savings > 0 && (
                  <p className="text-sm text-bettery-green font-medium mt-1">
                    {t("savings")}: {formatPrice(plan.savings)} {t("sum")}
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-bettery-green shrink-0" />
                  <span>{plan.days} {t("pricePerDay") === "per day" ? "days" : "kun"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-bettery-green shrink-0" />
                  <span>{t("freeDelivery")}</span>
                </div>
              </div>

              <Link href="/menu">
                <Button
                  className={`w-full rounded-xl py-5 font-semibold transition-all hover:scale-[1.02] ${
                    plan.popular
                      ? "bg-bettery-green hover:bg-bettery-green/90 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                >
                  {t("orderNow")}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
