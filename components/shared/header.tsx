"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, Globe, ChevronDown, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/lib/stores/cart-store";

const brandLinks = [
  { name: "numaFamily", href: "#" },
  { name: "numaKids", href: "#" },
  { name: "numaNutrition", href: "#" },
  { name: "nabaviyTabobat", href: "#" },
  { name: "betteryRestaurant", href: "#" },
  { name: "betteryRation", href: "#" },
];

const navLinks = [
  { key: "home", href: "/" },
  { key: "menu", href: "/menu" },
  { key: "about", href: "/about" },
  { key: "recipes", href: "/recipes" },
];

export function Header() {
  const t = useTranslations("nav");
  const tBrands = useTranslations("brands");
  const tCart = useTranslations("cartPage");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const brandsRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const getTotalItems = useCartStore((s) => s.getTotalItems);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    if (langOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (brandsRef.current && !brandsRef.current.contains(e.target as Node)) {
        setBrandsOpen(false);
      }
    };

    if (brandsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [brandsOpen]);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as "ru" | "en" | "uz" });
    setLangOpen(false);
  };

  const localeLabels: Record<string, string> = {
    ru: "Рус",
    en: "Eng",
    uz: "Uzb",
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU").format(price);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-bettery-dark/95 backdrop-blur-md shadow-lg"
        : "bg-bettery-dark"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <div
            ref={brandsRef}
            className="relative shrink-0"
            onMouseEnter={() => setBrandsOpen(true)}
            onMouseLeave={() => setBrandsOpen(false)}
          >
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={(e) => {
                // мобилка → toggle
                if (window.innerWidth < 1024) {
                  e.preventDefault();
                  setBrandsOpen((prev) => !prev);
                }
              }}
            >
              <Image
                src="/logo2.svg"
                alt="Bettery Ration"
                width={140}
                height={40}
                className="h-8 w-auto lg:h-10"
                priority
              />
            </Link>

            <AnimatePresence>
              {brandsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 bg-green-50 p-4 rounded-2xl shadow-xl w-60 z-50"
                >
                  <p className="font-semibold text-bettery-dark mb-3 text-sm">
                    {tBrands("title")}
                  </p>

                  <div className="space-y-1">
                    {brandLinks.map((brand) => (
                      <a
                        key={brand.name}
                        href={brand.href}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-gray-600 hover:text-bettery-dark hover:bg-[#f0fdf4] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-bettery-green" />
                        {tBrands(brand.name as string)}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Nav - center */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${pathname === link.href
                  ? "bg-bettery-green text-white shadow-sm"
                  : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
              >
                {t(link.key as string)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1.5 lg:gap-3">
            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLangOpen(!langOpen)}
                className="text-white hover:bg-white/10 hover:text-white gap-1 px-2 lg:px-3 h-9"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm hidden sm:inline">{localeLabels[locale]}</span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </Button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl py-1.5 min-w-30 z-50 border border-gray-100"
                  >
                    {Object.entries(localeLabels).map(([code, label]) => (
                      <button
                        key={code}
                        onClick={() => switchLocale(code)}
                        className={`w-full px-4 py-2 text-left text-sm transition-colors ${locale === code
                          ? "text-bettery-dark font-semibold bg-[#f0fdf4]"
                          : "text-gray-600 hover:bg-gray-50"
                          }`}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Button */}
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10  hover:text-white relative h-9 w-9"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {mounted && getTotalItems() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-bettery-green text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold"
                    >
                      {getTotalItems()}
                    </motion.span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="px-2 w-full sm:max-w-md bg-white flex flex-col">
                <SheetHeader>
                  <SheetTitle className="text-bettery-dark text-xl" style={{ fontFamily: "var(--font-heading)" }}>
                    {tCart("title")}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto mt-4 space-y-3">
                  {mounted && items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <ShoppingCart className="h-16 w-16 text-gray-200 mb-4" />
                      <p className="text-gray-400 mb-4">{tCart("empty")}</p>
                      <Link
                        href="/menu"
                        onClick={() => setCartOpen(false)}
                        className="text-bettery-green font-medium hover:underline"
                      >
                        {tCart("goToMenu")}
                      </Link>
                    </div>
                  ) : (
                    mounted &&
                    items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {locale === "en" ? item.nameEn : locale === "uz" ? item.nameUz : item.name}
                          </p>
                          <p className="text-sm text-bettery-green font-semibold">
                            {formatPrice(item.price)} сум
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm font-semibold w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-auto text-red-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
                {mounted && items.length > 0 && (
                  <div className="border-t p-4 mt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-600">{tCart("total")}:</span>
                      <span className="text-xl font-bold text-bettery-dark">
                        {formatPrice(getTotalPrice())} сум
                      </span>
                    </div>
                    <Link href="/cart" onClick={() => setCartOpen(false)} className="block">
                      <Button className="w-full bg-bettery-green hover:bg-[#2ab858] text-white font-semibold py-6 rounded-xl text-base transition-all">
                        {tCart("checkout")}
                      </Button>
                    </Link>
                  </div>
                )}
              </SheetContent>
            </Sheet>

            {/* Contact Button (desktop) */}
            <Link href="/about" className="hidden lg:block">
              <Button className="bg-bettery-green hover:bg-[#2ab858] text-white rounded-full px-6 font-medium h-9 transition-all hover:shadow-lg">
                {t("contact")}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-white hover:bg-white/10 h-9 w-9"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-green-50 border-0 p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full p-6 pt-8">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)} className="mb-8">
                    <Image
                      src="/logo2.svg"
                      alt="Bettery Ration"
                      width={160}
                      height={48}
                      className="h-10 w-auto"
                    />
                  </Link>

                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.key}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${pathname === link.href
                          ? "bg-bettery-green text-black"
                          : "text-black/70 hover:text-white hover:bg-black/10"
                          }`}
                      >
                        {t(link.key as string)}
                      </Link>
                    ))}
                  </nav>

                  {/* Brand family links */}
                  {/* <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="text-black/40 text-xs uppercase tracking-wider mb-3 px-1">
                      {tBrands("title")}
                    </p>
                    {brandLinks.map((brand) => (
                      <a
                        key={brand.name}
                        href={brand.href}
                        className="block px-1 py-1.5 text-sm text-black/50 hover:text-bettery-green transition-colors"
                      >
                        {tBrands(brand.name as string)}
                      </a>
                    ))}
                  </div> */}

                  <SheetFooter className="mt-auto pb-6">
                    <div className="mt-6">
                      <Select
                        value={locale}
                        onValueChange={(value) => {
                          switchLocale(value);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(localeLabels).map(([code, label]) => (
                            <SelectItem key={code} value={code}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-bettery-green hover:bg-[#2ab858] text-white rounded-xl py-5 font-semibold">
                        {t("contact")}
                      </Button>
                    </Link>
                  </SheetFooter>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header >
  );
}
