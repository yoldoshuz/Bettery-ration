"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tBrands = useTranslations("brands");

  return (
    <footer className="bg-bettery-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Brand & Contact - Left side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-5"
          >
            <Image
              src="/logo2.svg"
              alt="Bettery Ration"
              width={160}
              height={48}
              className="h-10 w-auto"
            />
            <div className="space-y-3 text-white/70 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-bettery-green" />
                <span>{t("address")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-bettery-green" />
                <span>{t("phone")}</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              {["facebook", "instagram", "twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-bettery-green transition-colors"
                >
                  <span className="text-white text-xs font-bold uppercase">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">
              {t("home")}
            </h3>
            <div className="space-y-2.5">
              <Link href="/" className="block text-sm text-white/60 hover:text-bettery-green transition-colors">
                {t("home")}
              </Link>
              <Link href="/about" className="block text-sm text-white/60 hover:text-bettery-green transition-colors">
                {t("about")}
              </Link>
              <Link href="/menu" className="block text-sm text-white/60 hover:text-bettery-green transition-colors">
                {t("menu")}
              </Link>
              <Link href="/about" className="block text-sm text-white/60 hover:text-bettery-green transition-colors">
                {t("contact")}
              </Link>
            </div>
          </motion.div>

          {/* Help links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">
              {t("help")}
            </h3>
            <div className="space-y-2.5">
              <a href="#" className="block text-sm text-white/60 hover:text-bettery-green transition-colors">
                {t("support")}
              </a>
              <a href="#" className="block text-sm text-white/60 hover:text-bettery-green transition-colors">
                {t("policies")}
              </a>
              <a href="#" className="block text-sm text-white/60 hover:text-bettery-green transition-colors">
                {t("shop")}
              </a>
            </div>
          </motion.div>

          {/* Family Brands */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4"
          >
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">
              {tBrands("title")}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {[
                "numaFamily",
                "numaKids",
                "numaNutrition",
                "nabaviyTabobat",
                "betteryRestaurant",
                "betteryRation",
              ].map((brand) => (
                <a
                  key={brand}
                  href="#"
                  className="block text-sm text-white/60 hover:text-bettery-green transition-colors"
                >
                  {tBrands(brand as "numaFamily" | "numaKids" | "numaNutrition" | "nabaviyTabobat" | "betteryRestaurant" | "betteryRation")}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/40">
          {t("rights")}
        </div>
      </div>
    </footer>
  );
}
