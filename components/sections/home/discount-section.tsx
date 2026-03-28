"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function DiscountSection() {
  const t = useTranslations("discount");

  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-bettery-green to-emerald-500 p-8 sm:p-12 lg:p-16"
        >
          {/* Decorative circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full" />

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-center sm:text-left">
              <p className="text-white/80 text-sm font-medium mb-2">{t("subtitle")}</p>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
                  {t("percent")}
                </span>
                <span className="text-xl sm:text-2xl font-semibold text-white/90">
                  {t("off")}
                </span>
              </div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t("title")}
              </h2>
            </div>

            <Link href="/menu" className="shrink-0">
              <Button className="bg-white text-bettery-green hover:bg-white/90 rounded-full px-10 py-6 font-bold text-lg transition-all hover:scale-[1.02] shadow-xl">
                {t("cta")}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
