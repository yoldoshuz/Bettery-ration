"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Leaf, ChefHat } from "lucide-react";

export function QualitySection() {
  const t = useTranslations("quality");

  const certs = [
    { icon: ShieldCheck, label: t("cert1"), color: "bg-green-50 text-green-600" },
    { icon: Leaf, label: t("cert2"), color: "bg-emerald-50 text-emerald-600" },
    { icon: ChefHat, label: t("cert3"), color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-bettery-dark text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-bettery-green font-medium text-sm mb-2">{t("subtitle")}</p>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("title")}
            </h2>
            <p className="text-white/60 text-base sm:text-lg mb-8 leading-relaxed">
              {t("description")}
            </p>
            <Link href="/about">
              <Button className="bg-bettery-green hover:bg-bettery-green/90 text-white rounded-full px-8 py-5 font-semibold transition-all hover:scale-[1.02]">
                {t("cta")}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid gap-4"
          >
            {certs.map((cert, index) => (
              <motion.div
                key={cert.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/10 transition-colors"
              >
                <div className={`p-3 rounded-xl ${cert.color}`}>
                  <cert.icon className="h-6 w-6" />
                </div>
                <span className="font-medium text-white">{cert.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
