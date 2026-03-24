"use client";

import { HeroSection } from "@/components/sections/home/hero-section";
import { PromoSection } from "@/components/sections/home/promo-section";
import { MenusSection } from "@/components/sections/home/menus-section";
import { FeaturedSection } from "@/components/sections/home/featured-section";
import { CategoriesSection } from "@/components/sections/home/categories-section";
import { CTASection } from "@/components/sections/home/cta-section";
import { RecipesSection } from "@/components/sections/home/recipes-section";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <PromoSection />
      <MenusSection />
      <FeaturedSection />
      <CategoriesSection />
      <CTASection />
      <RecipesSection />
    </>
  );
}
