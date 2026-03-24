"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function PromoSection() {
  const t = useTranslations("promo");

  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-[#f0fdf4]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            {/* Image - left side with multiple food items */}
            <div className="relative h-64 sm:h-80 lg:h-105 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop"
                alt="Healthy food spread"
                fill
                className="object-cover"
              />
              {/* Small overlay woman image in corner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-4 left-4 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-xl border-2 border-white"
              >
                <Image
                  src="https://images.unsplash.com/photo-1515023115894-bacee29a1688?w=200&h=200&fit=crop"
                  alt="Happy customer"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Content - right side */}
            <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2
                  className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-bettery-dark mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t("title")}
                </h2>
                <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed max-w-md">
                  {t("description")}
                </p>
                <Link href="/menu">
                  <Button className="bg-bettery-green hover:bg-[#2ab858] text-white rounded-full px-8 py-5 font-semibold transition-all hover:scale-105 hover:shadow-lg">
                    {t("cta")}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
