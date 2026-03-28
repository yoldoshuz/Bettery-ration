"use client";

import { HeroSection } from "@/components/sections/home/hero-section";
import { BenefitsSection } from "@/components/sections/home/benefits-section";
import { MenuPlansSection } from "@/components/sections/home/menu-plans-section";
import { PricingSection } from "@/components/sections/home/pricing-section";
import { ResultsSection } from "@/components/sections/home/results-section";
import { DeliverySection } from "@/components/sections/home/delivery-section";
import { FAQSection } from "@/components/sections/home/faq-section";
import { QualitySection } from "@/components/sections/home/quality-section";
import { DiscountSection } from "@/components/sections/home/discount-section";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <MenuPlansSection />
      <PricingSection />
      <ResultsSection />
      <DeliverySection />
      <FAQSection />
      <QualitySection />
      <DiscountSection />
    </>
  );
}
