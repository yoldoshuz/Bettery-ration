"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Feather, Bird, Shield, Sparkles } from "lucide-react";

const benefitIcons = [
  { key: "lightness", icon: Feather, color: "text-green-500 bg-green-50" },
  { key: "freedom", icon: Bird, color: "text-blue-500 bg-blue-50" },
  { key: "calm", icon: Shield, color: "text-amber-500 bg-amber-50" },
  { key: "pleasure", icon: Sparkles, color: "text-rose-500 bg-rose-50" },
];

export function BenefitsSection() {
  const t = useTranslations("benefits");

  return (
    <section className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-100">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {benefitIcons.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {t(`${item.key}.title`)}
                </h3>
                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                  {t(`${item.key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
