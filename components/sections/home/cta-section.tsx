"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-bettery-dark"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Content - left side */}
            <div className="p-8 sm:p-12 lg:p-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t("title")}
                </h2>
                <Link href="/menu">
                  <Button className="bg-bettery-green hover:bg-[#2ab858] text-white rounded-full px-8 py-5 font-semibold text-base transition-all hover:scale-105 hover:shadow-lg">
                    {t("button")}
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Image - right side, woman with food */}
            <div className="relative h-72 sm:h-80 lg:h-105">
              <Image
                src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=800&h=600&fit=crop"
                alt="Healthy lifestyle"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
