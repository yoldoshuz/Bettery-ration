"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Truck } from "lucide-react";

export function DeliverySection() {
  const t = useTranslations("delivery");

  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Map placeholder - styled area */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-bettery-green/5 border border-bettery-green/10"
          >
            {/* Stylized map representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-bettery-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-10 w-10 text-bettery-green" />
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-1">Toshkent</p>
                <p className="text-sm text-gray-500">& {t("zones")}</p>
              </div>
            </div>

            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-40 h-40 rounded-full border-2 border-dashed border-bettery-green/20 absolute" />
              <div className="w-64 h-64 rounded-full border-2 border-dashed border-bettery-green/10 absolute" />
              <div className="w-96 h-96 rounded-full border-2 border-dashed border-bettery-green/5 absolute" />
            </div>

            {/* Floating delivery points */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/4 right-1/4 w-8 h-8 bg-bettery-green rounded-full flex items-center justify-center shadow-lg"
            >
              <MapPin className="h-4 w-4 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-1/3 left-1/4 w-8 h-8 bg-bettery-green rounded-full flex items-center justify-center shadow-lg"
            >
              <MapPin className="h-4 w-4 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              className="absolute top-1/3 left-1/3 w-8 h-8 bg-bettery-green rounded-full flex items-center justify-center shadow-lg"
            >
              <MapPin className="h-4 w-4 text-white" />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("title")}
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mb-8 leading-relaxed">
              {t("description")}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-bettery-green/10 flex items-center justify-center shrink-0">
                  <Truck className="h-5 w-5 text-bettery-green" />
                </div>
                <span className="text-gray-700 font-medium">{t("subtitle")}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-bettery-green/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-bettery-green" />
                </div>
                <span className="text-gray-700 font-medium">07:00 — 10:00</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-bettery-green/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-bettery-green" />
                </div>
                <span className="text-gray-700 font-medium">Toshkent & {t("zones")}</span>
              </div>
            </div>

            <Link href="/menu">
              <Button className="bg-bettery-green hover:bg-bettery-green/90 text-white rounded-full px-8 py-5 font-semibold transition-all hover:scale-[1.02]">
                {t("orderBtn")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
