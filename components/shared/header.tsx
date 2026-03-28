"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, Globe, ChevronDown, Minus, Plus, Trash2, Phone } from "lucide-react";
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

const navLinks = [
  { key: "home", href: "/" },
  { key: "menu", href: "/menu" },
  { key: "about", href: "/about" },
  { key: "recipes", href: "/recipes" },
];

export function Header() {
  const t = useTranslations("nav");
  const tCart = useTranslations("cartPage");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
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

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as "ru" | "en" | "uz" });
    setLangOpen(false);
  };

  const localeLabels: Record<string, string> = {
    ru: "Рус",
    en: "Eng",
    uz: "O'zb",
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("uz-UZ").format(price);

  const currency = locale === "en" ? "sum" : locale === "uz" ? "so'm" : "сум";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white"
      }`}
    >
      {/* Top bar with phone */}
      <div className="hidden lg:block bg-bettery-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
          <div className="flex items-center gap-2 text-white/70 text-xs">
            <Phone className="h-3 w-3" />
            <span>{t("phone")}</span>
          </div>
          <div className="text-white/70 text-xs">08:00 — 22:00</div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between lg:h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo2.svg"
              alt="Bettery Ration"
              width={140}
              height={40}
              className="h-7 w-auto lg:h-9"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-bettery-green text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {t(link.key as "home" | "menu" | "about" | "recipes")}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1.5 lg:gap-2">
            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLangOpen(!langOpen)}
                className="text-gray-600 hover:bg-gray-100 gap-1 px-2 lg:px-3 h-9"
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
                    className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg py-1.5 min-w-30 z-50 border border-gray-100"
                  >
                    {Object.entries(localeLabels).map(([code, label]) => (
                      <button
                        key={code}
                        onClick={() => switchLocale(code)}
                        className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                          locale === code
                            ? "text-bettery-green font-semibold bg-bettery-green/5"
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
                  className="text-gray-600 hover:bg-gray-100 relative h-9 w-9"
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
                  <SheetTitle className="text-gray-900 text-xl" style={{ fontFamily: "var(--font-heading)" }}>
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
                            {formatPrice(item.price)} {currency}
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
                      <span className="text-xl font-bold text-gray-900">
                        {formatPrice(getTotalPrice())} {currency}
                      </span>
                    </div>
                    <Link href="/cart" onClick={() => setCartOpen(false)} className="block">
                      <Button className="w-full bg-bettery-green hover:bg-bettery-green/90 text-white font-semibold py-6 rounded-xl text-base transition-all">
                        {tCart("checkout")}
                      </Button>
                    </Link>
                  </div>
                )}
              </SheetContent>
            </Sheet>

            {/* Order Button (desktop) */}
            <Link href="/menu" className="hidden lg:block">
              <Button className="bg-bettery-green hover:bg-bettery-green/90 text-white rounded-full px-6 font-medium h-9 transition-all hover:shadow-md">
                {t("order")}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-gray-600 hover:bg-gray-100 h-9 w-9"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white border-0 p-0">
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
                      className="h-9 w-auto"
                    />
                  </Link>

                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.key}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                          pathname === link.href
                            ? "bg-bettery-green/10 text-bettery-green"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {t(link.key as "home" | "menu" | "about" | "recipes")}
                      </Link>
                    ))}
                  </nav>

                  {/* Phone */}
                  <div className="mt-6 px-4">
                    <a href="tel:+998712000001" className="flex items-center gap-2 text-sm text-gray-500">
                      <Phone className="h-4 w-4" />
                      {t("phone")}
                    </a>
                  </div>

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
                    <Link href="/menu" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-bettery-green hover:bg-bettery-green/90 text-white rounded-xl py-5 font-semibold">
                        {t("order")}
                      </Button>
                    </Link>
                  </SheetFooter>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
