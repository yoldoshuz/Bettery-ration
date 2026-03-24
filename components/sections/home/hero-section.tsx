"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative bg-bettery-dark overflow-hidden pt-16 lg:pt-20">
      {/* Background decorative leaves */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1502786129293-79981df4e689?w=1920&h=1080&fit=crop"
          alt=""
          fill
          className="object-cover opacity-15"
          priority
        />
      </div>

      {/* Decorative leaf elements */}
      <div className="absolute top-10 left-10 w-32 h-32 opacity-20 hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1585184394271-4c0a47dc59c9?w=200&h=200&fit=crop"
          alt=""
          width={128}
          height={128}
          className="rounded-full object-cover"
        />
      </div>
      <div className="absolute bottom-20 right-10 w-24 h-24 opacity-15 hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1585184394271-4c0a47dc59c9?w=200&h=200&fit=crop"
          alt=""
          width={96}
          height={96}
          className="rounded-full object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("title")}
            </h1>
            <p className="text-white/60 text-base sm:text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {t("subtitle")}
            </p>
            <Link href="/menu">
              <Button
                size="lg"
                className="bg-bettery-green hover:bg-[#2ab858] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-bettery-green/25 transition-all hover:shadow-bettery-green/40 hover:scale-105"
              >
                {t("cta")}
              </Button>
            </Link>
          </motion.div>

          {/* Hero Images - matching Figma layout */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
              {/* Main woman eating image - large rounded */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-64 h-72 sm:w-72 sm:h-80 lg:w-80 lg:h-96 mx-auto rounded-[2rem] overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&h=600&fit=crop"
                  alt="Healthy food"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Top-right floating food image */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-4 right-0 sm:right-4 lg:right-0 xl:right-8 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-xl border-2 border-white/20"
              >
                <Image
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop"
                  alt="Fresh salad"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Bottom-left floating food image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-2 left-0 sm:left-4 lg:left-0 xl:left-8 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-xl border-2 border-white/20"
              >
                <Image
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop"
                  alt="Healthy dish"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Small accent circle */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -left-4 lg:-left-8 w-16 h-16 bg-bettery-green/20 rounded-full hidden sm:block"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
