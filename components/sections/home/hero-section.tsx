"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative bg-white overflow-hidden pt-16 lg:pt-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-bettery-green/10 text-bettery-green text-sm font-medium px-4 py-1.5 rounded-full mb-5"
            >
              {t("badge")}
            </motion.span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.1] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("title")}
            </h1>
            <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {t("subtitle")}
            </p>
            <Link href="/menu">
              <Button
                size="lg"
                className="bg-bettery-green hover:bg-bettery-green/90 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-bettery-green/20 transition-all hover:shadow-bettery-green/30 hover:scale-[1.02]"
              >
                {t("cta")}
              </Button>
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop"
                  alt="Healthy meal prep"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Floating card - calories */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-4 -left-4 sm:left-4 bg-white rounded-2xl shadow-xl p-3 sm:p-4 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-bettery-green/10 flex items-center justify-center">
                    <span className="text-bettery-green text-lg">🔥</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">1 500 Kcal</p>
                    <p className="text-sm font-semibold text-gray-900">5 meals</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card - delivery */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-2 -right-2 sm:right-4 bg-white rounded-2xl shadow-xl p-3 sm:p-4 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                    <span className="text-lg">🚚</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">07:00 — 10:00</p>
                    <p className="text-sm font-semibold text-gray-900">Free delivery</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
