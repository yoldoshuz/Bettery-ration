"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Aziza",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
    startWeight: 78,
    endWeight: 65,
    months: 3,
    program: "1 500 Kcal",
  },
  {
    name: "Rustam",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    startWeight: 95,
    endWeight: 82,
    months: 4,
    program: "1 700 Kcal",
  },
  {
    name: "Dilnoza",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
    startWeight: 70,
    endWeight: 58,
    months: 3,
    program: "1 000 Kcal",
  },
];

export function ResultsSection() {
  const t = useTranslations("results");
  const [active, setActive] = useState(0);

  const person = testimonials[active];

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Photo */}
          <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-lg">
            <Image
              src={person.image}
              alt={person.name}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-white font-bold text-xl">{person.name}</p>
            </div>

            {/* Weight badge */}
            <div className="absolute top-4 right-4 bg-bettery-green text-white rounded-2xl px-4 py-2 font-bold text-lg shadow-lg">
              -{person.startWeight - person.endWeight} {t("kg")}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm text-gray-400 mb-1">{t("startWeight")}</p>
                <p className="text-2xl font-bold text-gray-900">{person.startWeight} {t("kg")}</p>
              </div>
              <div className="bg-bettery-green/5 rounded-2xl p-5 border border-bettery-green/20">
                <p className="text-sm text-gray-400 mb-1">{t("endWeight")}</p>
                <p className="text-2xl font-bold text-bettery-green">{person.endWeight} {t("kg")}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm text-gray-400 mb-1">{t("program")}</p>
                <p className="text-2xl font-bold text-gray-900">{person.program}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm text-gray-400 mb-1">{t("lost")}</p>
                <p className="text-2xl font-bold text-bettery-green">
                  {person.startWeight - person.endWeight} {t("kg")}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {person.months} {t("months")}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all ${
                      active === i ? "w-8 bg-bettery-green" : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-bettery-green text-white flex items-center justify-center hover:bg-bettery-green/90 transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
