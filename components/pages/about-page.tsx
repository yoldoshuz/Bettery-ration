"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Leaf, Award, Heart } from "lucide-react";

export function AboutPage() {
  const t = useTranslations("about");

  const values = [
    {
      icon: Leaf,
      title: t("freshness"),
      description: t("freshnessText"),
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Award,
      title: t("quality"),
      description: t("qualityText"),
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: Heart,
      title: t("care"),
      description: t("careText"),
      color: "bg-rose-100 text-rose-600",
    },
  ];

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-bettery-dark py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-80 sm:h-96 lg:h-125 rounded-3xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
                alt="Our kitchen"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-3xl sm:text-4xl font-bold text-bettery-dark mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t("story")}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {t("storyText")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#f0fdf4]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2
                className="text-3xl sm:text-4xl font-bold text-bettery-dark mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t("mission")}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {t("missionText")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-80 sm:h-96 lg:h-125 rounded-3xl overflow-hidden order-1 lg:order-2"
            >
              <Image
                src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&h=600&fit=crop"
                alt="Fresh ingredients"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-bettery-dark text-center mb-12"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("values")}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className={`inline-flex p-4 rounded-2xl ${value.color} mb-5`}>
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-500">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
