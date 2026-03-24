"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function FeaturedSection() {
  const t = useTranslations("featured");

  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background image - full width salmon/avocado dish */}
          <div className="relative h-95 sm:h-105 lg:h-120">
            <Image
              src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1400&h=700&fit=crop"
              alt="Salmon with avocado"
              fill
              className="object-cover"
            />
            {/* Dark gradient from left */}
            <div className="absolute inset-0 bg-linear-to-r from-bettery-dark/90 via-bettery-dark/70 to-bettery-dark/20" />
          </div>

          {/* Content overlay - bottom left */}
          <div className="absolute inset-0 flex items-end pb-10 sm:pb-12 lg:pb-14 px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="max-w-lg"
            >
              {/* Avocado badge - floating at top like Figma */}
              <Badge className="bg-bettery-green text-white border-0 mb-4 text-sm px-4 py-1.5 rounded-full font-medium">
                🥑 {t("badge")}
              </Badge>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t("title")}
              </h2>
              <Link href="/menu">
                <Button className="bg-bettery-green hover:bg-[#2ab858] text-white rounded-full px-8 py-5 font-semibold transition-all hover:scale-105 hover:shadow-lg">
                  {t("orderNow")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
