"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Brand & Contact */}
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
              className="h-9 w-auto"
            />
            <div className="space-y-3 text-white/60 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-bettery-green" />
                <span>{t("address")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-bettery-green" />
                <span>{t("phone")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-bettery-green" />
                <span>{t("workHours")}</span>
              </div>
            </div>

            {/* Social icons */}
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">{t("followUs")}</p>
              <div className="flex items-center gap-3">
                {[
                  { name: "Instagram", letter: "I" },
                  { name: "Telegram", letter: "T" },
                  { name: "Facebook", letter: "F" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-bettery-green transition-colors"
                    aria-label={social.name}
                  >
                    <span className="text-white text-xs font-bold">{social.letter}</span>
                  </a>
                ))}
              </div>
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
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">
              {t("home")}
            </h3>
            <div className="space-y-2.5">
              <Link href="/" className="block text-sm text-white/50 hover:text-bettery-green transition-colors">
                {t("home")}
              </Link>
              <Link href="/about" className="block text-sm text-white/50 hover:text-bettery-green transition-colors">
                {t("about")}
              </Link>
              <Link href="/menu" className="block text-sm text-white/50 hover:text-bettery-green transition-colors">
                {t("menu")}
              </Link>
              <Link href="/about" className="block text-sm text-white/50 hover:text-bettery-green transition-colors">
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
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">
              {t("help")}
            </h3>
            <div className="space-y-2.5">
              <a href="#" className="block text-sm text-white/50 hover:text-bettery-green transition-colors">
                {t("support")}
              </a>
              <a href="#" className="block text-sm text-white/50 hover:text-bettery-green transition-colors">
                {t("policies")}
              </a>
              <a href="#" className="block text-sm text-white/50 hover:text-bettery-green transition-colors">
                {t("shop")}
              </a>
            </div>
          </motion.div>

          {/* Payment & Apps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4"
          >
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">
              {t("support")}
            </h3>
            <div className="space-y-4">
              {/* Payment methods */}
              <div className="flex flex-wrap gap-2">
                {["Uzcard", "Humo", "Click", "Payme", "Visa"].map((method) => (
                  <span
                    key={method}
                    className="text-xs bg-white/10 text-white/60 px-3 py-1.5 rounded-lg"
                  >
                    {method}
                  </span>
                ))}
              </div>
              <p className="text-xs text-white/40 leading-relaxed">
                {t("address")}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/30">
          {t("rights")}
        </div>
      </div>
    </footer>
  );
}
